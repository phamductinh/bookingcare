import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageReview.css";
import {
	getPaginationReviews,
	getTotalRowReview,
	deleteReview,
} from "../../services/reviewService";
import { getAllDoctors } from "../../services/doctorService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import LoadingSpinner from "../../components/Common/Loading";
import Pagination from "../../components/Common/Pagination";

class ManageReview extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
			arrReviews: [],
			setModalIsOpen: false,
			setModalEditUser: false,
			isLoading: false,
			confirmDelete: false,
			newPage: 1,
		};
	}

	async componentDidMount() {
		await this.getAllDoctorsReact();
		await this.getTotalRowReviewReact();
	}

	getAllDoctorsReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getAllDoctors();
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrDoctors: res.data,
				isLoading: false,
			});
		}
	};

	// getAllReviewsReact = async () => {
	// 	this.setState({
	// 		isLoading: true,
	// 	});
	// 	let res = await getPaginationReviews(this.state.newPage);
	// 	console.log(res);
	// 	if (res && res.code === 200) {
	// 		this.setState({
	// 			arrReviews: res.data,
	// 			isLoading: false,
	// 		});
	// 	}
	// };

	getTotalRowReviewReact = async () => {
		let res = await getTotalRowReview();
		if (res && res.code === 200) {
			let row = Math.ceil(res.data.totalRow / 5);
			this.setState({
				totalRow: row,
			});
		}
	};

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
		});
	}

	handleOpenModalEdit(item) {
		this.setState({
			setModalIsOpen: true,
			textReview: item.text,
			patientName: item.patientName,
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

	handleOnchangeModalInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	handleOnchangeDoctor = async (event) => {
		let doctorId = event.target.value;
		await this.setState({
			doctorId: this.state.doctorId,
			isLoading: true,
		});
		let res = await getPaginationReviews(doctorId, this.state.newPage);
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrReviews: res.data,
				isLoading: false,
			});
		} else {
			this.setState({
				isLoading: false,
			});
		}
	};

	// handleAddNewUser = async (data) => {
	// 	let newUserData = {
	// 		email: this.state.newEmail,
	// 		password: this.state.newPassword,
	// 		fullName: this.state.fullName,
	// 		address: this.state.address,
	// 		gender: this.state.gender,
	// 		role: this.state.role,
	// 		phoneNumber: this.state.phoneNumber,
	// 	};
	// 	let isValid = this.validateModalInput();
	// 	if (newUserData.password !== this.state.confirmPass) {
	// 		this.setState({
	// 			errMsgSignUp: "Passwords are not the same !",
	// 		});
	// 	} else if (isValid === true) {
	// 		try {
	// 			this.setState({
	// 				errMsgSignUp: "",
	// 				isLoading: true,
	// 			});
	// 			let response = await handleCreateUser(newUserData);
	// 			await this.getAllUsersReact();
	// 			console.log("check response", response);
	// 			toast.success("Add user successfully !");
	// 			this.setState({
	// 				newEmail: "",
	// 				newPassword: "",
	// 				confirmPass: "",
	// 				fullName: "",
	// 				address: "",
	// 				gender: "",
	// 				role: "",
	// 				phoneNumber: "",
	// 				setModalIsOpen: false,
	// 				isLoading: false,
	// 			});
	// 		} catch (error) {
	// 			if (error.response) {
	// 				if (error.response.data) {
	// 					this.setState({
	// 						errMsgSignUp: error.response.data.msg,
	// 					});
	// 				}
	// 			}
	// 		}
	// 	}
	// };

	handleDeleteReview = async () => {
		try {
			let token = await localStorage.getItem("token");
			let res = await deleteReview(token, this.state.id);
			if (res && res.code === 200) {
				toast.success("Delete successfully !");
				await getPaginationReviews(
					this.state.doctorId,
					this.state.newPage
				);
				this.setState({
					confirmDelete: false,
				});
			}
		} catch (error) {
			this.setState({
				confirmDelete: false,
			});
			toast.error("Something wrong !");
		}
	};

	// handleEditUser = async () => {
	// 	try {
	// 		let userData = {
	// 			fullName: this.state.fullName,
	// 			address: this.state.address,
	// 			gender: this.state.gender,
	// 			role: this.state.role,
	// 			phoneNumber: this.state.phoneNumber,
	// 			id: this.state.userId,
	// 		};

	// 		let token = await localStorage.getItem("token");
	// 		let res = await editUser(token, userData);
	// 		if (res && res.code === 200) {
	// 			this.setState({
	// 				setModalEditUser: false,
	// 			});
	// 			await this.getAllUsersReact();
	// 			toast.success("Update successfully !");
	// 		}
	// 	} catch (error) {
	// 		toast.error("Something wrong !");
	// 	}
	// };

	handleConfirmDelete = (item) => {
		this.setState({
			confirmDelete: true,
			id: item.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	handlePageChange = async (newPage) => {
		await this.setState({
			newPage: newPage,
		});
		// await this.getAllUsersReact();
	};

	render() {
		let {
			arrDoctors,
			arrReviews,
			setModalIsOpen,
			setModalEditUser,
			isLoading,
			confirmDelete,
		} = this.state;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Manage Review</div>
					<div className="mx-3">
						<select
							name="doctor"
							id="doctor-select"
							className="doctor-select-review"
							value={this.state.doctorId}
							onChange={(event) =>
								this.handleOnchangeDoctor(event)
							}
						>
							<option value="0" defaultChecked>
								Danh sách bác sĩ
							</option>
							{arrDoctors &&
								arrDoctors.length > 0 &&
								arrDoctors.map((item, index) => (
									<option key={index} value={item.id}>
										{item.name}
									</option>
								))}
						</select>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers" border="1">
							<tbody>
								<tr>
									<th width="5%" className="text-center">
										id
									</th>
									<th width="20%" className="text-center">
										Tên bệnh nhân
									</th>
									<th width="20%" className="text-center">
										Đánh giá
									</th>
									<th width="12%" className="text-center">
										Actions
									</th>
								</tr>

								{arrReviews &&
									arrReviews.map((item, index) => {
										return (
											<tr key={index}>
												<td className="text-center">
													{item.id}
												</td>
												<td>{item.patientName}</td>
												<td>{item.comment}</td>
												<td className="text-center">
													<button
														className="btn-edit"
														onClick={() =>
															this.handleOpenModalEdit(
																item
															)
														}
													>
														<i className="fas fa-pencil-alt"></i>
													</button>
													<button
														className="btn-delete"
														onClick={() =>
															this.handleConfirmDelete(
																item
															)
														}
													>
														<i className="fas fa-trash"></i>
													</button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>
					<div className="pagination-container">
						<Pagination
							totalPages={this.state.totalRow}
							onPageChange={this.handlePageChange}
						/>
					</div>

					{setModalIsOpen ? (
						<div id="add-new-modal" className="modal">
							<div className="modal-content">
								<p>Chỉnh sửa đánh giá</p>
								<input
									className="patientName"
									name="patientName"
									type="patientName"
									placeholder="Name"
									value={this.state.patientName}
									disabled
								/>
								<textarea
									name="textReview"
									id="textReview"
									placeholder="Viết đánh giá"
									cols="30"
									rows="5"
									value={this.state.textReview}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"textReview"
										)
									}
								></textarea>

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
										onClick={() =>
											this.handleAddNewDoctor()
										}
									>
										Chỉnh sửa
									</button>
									<button
										className="btn-cancel"
										type="button"
										onClick={() => this.handleCloseModal()}
									>
										Hủy
									</button>
								</div>
							</div>
						</div>
					) : null}

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								Are you sure ?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Cancel
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteReview()}
								>
									Delete
								</button>
							</div>
						</div>
					) : null}

					{isLoading && <LoadingSpinner />}
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageReview);
