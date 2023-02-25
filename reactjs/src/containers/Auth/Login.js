import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
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

	handleLogin = () => {
		console.log("email:", this.state.email);
		console.log("password:", this.state.password);
	};

	render() {
		return (
			<body>
				<div className="login-box">
					<h2>Login</h2>
					<form>
						<div className="user-box">
							<input
								type="email"
								id="email"
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
								onChange={(event) =>
									this.handleOnchangePassword(event)
								}
								required=""
								id="password"
							/>
							<label>Password</label>
						</div>
						<a onClick={() => this.handleLogin()} href="#">
							Login
						</a>
						<a href="#">Sign up</a>
					</form>
				</div>
			</body>
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

export default connect(mapStateToProps, mapDispatchToProps)(Login);
