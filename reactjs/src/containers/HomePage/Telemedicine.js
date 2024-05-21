import React, { Component } from "react";
import { connect } from "react-redux";
import { getALLTelemedicine } from "../../services/telemedicineService";
import "./Telemedicine.css";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/";

class Telemedicine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrTelems: [],
		};
	}

	async componentDidMount() {
		await this.getALLTelemedicineReact();
	}

	getALLTelemedicineReact = async () => {
		let res = await getALLTelemedicine();
		if (res && res.code === 200) {
			this.setState({
				arrTelems: res.data,
			});
		}
	};

	seeMoreTelems = () => {
		this.props.history.push(`/telemedicines`);
	};

	handleShowTelemedicine = (telem) => {
		this.props.history.push(`/telemedicine/${telem.id}`);
	};

	handleNext() {
		let lists = document.querySelectorAll(".telem-slide-item");
		document.getElementById("telem-slide").appendChild(lists[0]);
	}
	handlePrev() {
		let lists = document.querySelectorAll(".telem-slide-item");
		document.getElementById("telem-slide").prepend(lists[lists.length - 1]);
	}

	render() {
		let { arrTelems } = this.state;
		return (
			<>
				<div className="telemedicine-container">
					<div className="telem-content-up">
						<div className="telem-title">
							Bác sĩ từ xa qua Video
						</div>
						<button
							className="telem-btn"
							onClick={() => this.seeMoreTelems()}
						>
							Xem thêm
						</button>
					</div>
					<div className="telem-slide-container">
						<div id="telem-slide">
							{arrTelems &&
								arrTelems.length > 0 &&
								arrTelems.map((item, index) => {
									let telemImage = new Buffer(
										item.image,
										"base64"
									).toString("binary");
									return (
										<div
											className="telem-slide-item"
											onClick={() =>
												this.handleShowTelemedicine(
													item
												)
											}
											key={index}
										>
											<div className="telem-icon">
												<i className="fas fa-video"></i>
											</div>
											<div
												className="telem-slide-img"
												style={{
													backgroundImage: `url(${telemImage})`,
												}}
											></div>
											<div className="telem-content">
												{item.name}
											</div>
										</div>
									);
								})}
						</div>
					</div>
					<div className="telem-buttons">
						<button
							className="telem-prev"
							id="telem-prev"
							onClick={() => this.handlePrev()}
						>
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button
							className="telem-next"
							id="telem-next"
							onClick={() => this.handleNext()}
						>
							<i className="fas fa-long-arrow-right"></i>
						</button>
					</div>
				</div>
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		isLoggedIn: state.user.isLoggedIn,
		userInfor: state.user.userInfo,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		processLogout: () => dispatch(actions.processLogout()),
	};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Telemedicine)
);
