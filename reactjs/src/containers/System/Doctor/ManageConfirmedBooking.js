import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageConfirmedBooking.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import {
	getAllConfirmedBooking,
	finishBooking,
} from "../../../services/bookingService";
import moment from "moment";

class ManageConfirmedBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBooking: [],
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {
		let res = await getAllConfirmedBooking();
		if (res && res.code === 200) {
			this.setState({
				arrConfirmedBooking: res.data,
			});
		}
	}

	handleConfirmBooking = async () => {
		try {
			let res = await finishBooking( this.state.bookingId);
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
		let { isLoading, confirmDelete, arrConfirmedBooking } = this.state;
		console.log(arrConfirmedBooking);
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">
						Quản lý lịch hẹn đã xác nhận
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
									<th width="15%" className="text-center">
										Địa chỉ
									</th>
									<th width="7%" className="text-center">
										Giới tính
									</th>
									<th width="10%" className="text-center">
										Ngày sinh
									</th>
									<th width="10%" className="text-center">
										Số điện thoại
									</th>
									<th width="15%" className="text-center">
										Lý do
									</th>
									<th width="10%" className="text-center">
										Tình trạng
									</th>
									<th width="10%" className="text-center">
										Acts
									</th>
								</tr>

								{arrConfirmedBooking &&
									arrConfirmedBooking.map((item, index) => {
										const date = moment(
											item.booking_date / 1
										).format("YYYY-MM-DD");
										return (
											<tr key={index}>
												<td>{date}</td>
												<td>{item.booking_time}</td>
												<td>{item.fullName}</td>
												<td>{item.address}</td>
												<td>{item.gender}</td>
												<td>{item.birthday}</td>
												<td>{item.phoneNumber}</td>
												<td>{item.reason}</td>
												<td>{item.status}</td>
												<td className="text-center">
													{/* <button
													className="btn-confirm"
													onClick={() =>
														this.handleConfirmBooking(
															item
														)
													}
												>
													Confirm
												</button> */}
													<button
														className="btn-refuse"
														onClick={() =>
															this.handleConfirmDelete(
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
								Finish this appointment?
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
									onClick={() => this.handleConfirmBooking()}
								>
									Yes
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
)(ManageConfirmedBooking);
