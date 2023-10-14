import React, { Component } from "react";
import { connect } from "react-redux";
import { getALLSpecialty } from "../../services/specialtyService";
import "./Facility.css";
import { withRouter } from "react-router";

class Facility extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrSpecialty: [],
		};
	}

	async componentDidMount() {
		await this.getALLSpecialtyReact();
	}

	getALLSpecialtyReact = async () => {
		let res = await getALLSpecialty();
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
			});
		}
	};

	handleNextFacility() {
		let lists = document.querySelectorAll(".faci-slide-item");
		document.getElementById("faci-slide").appendChild(lists[0]);
	}
	handlePrevFacility() {
		let lists = document.querySelectorAll(".faci-slide-item");
		document.getElementById("faci-slide").prepend(lists[lists.length - 1]);
	}

	render() {
		return (
			<>
				<div className="facility-container">
					<div className="faci-content-up">
						<div className="faci-title">Cơ sở y tế nổi bật</div>
						<button className="faci-btn">Xem thêm</button>
					</div>
					<div className="faci-slide-container">
						<div id="faci-slide">
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Bệnh viện Hữu nghị Việt Đức
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Bệnh viện Chợ Rẫy
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Phòng khám Bệnh viện Đại học Y Dược 1
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Bệnh viện K - Cơ sở Phan Chu Trinh
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Bệnh viện Ung bướu Hưng Việt
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Hệ thống y tế MEDLATEC
								</div>
							</div>
							<div className="faci-slide-item">
								<div className="faci-slide-img"></div>
								<div className="faci-content">
									Trung tâm xét nghiệm Diag Laboratories
								</div>
							</div>
						</div>
					</div>
					<div className="faci-buttons">
						<button
							className="faci-prev"
							id="faci-prev"
							onClick={() => this.handlePrevFacility()}
						>
							<i className="fas fa-long-arrow-left"></i>
						</button>
						<button
							className="faci-next"
							id="faci-next"
							onClick={() => this.handleNextFacility()}
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(Facility)
);
