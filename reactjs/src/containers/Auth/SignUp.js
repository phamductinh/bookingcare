import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleCreateUser } from "../../services/userService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Link } from "react-router-dom";

import "./SignUp.css";

class SignUp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			confirmPass: "",
			fullName: "",
			role: "",
			errMsg: "",
			errMsgSignUp: "",
			isShowPass: false,
		};
	}

	componentDidMount() {}

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	toggleShowPassword = () => {
		this.setState((prevState) => ({
			isShowPass: !prevState.isShowPass,
		}));
	};

	validateFullName(fullName) {
		if (fullName.length > 100) {
			return false;
		}
		let regex = /^[a-zA-Z\s]+$/;
		return regex.test(fullName);
	}

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

	handleAddNewUser = async (event) => {
		this.setState({
			errMsgSignUp: "",
		});
		let newUserData = {
			email: this.state.email,
			password: this.state.password,
			fullName: this.state.fullName,
			role: this.state.role ? this.state.role : "User",
		};
		event.preventDefault();
		event.stopPropagation();

		const form = event.currentTarget;
		if (!form.checkValidity()) {
			form.classList.add("was-validated");
		} else if (!this.validateFullName(this.state.fullName)) {
			this.setState({
				errMsgSignUp: "Tên không được chứa kí tự đặc biệt!",
			});
		} else if (!this.validateEmail(this.state.email)) {
			this.setState({
				errMsgSignUp: "Email sai định dạng!",
			});
		} else if (!this.validatePassword(this.state.password)) {
			this.setState({
				errMsgSignUp: "Password sai định dạng!",
			});
		} else if (newUserData.password !== this.state.confirmPass) {
			this.setState({
				errMsgSignUp: "Mật khẩu không trùng nhau!",
			});
		} else {
			try {
				let response = await handleCreateUser(newUserData);
				toast.success("Tạo tài khoản thành công!");
				console.log("check response", response);
				this.setState({
					email: "",
					password: "",
					confirmPass: "",
					fullName: "",
				});
			} catch (error) {
				if (error.response) {
					if (error.response.data) {
						this.setState({
							errMsgSignUp: error.response.data.msg,
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
			<div className="signup-container">
				<div className="signup-box">
					<div
						className="login-logo"
						onClick={() => this.handleShowHome()}
					></div>
					<form
						className="signup-form needs-validation"
						onSubmit={this.handleAddNewUser}
						noValidate
					>
						<div className="form-container">
							<div className="input-group">
								<label>Họ và tên:</label>
								<input
									type="text"
									className="form-control"
									name="fullName"
									id="validationCustom01"
									autoComplete="off"
									value={this.state.fullName}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"fullName"
										)
									}
									required
								/>
								<i className="fa-solid fa-user"></i>
								<div className="invalid-feedback">
									Vui lòng điền đầy đủ thông tin!
								</div>
							</div>
							<div className="input-group">
								<label>Email:</label>
								<input
									type="email"
									className="form-control"
									name="email"
									id="email"
									autoComplete="off"
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeInput(event, "email")
									}
									required
								/>
								<i className="fa-solid fa-envelope"></i>
								<div className="invalid-feedback">
									Vui lòng điền đầy đủ thông tin!
								</div>
							</div>
							<div className="input-group">
								<label>Mật khẩu:</label>
								<input
									type={
										this.state.isShowPass
											? "text"
											: "password"
									}
									className="form-control"
									name="password"
									id="password"
									autoComplete="off"
									value={this.state.password}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"password"
										)
									}
									required
								/>
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
								<div className="invalid-feedback">
									Vui lòng điền đầy đủ thông tin!
								</div>
							</div>
							<div className="input-group">
								<label>Nhập lại mật khẩu:</label>
								<input
									type={
										this.state.isShowPass
											? "text"
											: "password"
									}
									className="form-control"
									name="cf-password"
									id="cf-password"
									autoComplete="off"
									value={this.state.confirmPass}
									onChange={(event) =>
										this.handleOnchangeInput(
											event,
											"confirmPass"
										)
									}
									required
								/>
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
								<div className="invalid-feedback">
									Vui lòng điền đầy đủ thông tin!
								</div>
							</div>
						</div>
						<div className="errMsgSignUp">
							{this.state.errMsgSignUp}
						</div>
						<div className="signup-btn">
							<button
								type="submit"
								className="btn-signup"
								// onClick={() => this.handleAddNewUser()}
							>
								Sign up
							</button>
						</div>
						<p className="member">
							Đã có tài khoản ?<Link to="/login">Đăng nhập</Link>
						</p>
					</form>
				</div>
			</div>
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
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
