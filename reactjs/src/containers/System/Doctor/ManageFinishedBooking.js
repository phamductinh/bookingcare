import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageFinishedBooking.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import { getAllFinishedBooking } from "../../../services/bookingService";

class ManageFinishedBooking extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrFinishedBooking: [],
			isLoading: false,
		};
	}

	async componentDidMount() {
		let res = await getAllFinishedBooking();
		if (res && res.code === 200) {
			this.setState({
				arrFinishedBooking: res.data,
			});
		}
	}

	render() {
		let { isLoading, arrFinishedBooking } = this.state;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">
						Manage finished booking
					</div>

					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tbody>
								<tr>
									<th width="8%" className="text-center">
										Time
									</th>
									<th width="15%" className="text-center">
										Fullname
									</th>
									<th width="15%" className="text-center">
										Address
									</th>
									<th width="7%" className="text-center">
										Gender
									</th>
									<th width="10%" className="text-center">
										Birthday
									</th>
									<th width="10%" className="text-center">
										Phonenumber
									</th>
									<th width="15%" className="text-center">
										Reason
									</th>
									<th width="10%" className="text-center">
										Status
									</th>
								</tr>

								{arrFinishedBooking &&
									arrFinishedBooking.map((item, index) => {
										return (
											<tr key={index}>
												<td>{item.booking_time}</td>
												<td>{item.fullName}</td>
												<td>{item.address}</td>
												<td>{item.gender}</td>
												<td>{item.birthday}</td>
												<td>{item.phoneNumber}</td>
												<td>{item.reason}</td>
												<td>{item.status}</td>
											</tr>
										);
									})}
							</tbody>
						</table>
					</div>

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
)(ManageFinishedBooking);
