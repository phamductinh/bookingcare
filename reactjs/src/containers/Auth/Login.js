import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI } from "../../services/userService";
import * as actions from "../../store/actions/";
import { Helmet } from "react-helmet";
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

	render() {
		return (
			<>
				<Helmet>
					<style>{`
                        body {
                            margin: 0;
                            padding: 0;
                            font-family: sans-serif;
                            background-image: url("/src/assets/images/banner1.jpg");
                            background-size: cover;
                            background-repeat: no-repeat;
                            background-position: center;
                        }
                    `}</style>
				</Helmet>
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
						<div className="errMsg" style={{ color: "red" }}>
							{this.state.errMsg}
						</div>
						<button
							type="button"
							className="btn-login"
							onClick={() => this.handleLogin()}
						>
							Login
						</button>
						<button className="btn-signup">Sign up</button>
					</form>
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
		userLoginSuccess: (userInfor) =>
			dispatch(actions.userLoginSuccess(userInfor)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
