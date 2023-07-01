import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./CallingHome.css";
import { toast } from "react-toastify";
import * as actions from "../../store/actions/";
import { io } from "socket.io-client";

class CallingHome extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	componentDidMount() {}

	goBack = () => {
		this.props.history.push(`/`);
	};

	handleOnchangeCode = async (event) => {
		await this.setState({
			code: event.target.value,
		});
		console.log(this.state.code);
	};

	handleJoinRoom = () => {
		let code = this.state.code;
		this.props.history.push(`/room/${code}`);
	};

	render() {
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
					<div class="form-container-email">
						<div class="logo-container-email">Join room</div>

						<form class="form-email">
							<div class="form-group-email">
								<label for="email">
									Vui lòng nhập mã được gửi về email để tham
									gia
								</label>
								<input
									type="text"
									id="code"
									name="code"
									placeholder="code"
									required=""
									onChange={(event) =>
										this.handleOnchangeCode(event)
									}
								/>
							</div>

							<button
								class="form-submit-btn-email"
								type="button"
								onClick={() => this.handleJoinRoom()}
							>
								Join
							</button>
						</form>
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
	return {
		joinRoomSuccess: () => dispatch(actions.joinRoomSuccess()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(CallingHome);
