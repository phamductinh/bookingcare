import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageFinishedBooking.css";
import Header from "../../Header/Header";
import LoadingSpinner from "../../../components/Common/Loading";
import { getAllFinishedBooking } from "../../../services/bookingService";
import moment from "moment";

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
						Quản lý lịch khám đã xong
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
										Họ tên
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
								</tr>

								{arrFinishedBooking &&
									arrFinishedBooking.map((item, index) => {
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
