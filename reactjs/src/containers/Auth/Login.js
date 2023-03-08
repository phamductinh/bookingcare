import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import { handleLoginAPI } from "../../services/userService";
import "./Login.css";

class Login extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: "",
			password: "",
		};
	}

	handleOnchangeInputs = (event) => {
		this.setState({
			[event.target.name]: event.target.value,
		});
	};

	handleLogin = async () => {
		console.log("email:", this.state.email);
		console.log("password:", this.state.password);
		try {
			await handleLoginAPI(this.state.email, this.state.password);
		} catch (error) {
			console.log(error);
		}
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
								name="email"
								value={this.state.email}
								onChange={(event) =>
									this.handleOnchangeInputs(event)
								}
							/>
							<label>Email</label>
						</div>
						<div className="user-box">
							<input
								type="password"
								onChange={(event) =>
									this.handleOnchangeInputs(event)
								}
								name="password"
							/>
							<label>Password</label>
						</div>
						<button
							className="btn-login"
							onClick={() => this.handleLogin()}
						>
							Login
						</button>
						<button className="btn-signup">Sign up</button>
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
