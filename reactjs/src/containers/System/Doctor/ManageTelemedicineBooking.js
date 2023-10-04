import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageTelemedicineBooking.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import {
	confirmBooking,
	deleteBooking,
	getBookingByDate,
	getTelemedicineBookingByDate,
} from "../../../services/bookingService";
import { Link } from "react-router-dom";

class ManageTelemedicineBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrBooking: [],
			isLoading: false,
			confirmDelete: false,
		};
	}

	async componentDidMount() {}

	handleDeleteUser = async () => {
		try {
			this.setState({
				isLoading: true,
			});
			let res = await deleteBooking(this.state.bookingId);
			if (res && res.code === 200) {
				toast.success("Delete successfully !");
				await getBookingByDate(this.state.formatedDate);
				this.setState({
					confirmDelete: false,
					isLoading: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wrong !");
		}
	};

	handleConfirmBooking = async (item) => {
		try {
			let res = await confirmBooking(item.id);
			if (res && res.code === 200) {
				toast.success("Confirm successfully !");
				await getBookingByDate(this.state.formatedDate);
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wrong !");
		}
	};

	handleOnchangeInput = async (event) => {
		let date = event.target.value;
		let formatedDate = new Date(date).getTime();
		this.setState({
			formatedDate: formatedDate,
		});
		let res = await getTelemedicineBookingByDate(formatedDate);
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrBooking: res.data,
			});
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
		let { isLoading, confirmDelete, arrBooking } = this.state;
		let currentDate = new Date().toISOString().split("T")[0];

		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">
						Manage telemedicine booking
					</div>
					<div className="mx-3">
						<input
							className="date-choose"
							type="date"
							min={currentDate}
							onChange={(event) =>
								this.handleOnchangeInput(event)
							}
						/>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tr>
								<th width="8%" className="text-center">
									Time
								</th>
								<th width="15%" className="text-center">
									Fullname
								</th>
								<th width="5%" className="text-center">
									Gender
								</th>
								<th width="7%" className="text-center">
									Birthday
								</th>
								<th width="10%" className="text-center">
									Phonenumber
								</th>
								<th width="15%" className="text-center">
									Reason
								</th>
								<th width="5%" className="text-center">
									Exam time
								</th>
								<th width="10%" className="text-center">
									Status
								</th>
								<th width="10%" className="text-center">
									Join
								</th>
								<th width="15%" className="text-center">
									Actions
								</th>
							</tr>

							{arrBooking &&
								arrBooking.map((item, index) => {
									return (
										<tr key={index}>
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
														Join room
													</Link>
												</button>
											</td>
											<td className="text-center">
												<button
													className="btn-confirm"
													onClick={() =>
														this.handleConfirmBooking(
															item
														)
													}
												>
													Confirm
												</button>
												<button
													className="btn-refuse"
													onClick={() =>
														this.handleConfirmDelete(
															item
														)
													}
												>
													Decline
												</button>
											</td>
										</tr>
									);
								})}
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
