import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./resetPassword.css";
import { toast } from "react-toastify";
import * as actions from "../../store/actions/";
import { resetPasswordService } from "../../services/userService";

class resetPassword extends Component {
	constructor(props) {
		super(props);
		this.state = {
			newPassword: "",
			cfPassword: "",
			isSuccess: false,
		};
	}

	async componentDidMount() {}

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
		console.log(this.state);
	};

	validatePassword(password) {
		let regex =
			/^(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,30}$/;
		return regex.test(password);
	}

	handleChangePassword = async () => {
		if (
			!this.state.email ||
			!this.state.newPassword ||
			!this.state.cfPassword
		) {
			this.setState({
				errMsgSignUp: "Vui lòng điền đầy đủ thông tin!",
			});
		} else if (this.state.newPassword !== this.state.cfPassword) {
			this.setState({
				errMsgSignUp: "Mật khẩu không trùng khớp!",
			});
		} else if (
			!this.validatePassword(this.state.newPassword) ||
			!this.validatePassword(this.state.cfPassword)
		) {
			this.setState({
				errMsgSignUp: "Password sai định dạng!",
			});
		} else {
			try {
				let userData = {
					password: this.state.newPassword,
					email: this.state.email,
				};
				let res = await resetPasswordService(userData);
				if (res && res.code === 200) {
					toast.success("Đổi mật khẩu thành công!");
					await this.setState({
						isSuccess: true,
						errMsgSignUp: "",
					});
				}
			} catch (error) {
				toast.error("Something wrong !");
			}
		}
	};

	goBack = () => {
		this.props.history.push(`/login`);
	};

	render() {
		let { isSuccess } = this.state;
		const { processLogout } = this.props;
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
					{!isSuccess ? (
						<div class="form-container-email">
							<div class="logo-container-email">Đổi mật khẩu</div>
							<form class="form-email">
								<div class="form-group-password">
									<label>Email tài khoản:</label>
									<input
										type="email"
										id="email"
										name="email"
										value={this.state.email}
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"email"
											)
										}
									/>
								</div>
								<div class="form-group-password">
									<label>Mật khẩu mới:</label>
									<input
										type="password"
										id="password"
										name="password"
										value={this.state.newPassword}
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"newPassword"
											)
										}
									/>
								</div>
								<div class="form-group-password">
									<label>Xác nhận mật khẩu:</label>
									<input
										type="password"
										id="password"
										name="password"
										value={this.state.cfPassword}
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"cfPassword"
											)
										}
									/>
								</div>
								<div className="errMsgSignUp">
									{this.state.errMsgSignUp}
								</div>
								<button
									class="form-submit-btn-email"
									type="button"
									onClick={() => this.handleChangePassword()}
								>
									Đổi
								</button>
							</form>
						</div>
					) : (
						<div className="go-login-delete">
							<div className="confirmation-text">
								Bạn đã đổi mật khẩu thành công, vui lòng đăng
								nhập lại!
							</div>
							<div className="button-container">
								<button
									className="go-login-button"
									onClick={processLogout}
								>
									Đăng nhập
								</button>
							</div>
						</div>
					)}

					<div className="booking-detail-doctor-container">
						<div className="footer2cf">
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
		userInfor: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processLogout: () => dispatch(actions.processLogout()),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(resetPassword);
