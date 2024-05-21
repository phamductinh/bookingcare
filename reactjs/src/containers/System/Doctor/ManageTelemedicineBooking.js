import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageTelemedicineBooking.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import {
	finishBooking,
	deleteBooking,
	getBookingByDate,
	getTelemedicineBookingByDate,
	getAllConfirmedTelemedicineBooking,
} from "../../../services/bookingService";
import { Link } from "react-router-dom";
import moment from "moment";

class ManageTelemedicineBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBooking: [],
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {
		this.getAllConfirmedBookingReact();
	}

	getAllConfirmedBookingReact = async () => {
		try {
			let res = await getAllConfirmedTelemedicineBooking();
			if (res && res.code === 200) {
				this.setState({
					arrBooking: res.data,
				});
			}
		} catch (error) {
			console.log(error);
		}
	};

	handleDeleteUser = async () => {
		try {
			this.setState({
				isLoading: true,
			});
			let res = await deleteBooking(this.state.bookingId);
			if (res && res.code === 200) {
				toast.success("Xóa lịch hẹn thành công!");
				await getBookingByDate(this.state.formatedDate);
				this.setState({
					confirmDelete: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			this.setState({
				confirmDelete: false,
				isLoading: false,
			});
			toast.error("Xóa thất bại!");
		}
	};

	handleFinishBooking = async () => {
		try {
			let res = await finishBooking(this.state.bookingId);
			if (res && res.code === 200) {
				toast.success("Kết thúc lịch khám thành công!");
				this.setState({
					confirmDelete: false,
				});
				await this.componentDidMount();
			}
		} catch (error) {
			console.log(error);
			toast.error("Kết thúc lịch khám thất bại!");
		}
	};

	// handleOnchangeInput = async (event) => {
	// 	let date = event.target.value;
	// 	let formatedDate = new Date(date).getTime();
	// 	this.setState({
	// 		formatedDate: formatedDate,
	// 	});
	// 	let res = await getTelemedicineBookingByDate(formatedDate);
	// 	console.log(res);
	// 	if (res && res.code === 200) {
	// 		this.setState({
	// 			arrBooking: res.data,
	// 		});
	// 	}
	// };

	handleConfirmDelete = (item) => {
		this.setState({
			confirmDelete: true,
			bookingId: item.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	render() {
		let { isLoading, confirmDelete, arrBooking } = this.state;
		let currentDate = new Date().toISOString().split("T")[0];

		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">
						Quản lý lịch khám từ xa đã xác nhận
					</div>

					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tbody>
								<tr>
									<th width="8%" className="text-center">
										Ngày
									</th>
									<th width="8%" className="text-center">
										Thời gian
									</th>
									<th width="15%" className="text-center">
										Họ và tên
									</th>
									<th width="5%" className="text-center">
										Giới tính
									</th>
									<th width="7%" className="text-center">
										Ngày sinh
									</th>
									<th width="10%" className="text-center">
										Số điện thoại
									</th>
									<th width="15%" className="text-center">
										Lý do
									</th>
									<th width="5%" className="text-center">
										Thời lượng
									</th>
									<th width="10%" className="text-center">
										Trạng thái
									</th>
									<th width="10%" className="text-center">
										Tham gia
									</th>
									<th width="15%" className="text-center">
										Acts
									</th>
								</tr>

								{arrBooking &&
									arrBooking.map((item, index) => {
										const date = moment(
											item.booking_date / 1
										).format("YYYY-MM-DD");
										return (
											<tr key={index}>
												<td>{date}</td>
												<td>{item.booking_time}</td>
												<td>{item.fullName}</td>
												<td>{item.gender}</td>
												<td>{item.birthday}</td>
												<td>{item.phoneNumber}</td>
												<td>{item.reason}</td>
												<td>{item.exam_time}</td>
												<td>{item.status}</td>
												<td>
													<button className="btn-join-calling-room">
														<Link
															to={`/room/${item.idRoom}`}
														>
															Vào phòng khám
														</Link>
													</button>
												</td>
												<td className="text-center">
													<button
														className="btn-refuse"
														onClick={() =>
															this.handleFinishBooking(
																item
															)
														}
													>
														Finish
													</button>
												</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								You want to decline this appointment?
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
									onClick={() => this.handleDeleteUser()}
								>
									Decline
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

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(ManageTelemedicineBooking);
