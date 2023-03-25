import React, { Component } from "react";
import { connect } from "react-redux";
import {
	getAllUsers,
	handleCreateUser,
	deleteUser,
	editUser,
} from "../../services/userService";
import "./UserModal.css";

class UserModal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
			id: "",
			email: "",
			password: "",
			newEmail: "",
			newPassword: "",
			confirmPass: "",
			fullName: "",
			address: "",
			gender: "",
			role: "",
			phoneNumber: "",
			setModalIsOpen: false,
			setModalEditUser: false,
		};
	}

	async componentDidMount() {
		await this.getAllUsersReact();
	}

	getAllUsersReact = async () => {
		let token = localStorage.getItem("token");
		let res = await getAllUsers(token);
		if (res && res.code === 200) {
			this.setState({
				arrUsers: res.data,
			});
		}
	};

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
		});
	}

	handleOpenModalEdit(user) {        
		this.setState({
			setModalEditUser: true,
			newEmail: user.email,
			newPassword: user.password,
			fullName: user.fullName,
			address: user.address,
			gender: user.gender,
			role: user.role,
			phoneNumber: user.phoneNumber,
			userId: user.id,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalEditUser: false,
			setModalIsOpen: false,
			newEmail: "",
			newPassword: "",
			confirmPass: "",
			fullName: "",
			address: "",
			gender: "",
			role: "",
			phoneNumber: "",
			errMsgSignUp: "",
		});
	}

	handleOnchangeModalInput = (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		this.setState({
			...copyState,
		});
	};

	validateModalInput = () => {
		let isValid = true;
		let arrInput = [
			"newEmail",
			"newPassword",
			"confirmPass",
			"fullName",
			"address",
			"gender",
			"role",
			"phoneNumber",
		];
		for (let i = 0; i < arrInput.length; i++) {
			if (!this.state[arrInput[i]]) {
				isValid = false;
				this.setState({
					errMsgSignUp: "Missing input parameters !",
				});
				break;
			}
		}
		return isValid;
	};

	handleAddNewUser = async (data) => {
		this.setState({
			errMsgSignUp: "",
		});
		let newUserData = {
			email: this.state.newEmail,
			password: this.state.newPassword,
			fullName: this.state.fullName,
			address: this.state.address,
			gender: this.state.gender,
			role: this.state.role,
			phoneNumber: this.state.phoneNumber,
		};
		let isValid = this.validateModalInput();
		if (newUserData.password !== this.state.confirmPass) {
			this.setState({
				errMsgSignUp: "Passwords are not the same !",
			});
		} else if (isValid === true) {
			try {
				let response = await handleCreateUser(newUserData);
				await this.getAllUsersReact();
				console.log("check response", response);
				this.setState({
					newEmail: "",
					newPassword: "",
					confirmPass: "",
					fullName: "",
					address: "",
					gender: "",
					role: "",
					phoneNumber: "",
					setModalIsOpen: false,
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

	handleDeleteUser = async (user) => {
		try {
			let token = localStorage.getItem("token");
			let res = await deleteUser(token, user.id);
			if (res && res.code === 200) {
				await this.getAllUsersReact();
			}
		} catch (error) {
			console.log(error);
		}
	};

	handleEditUser = async () => {
		try {
			let userData = {
				fullName: this.state.fullName,
				address: this.state.address,
				gender: this.state.gender,
				role: this.state.role,
				phoneNumber: this.state.phoneNumber,
				id: this.state.userId,
			};

			let token = localStorage.getItem("token");
			let res = await editUser(token, userData);
			if (res && res.code === 200) {
				this.setState({
					setModalEditUser: false,
				});
				await this.getAllUsersReact();
			}
		} catch (error) {
			console.log(error);
		}
	};

	render() {
        let {  setModalIsOpen, setModalEditUser } = this.state;
		return (
			<>
				{setModalIsOpen ? (
					<div id="add-new-modal" className="modal">
						<div className="modal-content">
							<p>Add new user</p>
							<input
								className="email"
								type="email"
								placeholder="Email"
								value={this.state.newEmail}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"newEmail"
									)
								}
							/>
							<div className="pass-field">
								<input
									className="password"
									type="password"
									autoComplete="off"
									placeholder="Password"
									value={this.state.newPassword}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"newPassword"
										)
									}
								/>
								<input
									className="confirm-password"
									type="password"
									autoComplete="off"
									placeholder="Confirm Password"
									value={this.state.confirmPass}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"confirmPass"
										)
									}
								/>
							</div>
							<input
								className="fullname"
								name="fullName"
								type="text"
								placeholder="Fullname"
								value={this.state.fullName}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"fullName"
									)
								}
							/>
							<input
								className="address"
								name="address"
								type="text"
								placeholder="Address"
								value={this.state.address}
								onChange={(event) =>
									this.handleOnchangeModalInput(
										event,
										"address"
									)
								}
							/>

							<div className="modal-select">
								<input
									className="phoneNumber"
									type="tel"
									placeholder="Phone"
									value={this.state.phoneNumber}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"phoneNumber"
										)
									}
								/>
								<select
									name="gender"
									id="gender-select"
									value={this.state.gender}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"gender"
										)
									}
								>
									<option value="" disabled>
										Gender
									</option>
									<option value="Male">Male</option>
									<option value="Female">Female</option>
									<option value="Other">Other</option>
								</select>

								<select
									name="role"
									id="role-select"
									value={this.state.role}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"role"
										)
									}
								>
									<option value="" disabled>
										Role
									</option>
									<option value="Admin">Admin</option>
									<option value="Doctor">Doctor</option>
									<option value="User">User</option>
								</select>
							</div>
							<div
								className="errMsgSignUp"
								style={{ color: "red" }}
							>
								{this.state.errMsgSignUp}
							</div>

							<div className="modal-btn">
								<button
									className="btn-add-new"
									type="button"
									onClick={() => this.handleAddNewUser()}
								>
									Add
								</button>
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserModal);
