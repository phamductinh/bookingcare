import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Peer from "simple-peer";

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			userVideoRef: React.createRef(),
			partnerVideoRef: React.createRef(),
			socket: null,
			button1: true,
			button2: true,
			message: "",
			messages: [],
			peers: [],
		};

		this.socketRef = io.connect("http://localhost:8080");
		this.userVideo = React.createRef();
		this.peersRef = React.createRef();
		this.videoRef = React.createRef();
		this.roomID = props.match.params.code;
	}

	// componentDidMount() {
	// 	try {
	// 		const { code, userVideoRef } = this.state;
	// 		const socket = io("http://localhost:8080", {
	// 			transports: ["websocket"],
	// 		});

	// 		this.setState({ socket });

	// 		const peer = new SimplePeer({
	// 			initiator: true,
	// 			trickle: false,
	// 		});

	// 		navigator.mediaDevices
	// 			.getUserMedia({ video: true, audio: true })
	// 			.then((stream) => {
	// 				userVideoRef.current.srcObject = stream;
	// 				peer.addStream(stream); // Add stream to SimplePeer
	// 			})
	// 			.catch((error) => {
	// 				console.error("Error accessing media devices:", error);
	// 			});

	// 		peer.on("signal", (signal) => {
	// 			this.sendSignalToPeer(signal);
	// 		});

	// 		peer.on("stream", (stream) => {
	// 			const { partnerVideoRef } = this.state;
	// 			partnerVideoRef.current.srcObject = stream;
	// 		});

	// 		peer.on("disconnect", () => {
	// 			// Xử lý sự kiện ngắt kết nối
	// 		});

	// 		this.setState({ peer });

	// 		socket.on("message", (message) => {
	// 			this.setState((prevState) => ({
	// 				messages: [...prevState.messages, message],
	// 			}));
	// 		});
	// 	} catch (err) {
	// 		console.log(err);
	// 	}
	// }

	componentDidMount() {
		const socket = io("http://localhost:8080", {
			transports: ["websocket"],
		});

		this.props.peer.on("stream", (stream) => {
			this.videoRef.current.srcObject = stream;
		});

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				this.userVideo.current.srcObject = stream;
				this.socketRef.emit("join room", this.roomID);
				this.socketRef.on("all users", (users) => {
					const peers = [];
					users.forEach((userID) => {
						const peer = this.createPeer(
							userID,
							this.socketRef.id,
							stream
						);
						this.peersRef.current.push({
							peerID: userID,
							peer,
						});
						peers.push(peer);
					});
					this.setState({ peers });
				});

				this.socketRef.on("user joined", (payload) => {
					const peer = this.addPeer(
						payload.signal,
						payload.callerID,
						stream
					);
					this.peersRef.current.push({
						peerID: payload.callerID,
						peer,
					});

					this.setState((prevState) => ({
						peers: [...prevState.peers, peer],
					}));
				});

				this.socketRef.on("receiving returned signal", (payload) => {
					const item = this.peersRef.current.find(
						(p) => p.peerID === payload.id
					);
					item.peer.signal(payload.signal);
				});
			});

		socket.on("receive-message", (data) => {
			this.setState((prevState) => ({
				messages: [...prevState.messages, data],
			}));
		});
	}

	createPeer(userToSignal, callerID, stream) {
		const peer = new Peer({
			initiator: true,
			trickle: false,
			stream,
		});

		peer.on("signal", (signal) => {
			this.socketRef.emit("sending signal", {
				userToSignal,
				callerID,
				signal,
			});
		});

		return peer;
	}

	addPeer(incomingSignal, callerID, stream) {
		const peer = new Peer({
			initiator: false,
			trickle: false,
			stream,
		});

		peer.on("signal", (signal) => {
			this.socketRef.emit("returning signal", { signal, callerID });
		});

		peer.signal(incomingSignal);

		return peer;
	}

	// componentWillUnmount() {
	// 	const { socket } = this.state;
	// 	if (socket) {
	// 		socket.disconnect();
	// 	}
	// }

	// sendSignalToPeer = (signal) => {
	// 	const { socket, code } = this.state;
	// 	socket.emit("signal", { signal, roomID: code });
	// 	console.log("Check connect");
	// };

	// handleReceiveSignal = (signal) => {
	// 	const { socket } = this.state;
	// 	if (socket) {
	// 		socket.signal(signal);
	// 	}
	// };

	// handleStartCall = () => {
	// 	navigator.mediaDevices
	// 		.getUserMedia({ video: true, audio: true })
	// 		.then((stream) => {
	// 			const { userVideoRef, socket } = this.state;
	// 			userVideoRef.current.srcObject = stream;
	// 			if (socket) {
	// 				socket.addStream(stream);
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			// Xử lý lỗi
	// 		});
	// };

	handleOnchangeMassage = (event) => {
		this.setState({
			message: event.target.value,
		});
	};

	sendMessage = () => {
		const { message, socket } = this.state;
		const messageData = {
			name: this.props.isLoggedIn ? this.props.userInfo.fullName : "User",
			room: this.state.code,
			message: message,
			time:
				new Date(Date.now()).getHours().toString().padStart(2, "0") +
				":" +
				new Date(Date.now()).getMinutes().toString().padStart(2, "0"),
		};
		if (message.trim() !== "") {
			socket.emit("sendMessage", messageData);
			this.setState((prevState) => ({
				messages: [...prevState.messages, messageData],
			}));
		}
	};

	goBack = () => {
		this.props.history.push(`/`);
	};

	render() {
		let { userVideoRef, partnerVideoRef, button1, button2, messages } =
			this.state;
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
							<p>{this.roomCode}</p>
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
						<div className="chat-box">
							<video
								id="localVideo"
								autoPlay
								ref={this.videoRef}
								muted
								style={{ transform: "scaleX(-1)" }}
							></video>
							<video
								id="remoteVideo"
								autoPlay
								ref={partnerVideoRef}
								style={{ transform: "scaleX(-1)" }}
							></video>

							<div></div>
							<div id="chatBox">
								{messages.map((msg) => (
									<div>
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
							{/* {button1 && (
								<button
									className="btn-join-room"
									onClick={() => this.handleStartCall()}
								>
									Tham gia
								</button>
							)}
							{button2 && (
								<button
									className="btn-join-room2"
									onClick={() => this.handleSecondUserJoin()}
								>
									Tham gia
								</button>
							)} */}
						</div>
						<div className="chat-box">
							<input
								type="text"
								id="messageInput"
								placeholder="Type a message"
								onChange={(event) =>
									this.handleOnchangeMassage(event)
								}
								onKeyPress={(event) => {
									event.key === "Enter" && this.sendMessage();
								}}
							/>
							<button
								id="sendMessageButton"
								onClick={() => this.sendMessage()}
							>
								Send
							</button>
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
	}
}

const mapStateToProps = (state) => {
	return {
		userInfo: state.user.userInfo,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
