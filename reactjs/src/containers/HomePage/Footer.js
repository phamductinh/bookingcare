import React, { Component } from "react";
import { connect } from "react-redux";
import "./Footer.css";
import { withRouter } from "react-router";
import * as actions from "../../store/actions/";

class Footer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrSpecialty: [],
		};
	}

	async componentDidMount() {}

	render() {
		return (
			<>
				<div className="footer1">
					<div className="company-infor">
						<div className="company-logo"></div>
						<div className="company-address">
							<h2>Bệnh viện DANA Hospital</h2>
							{/* <p>
									<i className="fas fa-map-marker-alt"></i>28
									Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
								</p>
								<p>
									<i className="fas fa-check"></i>ĐKKD số:
									0106790291. Sở KHĐT Hà Nội cấp ngày
									16/03/2015
								</p> */}
						</div>
						<div className="registered">
							<div className="registered-1"></div>
							<div className="registered-2"></div>
						</div>
					</div>
					<div className="list-features">
						<ul>
							<li>
								<a href="#/">Liên hệ hợp tác</a>
							</li>
							<li>
								<a href="#/">Câu hỏi thường gặp</a>
							</li>
							<li>
								<a href="#/">Điều khoản sử dụng</a>
							</li>
							<li>
								<a href="#/">Chính sách Bảo mật</a>
							</li>
						</ul>
					</div>
					<div className="more-infor">
						{/* <div className="headquarter">
								<h2>Trụ sở tại Hà Nội</h2>
								<p>
									28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà Nội
								</p>
							</div>
							<div className="office">
								<h2>Văn phòng tại TP Hồ Chí Minh</h2>
								<p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
							</div> */}
						<div className="footer-support">
							<h2>Hỗ trợ khách hàng</h2>
							<p>phamductinh.t18@gmail.com (7h - 18h)</p>
						</div>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Footer));
