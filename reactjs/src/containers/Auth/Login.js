import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI } from "../../services/userService";
import * as actions from "../../store/actions/";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
			errMsg: "",
			setModalIsOpen: false,
			setLoginOpen: true,
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

	handleLogin = async () => {
		this.setState({
			errMsg: "",
		});
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
				localStorage.setItem("token", data.token);
				this.props.userLoginSuccess(data.user);
				console.log("login succeed", data);
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
	};

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
			setLoginOpen: false,
		});
	}
    
	handleCloseModal() {
        this.setState({
            setModalIsOpen: false,
            setLoginOpen: true,
		});
	}

	render() {
		let { setModalIsOpen, setLoginOpen } = this.state;
		return (
			<>
				<div className="login-container">
					{setLoginOpen ? (
						<div className="login-box">
							<h2>Login</h2>
							<form>
								<div className="user-box">
									<input
										type="email"
										autoComplete="off"
										value={this.state.email}
										onChange={(event) =>
											this.handleOnchangeEmail(event)
										}
									/>
									<label>Email</label>
								</div>
								<div className="user-box">
									<input
										type="password"
										autoComplete="off"
										value={this.state.password}
										onChange={(event) =>
											this.handleOnchangePassword(event)
										}
									/>
									<label>Password</label>
								</div>
								<div
									className="errMsg"
									style={{ color: "red" }}
								>
									{this.state.errMsg}
								</div>
								<button
									type="button"
									className="btn-login"
									onClick={() => this.handleLogin()}
								>
									Login
								</button>
								<button
									type="button"
									className="btn-signup"
									onClick={() => this.handleOpenModal()}
								>
									Sign up
								</button>
							</form>
						</div>
					) : null}
				</div>

				{setModalIsOpen ? (
					<div id="add-new-modal" className="modal">
						<div className="modal-content">
							<p>Create a new user</p>
							<input
								className="email"
								type="email"
                                name="email"
								placeholder="Email"
							/>
							<div className="pass-field">
								<input
									className="password"
                                    name="password"
									type="password"
									placeholder="Password"
								/>
								<input
									className="confirm-password"
                                    name="cf-password"
									type="password"
									placeholder="Confirm Password"
								/>
							</div>
							<input
								className="fullname"
                                name="fullname"
								type="text"
								placeholder="Full name"
							/>
							<input
								className="address"
                                name="address"
								type="text"
								placeholder="Address"
							/>

							<div className="modal-select">
								<select name="gender" id="gender-select">
									<option value="male">Male</option>
									<option value="female">Female</option>
									<option value="other">Other</option>
								</select>

								<select name="role" id="role-select">
									<option value="admin">Admin</option>
									<option value="doctor">Doctor</option>
									<option value="user">User</option>
								</select>

								<input
									className="phoneNumber"
                                    name="phonenumber"
									type="tel"
									placeholder="Phone"
								/>
							</div>

							<div className="modal-btn">
								<button className="btn-add-new">Add</button>
								<button
									className="btn-cancel"
									type="button"
									onClick={() => this.handleCloseModal()}
								>
									Cancel
								</button>
							</div>
						</div>
					</div>
				) : null}
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
		userLoginSuccess: (userInfor) =>
			dispatch(actions.userLoginSuccess(userInfor)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
