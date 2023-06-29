import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./Room.css";
import { toast } from "react-toastify";

class Room extends Component {
	constructor(props) {
		super(props);
		this.state = {
			secondUserStream: null,
		};
		this.refVideo = React.createRef();
		this.refSecondVideo = React.createRef();
		this.roomCode = this.props.match.params.code;
	}

	componentDidMount() {
		const video = this.refVideo.current;
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				this.refVideo.current.srcObject = stream;
				video.play();
			});
	}

	handleSecondUserJoin = () => {
		navigator.mediaDevices
			.getUserMedia({ video: true, audio: true })
			.then((stream) => {
				this.setState({ secondUserStream: stream });
			});
	};

	goBack = () => {
		this.props.history.push(`/`);
	};

	render() {
		let { secondUserStream } = this.state;
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
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
								style={{ transform: "scaleX(-1)" }}
							></video>
							<video
								id="remoteVideo"
								autoPlay
								ref={this.refSecondVideo}
							></video>

							<div id="chatBox"></div>
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
