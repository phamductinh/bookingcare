import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import { toast } from "react-toastify";
import { io } from "socket.io-client";
import Peer from "simple-peer";
const socket = io.connect('http://localhost:5000')

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondUserStream: null,
			button1: true,
			button2: true,
		};
		this.refVideo = React.createRef();
		this.refSecondVideo = React.createRef();
		this.socket = null;
		this.roomCode = this.props.match.params.code;
	}

	componentDidMount() {}

	handleUserJoin = () => {
		this.setState({
			button1: false,
		});
		const video = this.refVideo.current;
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				this.refVideo.current.srcObject = stream;
				video.play();
			});
		socket.emit("joinRoom", this.roomCode);
	};

	handleSecondUserJoin = () => {
		this.setState({
			button2: false,
		});
		// const video = this.refSecondVideo.current;
		// navigator.mediaDevices
		// 	.getUserMedia({ video: true, audio: true })
		// 	.then((stream) => {
		// 		this.refSecondVideo.current.srcObject = stream;
		// 		video.play();
		// 	});
		const peer = new Peer();
		const video = this.refSecondVideo.current;
		peer.on("stream", (stream) => {
			this.refSecondVideo.current.srcObject = stream;
			video.play();
		});
	};

	goBack = () => {
		this.props.history.push(`/`);
	};

	render() {
		let { secondUserStream, button1, button2 } = this.state;
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
								ref={this.refVideo}
								muted
								style={{ transform: "scaleX(-1)" }}
							></video>
							<video
								id="remoteVideo"
								autoPlay
								ref={this.refSecondVideo}
								style={{ transform: "scaleX(-1)" }}
							></video>

							<div id="chatBox"></div>
							{button1 && (
								<button
									className="btn-join-room"
									onClick={() => this.handleUserJoin()}
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
							/>
							<button id="sendMessageButton">Send</button>
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
