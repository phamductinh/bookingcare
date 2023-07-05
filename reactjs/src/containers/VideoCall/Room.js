import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import SimplePeer from "simple-peer";
const socket = io.connect("http://localhost:8080");

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

	componentDidMount() {
		const { code, userVideoRef } = this.state;
		const socket = new SimplePeer({
			initiator: true,
			trickle: false,
			stream: userVideoRef.current.srcObject,
		});

		socket.on("signal", (signal) => {
			this.sendSignalToPeer(signal);
		});

		socket.on("stream", (stream) => {
			const { partnerVideoRef } = this.state;
			partnerVideoRef.current.srcObject = stream;
		});

		socket.on("disconnect", () => {
			// Xử lý sự kiện ngắt kết nối
		});

		this.setState({ socket });

		socket.on("message", (message) => {
			this.setState((prevState) => ({
				messages: [...prevState.messages, message],
			}));
		});
	}

	componentWillUnmount() {
		const { socket } = this.state;
		if (socket) {
			socket.destroy();
		}
	}

	sendSignalToPeer = (signal) => {
		// Gửi signal tới server hoặc peer cần kết nối
	};

	handleReceiveSignal = (signal) => {
		const { socket } = this.state;
		if (socket) {
			socket.signal(signal);
		}
	};

	handleStartCall = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				const { userVideoRef, socket } = this.state;
				userVideoRef.current.srcObject = stream;
				if (socket) {
					socket.addStream(stream);
				}
			})
			.catch((error) => {
				// Xử lý lỗi
			});
	};

	handleOnchangeMassage = (event) => {
		this.setState({
			message: event.target.value,
		});
	};

	sendMessage = (e) => {
		e.preventDefault();
		const { message } = this.state;
		if (message.trim() !== "") {
			socket.emit("sendMessage", message);
			this.setState({ message: "" });
		}
	};

	goBack = () => {
		this.props.history.push(`/`);
	};

	render() {
		let {
			userVideoRef,
			partnerVideoRef,
			button1,
			button2,
			message,
			messages,
		} = this.state;
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
							{button1 && (
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
							)}
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
