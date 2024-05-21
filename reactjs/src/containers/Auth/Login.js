import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI } from "../../services/userService";
import * as actions from "../../store/actions/";
import "react-toastify/dist/ReactToastify.css";
import { Link, Redirect } from "react-router-dom";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errMsg: "",
			isShowPass: false,
		};
	}

	handleOnchangeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};
	handleOnchangePassword = (event) => {
		this.setState({
			password: event.target.value,
		});
	};

	toggleShowPassword = () => {
		this.setState((prevState) => ({
			isShowPass: !prevState.isShowPass,
		}));
	};

	validateEmail(email) {
		let regex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
		return regex.test(email);
	}

	validatePassword(password) {
		let regex =
			/^(?=.*[A-Z])(?=.*[-!$%^&*()_+|~=`{}\[\]:";'<>?,.\/])(?=.*[a-zA-Z]).{8,30}$/;
		return regex.test(password);
	}

	handleLogin = async () => {
		this.setState({
			errMsg: "",
		});
		if (this.state.email === "" || this.state.password === "") {
			this.setState({
				errMsg: "Vui lòng nhập đầy đủ thông tin!",
			});
		} else if (!this.validateEmail(this.state.email)) {
			this.setState({
				errMsg: "Email sai định dạng!",
			});
		} else if (!this.validatePassword(this.state.password)) {
			this.setState({
				errMsg: "Mật khẩu bao gồm 1 ký tự đầu viết hoa, 1 số và 1 ký tự đặc biệt!",
			});
		} else {
			try {
				let data = await handleLoginAPI(
					this.state.email,
					this.state.password
				);
				console.log(data);
				if (data && data.code === 200) {
					this.props.userLoginSuccess(data.user);
					localStorage.setItem("token", data.token);
				}
			} catch (error) {
				if (error.response) {
					if (error.response.data) {
						this.setState({
							errMsg: error.response.data.msg,
						});
					}
				}
			}
		}
	};

	handleShowHome = () => {
		this.props.history.push(`/`);
	};

	render() {
		return (
			<>
				<div className="login-container">
					<div className="login-box">
						<div
							className="login-logo"
							onClick={() => this.handleShowHome()}
						></div>
						<form className="login-form">
							<div className="user-box">
								<input
									type="text"
									id="email"
									required=""
									autoComplete="off"
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeEmail(event)
									}
								/>
								<label>Email:</label>
								<i className="fa-solid fa-envelope"></i>
							</div>
							<div className="user-box">
								<input
									type={
										this.state.isShowPass
											? "text"
											: "password"
									}
									id="password"
									required=""
									autoComplete="off"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangePassword(event)
									}
								/>
								<label>Mật khẩu:</label>
								{this.state.isShowPass ? (
									<i
										class="fa-solid fa-eye"
										onClick={this.toggleShowPassword}
									></i>
								) : (
									<i
										class="fa-solid fa-eye-slash"
										onClick={this.toggleShowPassword}
									></i>
								)}
							</div>
							<div className="errMsg" style={{ color: "red" }}>
								{this.state.errMsg}
							</div>
							<Link to="/forgot-password" className="forgot-pass">
								Quên mật khẩu ?
							</Link>
							<div>
								<button
									type="button"
									className="btn-login"
									onClick={() => this.handleLogin()}
								>
									Login
								</button>
							</div>
							<p className="not-member">
								Chưa có tài khoản ?
								<Link to="/sign-up">Đăng kí</Link>
							</p>
						</form>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
