import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions/";
import "react-toastify/dist/ReactToastify.css";
import "./Fail.css";
import {
	deleteBookingByBookId,
	sendFailBookingEmail,
} from "../../services/bookingService";

class Fail extends Component {
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
			let res = await sendFailBookingEmail(bookId);
			if (res && res.code === 200) {
				await deleteBookingByBookId(bookId);
			}
		}
	}

	goBack = () => {
		this.props.history.push(`/home`);
	};

	render() {
		return (
			<>
				<div className="fail-container">
					<div class="card-fail">
						<div className="card-checkmark-fail">
							<i class="checkmark">X</i>
						</div>
						<h1>Fail</h1>
						<p>Thanh toán dịch vụ thất bại!</p>
						<button
							className="btn-gohome"
							onClick={() => this.goBack()}
						>
							Go to Home
						</button>
					</div>
				</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(Fail);
