import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageReview.css";
import {
	getPaginationReviews,
	getTotalRowReview,
	deleteReview,
	updateFeedback,
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
			textReview: item.comment,
			patientName: item.patientName,
			reviewId: item.id,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalEditUser: false,
			setModalIsOpen: false,
			patientName: "",
			textReview: "",
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

	handleDeleteReview = async () => {
		try {
			let res = await deleteReview(this.state.id);
			if (res && res.code === 200) {
				toast.success("Xóa đánh giá thành công!");
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
		}
	};

	handleEditReview = async () => {
		try {
			let data = {
				comment: this.state.textReview,
				id: this.state.reviewId,
			};

			let res = await updateFeedback(data);
			if (res && res.code === 200) {
				this.setState({
					setModalIsOpen: false,
				});
				toast.success("Chỉnh sửa thành công!");
			}
		} catch (error) {
			toast.error("Chỉnh sửa thất bại!");
		}
	};

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
					<div className="title text-center">Quản lý đánh giá</div>
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
													{/* <button
														className="btn-edit"
														onClick={() =>
															this.handleOpenModalEdit(
																item
															)
														}
													>
														<i className="fas fa-pencil-alt"></i>
													</button> */}
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
										onClick={() => this.handleEditReview()}
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
								Bạn có chắc chắn muốn xóa không?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Hủy
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteReview()}
								>
									Xóa
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
