// import React, { Component, useEffect } from "react";
// import { connect } from "react-redux";
// import "./Room.css";
// import { io } from "socket.io-client";
// import Peer from "simple-peer";

// // const Video = (props) => {
// // 	const { peer } = props;

// // 	useEffect(() => {
// // 		peer.on("stream", (stream) => {
// // 			this.ref.current.srcObject = stream;
// // 		});
// // 	}, [peer]);

// // 	return (
// // 		<video
// // 			id="remoteVideo"
// // 			autoPlay
// // 			ref={this.ref}
// // 			style={{ transform: "scaleX(-1)" }}
// // 		></video>
// // 	);
// // };

// class Room extends Component {
// 	constructor(props) {
// 		super(props);
// 		this.state = {
// 			socket: null,
// 			message: "",
// 			messages: [],
// 			peers: [],
// 		};

// 		this.socketRef = io("http://localhost:8080", {
// 			transports: ["websocket"],
// 		});
// 		this.userVideo = React.createRef();
// 		this.peersRef = React.createRef();
// 		this.peersRef.current = [];
// 		this.videoRef = React.createRef();
// 		this.ref = React.createRef();
// 		this.roomID = props.match.params.code;
// 	}

// 	componentDidMount() {
// 		const socket = io("http://localhost:8080", {
// 			transports: ["websocket"],
// 		});

// 		// this.socketRef.on("stream", (stream) => {
// 		// 	this.userVideo.current.srcObject = stream;
// 		// });

// 		socket.on("stream", (stream) => {
// 			this.ref.current.srcObject = stream;
// 		});

// 		socket.on("receive-message", (data) => {
// 			this.setState((prevState) => ({
// 				messages: [...prevState.messages, data],
// 			}));
// 		});

// 		navigator.mediaDevices
// 			.getUserMedia({ video: true, audio: true })
// 			.then((stream) => {
// 				this.userVideo.current.srcObject = stream;
// 				socket.emit("join room", this.roomID);
// 				socket.on("all users", (users) => {
// 					const peers = [];
// 					users.forEach((userID) => {
// 						const peer = this.createPeer(
// 							userID,
// 							this.socketRef.id,
// 							stream
// 						);

// 						this.peersRef.current.push({
// 							peerID: userID,
// 							peer,
// 						});
// 						peers.push(peer);
// 					});
// 					this.setState({ peers });
// 				});

// 				socket.on("user joined", (payload) => {
// 					const peer = this.addPeer(
// 						payload.signal,
// 						payload.callerID,
// 						stream
// 					);
// 					this.peersRef.current.push({
// 						peerID: payload.callerID,
// 						peer,
// 					});

// 					this.setState((prevState) => ({
// 						peers: [...prevState.peers, peer],
// 					}));
// 				});

// 				socket.on("receiving returned signal", (payload) => {
// 					const item = this.peersRef.current.find(
// 						(p) => p.peerID === payload.id
// 					);
// 					item.peer.signal(payload.signal);
// 				});
// 			});
// 	}

// 	createPeer(userToSignal, callerID, stream) {
// 		const peer = new Peer({
// 			initiator: true,
// 			trickle: false,
// 			stream,
// 		});
// 		peer.on("signal", (signal) => {
// 			this.socketRef.emit("sending signal", {
// 				userToSignal,
// 				callerID,
// 				signal,
// 			});
// 		});

// 		return peer;
// 	}

// 	addPeer(incomingSignal, callerID, stream) {
// 		const peer = new Peer({
// 			initiator: false,
// 			trickle: false,
// 			stream,
// 		});

// 		peer.on("signal", (signal) => {
// 			this.socketRef.emit("returning signal", { signal, callerID });
// 		});

// 		peer.signal(incomingSignal);

// 		return peer;
// 	}

// 	handleOnchangeMassage = (event) => {
// 		this.setState({
// 			message: event.target.value,
// 		});
// 	};

// 	sendMessage = () => {
// 		const { message } = this.state;
// 		const messageData = {
// 			name: this.props.isLoggedIn ? this.props.userInfo.fullName : "User",
// 			room: this.roomID,
// 			message: message,
// 			time:
// 				new Date(Date.now()).getHours().toString().padStart(2, "0") +
// 				":" +
// 				new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
// 		};
// 		if (message.trim() !== "") {
// 			this.socketRef.emit("sendMessage", messageData);
// 			this.setState((prevState) => ({
// 				messages: [...prevState.messages, messageData],
// 			}));
// 		}
// 	};

// 	goBack = () => {
// 		this.props.history.push(`/join-room`);
// 	};

// 	render() {
// 		let { messages } = this.state;
// 		console.log(messages);
// 		return (
// 			<>
// 				<div className="booking-detail-doctor-container">
// 					<div className="detail-doctor-header">
// 						<div className="detail-doctor-header-left">
// 							<i
// 								className="fas fa-long-arrow-left"
// 								onClick={this.goBack}
// 							></i>
// 							<p>{this.roomCode}</p>
// 						</div>
// 						<div className="detail-doctor-header-right">
// 							<div className="detail-doctor-header-support">
// 								<i className="far fa-question-circle"></i>
// 								Hỗ trợ
// 							</div>
// 							<i className="fas fa-bars"></i>
// 						</div>
// 					</div>
// 					<div className="room-container">
// 						<div className="chat-box">
// 							<video
// 								id="localVideo"
// 								autoPlay
// 								ref={this.userVideo}
// 								muted
// 								style={{ transform: "scaleX(-1)" }}
// 							></video>
// 							{/* {this.state.peers.map((peer, index) => {
// 								return <Video key={index} peer={peer} />;
// 							})} */}
// 							<video
// 								id="remoteVideo"
// 								autoPlay
// 								ref={this.ref}
// 								style={{ transform: "scaleX(-1)" }}
// 							></video>

// 							<div></div>
// 							<div id="chatBox">
// 								{messages.map((msg) => (
// 									<div>
// 										<div className="msg-content">
// 											<h3 className="msg-message">
// 												{msg.message}
// 											</h3>
// 											<p className="msg-name">
// 												{msg.name} ({msg.time})
// 											</p>
// 										</div>
// 									</div>
// 								))}
// 							</div>
// 						</div>
// 						<div className="chat-box">
// 							<input
// 								type="text"
// 								id="messageInput"
// 								placeholder="Type a message"
// 								onChange={(event) =>
// 									this.handleOnchangeMassage(event)
// 								}
// 								onKeyPress={(event) => {
// 									event.key === "Enter" && this.sendMessage();
// 								}}
// 							/>
// 							<button
// 								id="sendMessageButton"
// 								onClick={() => this.sendMessage()}
// 							>
// 								Send
// 							</button>
// 						</div>
// 					</div>

// 					<div className="booking-detail-doctor-container">
// 						<div className="footer2-room">
// 							<div className="footer-left">
// 								<p>&copy; 2022 Pham Duc Tinh</p>
// 							</div>
// 							<div className="footer-right">
// 								<i className="fab fa-facebook-square"></i>
// 								<i className="fab fa-youtube"></i>
// 								<i className="fab fa-instagram"></i>
// 								<i className="fab fa-twitter"></i>
// 							</div>
// 						</div>
// 					</div>
// 				</div>
// 			</>
// 		);
// 	}
// }

// const mapStateToProps = (state) => {
// 	return {
// 		userInfo: state.user.userInfo,
// 		isLoggedIn: state.user.isLoggedIn,
// 	};
// };

// const mapDispatchToProps = (dispatch) => {
// 	return {};
// };

// export default connect(mapStateToProps, mapDispatchToProps)(Room);

import React, { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import Peer from "simple-peer";
import styled from "styled-components";

const Container = styled.div`
	padding: 20px;
	display: flex;
	height: 100vh;
	width: 90%;
	margin: auto;
	flex-wrap: wrap;
`;

const StyledVideo = styled.video`
	height: 40%;
	width: 50%;
`;

const Video = (props) => {
	const ref = useRef();

	useEffect(() => {
		props.peer.on("stream", (stream) => {
			ref.current.srcObject = stream;
		});
	}, []);

	return <StyledVideo playsInline autoPlay ref={ref} />;
};

const videoConstraints = {
	height: window.innerHeight / 2,
	width: window.innerWidth / 2,
};

const Room = (props) => {
	const [peers, setPeers] = useState([]);
	const socketRef = useRef();
	const userVideo = useRef();
	const peersRef = useRef([]);
	const roomID = props.match.params.roomID;

	useEffect(() => {
		socketRef.current = io.connect("http://localhost:8080", {
			transports: ["websocket"],
		});
		navigator.mediaDevices
			.getUserMedia({ video: videoConstraints, audio: true })
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
					item.peer.signal(payload.signal);
				});
			});
	}, []);

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

	return (
		<Container>
			<StyledVideo muted ref={userVideo} autoPlay playsInline />
			{peers.map((peer, index) => {
				return <Video key={index} peer={peer} />;
			})}
		</Container>
	);
};

export default Room;
