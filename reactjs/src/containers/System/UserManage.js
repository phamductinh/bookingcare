import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserManage.css";
import { getAllUsers } from "../../services/userService";

class UserManage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrUsers: [],
		};
	}

	async componentDidMount() {
		let token = localStorage.getItem("token");
		let res = await getAllUsers(token);
		if (res && res.code === 200) {
			this.setState({
				arrUsers: res.data,
			});
		}
	}

	render() {
		let arrUsers = this.state.arrUsers;
		return (
			<div className="user-container">
				<div className="title text-center">Manage users</div>
				<div className="users-table mt-3 mx-1">
					<table id="customers">
						<tr>
							<th>Email</th>
							<th>Fullname</th>
							<th>Address</th>
							<th>Actions</th>
						</tr>

						{arrUsers &&
							arrUsers.map((item, index) => {
								return (
									<tr>
										<td>{item.email}</td>
										<td>{item.fullName}</td>
										<td>{item.address}</td>
										<td>
											<button className="btn-edit">
												<i className="fas fa-pencil-alt"></i>
											</button>
											<button className="btn-delete">
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
					</table>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
