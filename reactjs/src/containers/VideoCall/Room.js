import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			code: props.match.params.code,
			userVideoRef: React.createRef(),
			partnerVideoRef: React.createRef(),
			socket: null,
			button1: true,
			button2: true,
			message: "",
			messages: [],
		};
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
		const { code, userVideoRef } = this.state;
		const socket = io("http://localhost:8080", {
			transports: ["websocket"],
		});

		this.setState({ socket });

		socket.emit("join room", code);

		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				userVideoRef.current.srcObject = stream;

				// Người đầu tiên vào phòng sẽ là người gọi
				const initiator = socket.rooms[code].length === 2;

				const peer = new SimplePeer({
					initiator,
					trickle: false,
					stream,
				});

				peer.on("signal", (signal) => {
					this.sendSignalToPeer(signal);
				});

				peer.on("stream", (stream) => {
					const { partnerVideoRef } = this.state;
					partnerVideoRef.current.srcObject = stream;
				});

				peer.on("connect", () => {
					console.log("Connection established");
				});

				peer.on("disconnect", () => {
					console.log("Disconnected");
				});

				this.setState({ peer });
			})
			.catch((error) => {
				console.error("Error accessing media devices:", error);
			});

		socket.on("signal", (data) => {
			this.handleReceiveSignal(data);
		});
	}

	componentWillUnmount() {
		const { socket } = this.state;
		if (socket) {
			socket.disconnect();
		}
	}

	sendSignalToPeer = (signal) => {
		const { socket, code } = this.state;
		socket.emit("signal", { signal, roomID: code });
		console.log("Check connect");
	};

	handleReceiveSignal = (signal) => {
		const { socket } = this.state;
		if (socket) {
			socket.signal(signal);
		}
	};

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
		if (message.trim() !== "" && socket) {
			socket.emit("sendMessage", message);
			this.setState({ message: "" });
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
								ref={userVideoRef}
								muted
								style={{ transform: "scaleX(-1)" }}
							></video>
							<video
								id="remoteVideo"
								autoPlay
								ref={partnerVideoRef}
								style={{ transform: "scaleX(-1)" }}
							></video>

							<div id="chatBox">
								{messages.map((msg, index) => (
									<div key={index}>
										<strong>{msg.user}: </strong>
										{msg.text}
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Room);
