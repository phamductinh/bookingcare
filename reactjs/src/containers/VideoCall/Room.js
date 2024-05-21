import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";
import "./Room.css";

const StyledVideo = styled.video`
	width: 39%;
	width: 50%;
	height: 454px;
	transform: scaleX(-1);
`;

const Video = (props) => {
	const ref = useRef();

	useEffect(() => {
		props.peer.on("stream", (stream) => {
			ref.current.srcObject = stream;
		});
	}, [props.peer]);

	return <StyledVideo playsInline autoPlay ref={ref} />;
};

const Room = (props) => {
	const [peers, setPeers] = useState([]);
	const socketRef = useRef();
	const userVideo = useRef();
	const peersRef = useRef([]);
	const [message, setMessage] = useState("");
	const [messages, setMessages] = useState([]);
	const [isMicMuted, setIsMicMuted] = useState(true);
	const [isVideoMuted, setIsVideoMuted] = useState(true);
	const roomID = props.match.params.code;
	const userInfo = useSelector((state) => state.user.userInfo);
	const isLoggedIn = useSelector((state) => state.user.isLoggedIn);

	useEffect(() => {
		socketRef.current = io.connect("http://localhost:8080", {
			transports: ["websocket"],
		});

		console.log(socketRef.current);
		socketRef.current.on("receiveMessage", (data) => {
			setMessages((prevMessages) => [...prevMessages, data]);
			console.log(data);
		});

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				userVideo.current.srcObject = stream;
				socketRef.current.emit("join room", roomID);

				socketRef.current.on("all users", (users) => {
					const peers = [];
					users.forEach((userID) => {
						const peer = createPeer(
							userID,
							socketRef.current.id,
							stream
						);
						peersRef.current.push({
							peerID: userID,
							peer,
						});
						peers.push(peer);
					});
					setPeers(peers);
				});

				socketRef.current.on("user joined", (payload) => {
					const peer = addPeer(
						payload.signal,
						payload.callerID,
						stream
					);
					peersRef.current.push({
						peerID: payload.callerID,
						peer,
					});

					setPeers((users) => [...users, peer]);
				});

				socketRef.current.on("receiving returned signal", (payload) => {
					const item = peersRef.current.find(
						(p) => p.peerID === payload.id
					);
					if (item && item.peer) {
						item.peer.signal(payload.signal);
					} else {
						console.log("Failed");
					}
				});
			});
		return () => {
			socketRef.current.disconnect();
		};
	}, [roomID]);

	function createPeer(userToSignal, callerID, stream) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream,
		});

		peer.on("signal", (signal) => {
			socketRef.current.emit("sending signal", {
				userToSignal,
				callerID,
				signal,
			});
		});

		return peer;
	}

	function addPeer(incomingSignal, callerID, stream) {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream,
		});

		peer.on("signal", (signal) => {
			socketRef.current.emit("returning signal", { signal, callerID });
		});

		peer.signal(incomingSignal);

		return peer;
	}

	const toggleMic = () => {
		setIsMicMuted((prevMuted) => !prevMuted);
		const audioTracks = userVideo.current.srcObject.getAudioTracks();
		audioTracks.forEach((track) => {
			track.enabled = !isMicMuted;
		});
	};

	const toggleVideo = () => {
		setIsVideoMuted((prevMuted) => !prevMuted);
		const videoTracks = userVideo.current.srcObject.getVideoTracks();
		videoTracks.forEach((track) => {
			track.enabled = !isVideoMuted;
		});
	};

	const handleOnChangeMessage = (event) => {
		setMessage(event.target.value);
	};

	const sendMessage = async () => {
		const messageData = {
			name: isLoggedIn ? userInfo.fullName : "User",
			room: roomID,
			message: message,
			time:
				new Date(Date.now()).getHours().toString().padStart(2, "0") +
				":" +
				new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
		};

		if (message.trim() !== "") {
			await socketRef.current.emit("sendMessage", messageData);
			setMessages((prevMessages) => [...prevMessages, messageData]);
			setMessage("");
		}
	};

	const goBack = () => {
		props.history.push("/home");
	};

	return (
		<>
			<div className="booking-detail-doctor-container">
				<div className="detail-doctor-header">
					<div className="detail-doctor-header-left">
						<i
							className="fas fa-long-arrow-left"
							onClick={goBack}
						></i>
						<p style={{ color: "white" }}>{roomID}</p>
					</div>
					<div className="detail-doctor-header-right">
						<div className="detail-doctor-header-support">
							<i className="far fa-question-circle"></i>
							Hỗ trợ
						</div>
						<i className="fas fa-bars"></i>
					</div>
				</div>
				<div className="room-container">
					<div className="video-box">
						<video
							id="localVideo"
							autoPlay
							playsInline
							ref={userVideo}
							style={{ transform: "scaleX(-1)" }}
						></video>
						{peers
							? peers.map((peer, index) => {
									return <Video key={index} peer={peer} />;
							  })
							: ""}
						{/* <video
							id="remoteVideo"
							autoPlay
							ref={this.ref}
							style={{ transform: "scaleX(-1)" }}
						></video> */}
						<div className="mute-mic">
							{isMicMuted ? (
								<i
									className="fa-solid fa-microphone"
									onClick={toggleMic}
								></i>
							) : (
								<i
									className="fa-solid fa-microphone-slash"
									onClick={toggleMic}
								></i>
							)}
						</div>
						<div className="mute-mic">
							<div className="mute-video">
								{isVideoMuted ? (
									<i
										className="fa-solid fa-video"
										onClick={toggleVideo}
									></i>
								) : (
									<i
										className="fa-solid fa-video-slash"
										onClick={toggleVideo}
									></i>
								)}
							</div>
						</div>
					</div>
					<div className="chat-box">
						<div id="chatBox">
							{messages.map((msg, index) => (
								<div key={index}>
									<div className="msg-content">
										<h3 className="msg-message">
											{msg.message}
										</h3>
										<p className="msg-name">
											{msg.name} ({msg.time})
										</p>
									</div>
								</div>
							))}
						</div>
						<div className="video-box-send">
							<input
								type="text"
								id="messageInput"
								placeholder="Type a message"
								onChange={handleOnChangeMessage}
								value={message}
								onKeyPress={(event) => {
									event.key === "Enter" && sendMessage();
								}}
							/>
							<button
								id="sendMessageButton"
								onClick={sendMessage}
							>
								Send
							</button>
						</div>
					</div>
				</div>

				<div className="booking-detail-doctor-container">
					<div className="footer2-room">
						<div className="footer-left">
							<p>&copy; 2022 Pham Duc Tinh</p>
						</div>
						<div className="footer-right">
							<i className="fab fa-facebook-square"></i>
							<i className="fab fa-youtube"></i>
							<i className="fab fa-instagram"></i>
							<i className="fab fa-twitter"></i>
						</div>
					</div>
				</div>
			</div>
		</>
	);
};

export default Room;
