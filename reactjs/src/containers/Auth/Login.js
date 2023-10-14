import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI } from "../../services/userService";
import * as actions from "../../store/actions/";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errMsg: "",
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
				errMsg: "Mật khẩu sai định dạng!",
			});
		} else {
			try {
				let data = await handleLoginAPI(
					this.state.email,
					this.state.password
				);
				if (data && data.code !== 200) {
					this.setState({
						errMsg: data.msg,
					});
				}
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

	render() {
		return (
			<>
				<div className="login-container">
					<div className="login-box">
						<h2>Đăng nhập</h2>
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
									type="password"
									id="password"
									required=""
									autoComplete="off"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangePassword(event)
									}
								/>
								<label>Mật khẩu:</label>
								<i className="fa-solid fa-lock"></i>
							</div>
							<div className="errMsg" style={{ color: "red" }}>
								{this.state.errMsg}
							</div>
							<Link to="/confirm-email" className="forgot-pass">
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
