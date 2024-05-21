import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions/";
import "react-toastify/dist/ReactToastify.css";
import "./Success.css";
import {
	confirmBookingByBookId,
	sendSuccessBookingEmail,
} from "../../services/bookingService";
import { toast } from "react-toastify";

class Success extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.bookId
		) {
			let bookId = this.props.match.params.bookId;
			let res = await confirmBookingByBookId(bookId);
			console.log(res);
		}
		this.handleSendEmailSuccess();
	}

	handleSendEmailSuccess = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.bookId
		) {
			try {
				let res = await sendSuccessBookingEmail(
					this.props.match.params.bookId
				);
				toast.success("Gửi email xác nhận thành công!");
			} catch (error) {
				console.log(error);
			}
		}
	};

	render() {
		return (
			<>
				<div className="alb">Thanh toán thành công!</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		lang: state.app.language,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		navigate: (path) => dispatch(push(path)),
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(Success);
