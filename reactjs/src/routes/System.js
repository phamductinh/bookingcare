import React, { Component } from "react";
import { connect } from "react-redux";
import { Redirect, Route, Switch } from "react-router-dom";
import UserManage from "../containers/System/UserManage";
import ManageTelemedicine from "../containers/System/ManageTelemedicine";
import ManageSpecialty from "../containers/System/ManageSpecialty";
import ManageService from "../containers/System/ManageService";
import ManageDoctor from "../containers/System/ManageDoctor";
import ManageBooking from "../containers/System/Doctor/ManageBooking";
import ManageTelemedicineBooking from "../containers/System/Doctor/ManageTelemedicineBooking";
import ManageConfirmedBooking from "../containers/System/Doctor/ManageConfirmedBooking";
import ManageFinishedBooking from "../containers/System/Doctor/ManageFinishedBooking";
import ManageChats from "../containers/System/ManageChats";
import ManageReview from "../containers/System/ManageReview";

class System extends Component {
	render() {
		const { systemMenuPath } = this.props;
		return (
			<div className="system-container">
				<div className="system-list">
					<Switch>
						<Route
							path="/system/user-manage"
							component={UserManage}
						/>
						<Route
							path="/system/manage-telemedicine"
							component={ManageTelemedicine}
						/>
						<Route
							path="/system/manage-specialty"
							component={ManageSpecialty}
						/>
						<Route
							path="/system/manage-doctor"
							component={ManageDoctor}
						/>
						<Route
							path="/system/manage-booking"
							component={ManageBooking}
						/>
						<Route
							path="/system/manage-confirmed-booking"
							component={ManageConfirmedBooking}
						/>
						<Route
							path="/system/manage-finished-booking"
							component={ManageFinishedBooking}
						/>
						<Route
							path="/system/manage-telemedicine-booking"
							component={ManageTelemedicineBooking}
						/>
						<Route
							path="/system/manage-chats"
							component={ManageChats}
						/>
						<Route
							path="/system/manage-review"
							component={ManageReview}
						/>
						<Route
							path="/system/manage-service"
							component={ManageService}
						/>
						<Route
							component={() => {
								return <Redirect to={systemMenuPath} />;
							}}
						/>
					</Switch>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		systemMenuPath: state.app.systemMenuPath,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(System);
