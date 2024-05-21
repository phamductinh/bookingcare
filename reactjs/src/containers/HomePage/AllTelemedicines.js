import React, { Component } from "react";
import { connect } from "react-redux";
import "./AllTelemedicines.css";
import { getALLTelemedicine } from "../../services/telemedicineService";
import Footer from "./Footer";

class AllTelemedicines extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrTelems: [],
		};
	}

	async componentDidMount() {
		this.getALLTelemedicineReact();
	}

	getALLTelemedicineReact = async () => {
		let res = await getALLTelemedicine();
		if (res && res.code === 200) {
			this.setState({
				arrTelems: res.data,
			});
		}
	};

	handleViewBooking = (item) => {
		this.props.history.push(`/telemedicine/${item.id}`);
	};

	goBack = () => {
		this.props.history.push(`/home`);
	};

	render() {
		let { arrTelems } = this.state;
		console.log(arrTelems);
		return (
			<>
				<div className="detail-telemedicine-container">
					<div className="detail-tele-header">
						<div className="detail-tele-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
							<h2>Khám từ xa</h2>
						</div>
						<div className="detail-tele-header-right">
							<div className="detail-tele-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>

					<div className="detail-tele-list-doctors-container">
						{arrTelems &&
							arrTelems.length > 0 &&
							arrTelems.map((item, index) => {
								return (
									<div
										className="detail-tele-list-doctors"
										key={index}
									>
										<div
											className="telems-content"
											onClick={() =>
												this.handleViewBooking(item)
											}
										>
											<div className="doctor-content-left">
												<div
													className="doctor-img"
													style={{
														backgroundImage: `url(${
															item.image !== null
																? Buffer.from(
																		item.image,
																		"base64"
																  ).toString(
																		"binary"
																  )
																: "https://ihfeducation.ihf.info/images/no_avatar.gif"
														})`,
													}}
												></div>
											</div>
											<div className="telems-name">
												<h1>{item.name}</h1>
											</div>
										</div>
									</div>
								);
							})}

						<div className="introduction">
							<div className="bookingcare-role-btn">
								<p>Vai trò của DANA Hospital</p>
							</div>
							<div
								id="hiden-introduction"
								className="hiden-introduction"
							>
								<p>
									Giúp khách hàng chọn đúng chuyên gia Tâm lý
									giỏi và đặt lịch nhanh chóng.
								</p>
								<ul>
									<li>
										Hệ thống chuyên gia tâm lý giỏi, uy tín
									</li>
									<li>
										Thông tin về chuyên gia tâm lý đã được
										xác thực rõ ràng, chính xác
									</li>
									<li>
										Sắp xếp khám đúng chuyên gia tâm lý mà
										khách hàng đã chọn đặt lịch
									</li>
									<li>
										Bảo vệ quyền lợi của khách hàng khi tư
										vấn
									</li>
									<li>Miễn phí đặt lịch</li>
								</ul>
								<p>Hỗ trợ trước, trong và sau khi tư vấn</p>
								<p>
									<span>Trước tư vấn</span>
								</p>
								<ul>
									<li>
										Nhắc lịch, dặn dò chuẩn bị trước tư vấn
									</li>
									<li>
										Hướng dẫn đi lại, quy trình làm thủ tục
										tư vấn
									</li>
								</ul>
								<p>
									<span>Trong khi tư vấn</span>
								</p>
								<ul>
									<li>
										Hỗ trợ giải quyết các vướng mắc trong
										khi tư vấn
									</li>
									<li>
										Hỗ trợ khách hàng những yêu cầu nảy sinh
									</li>
								</ul>
								<p>
									<span>Sau khi tư vấn</span>
								</p>
								<ul>
									<li>
										Ghi nhận ý kiến của khách hàng sau tư
										vấn
									</li>
									<li>
										Bảo vệ quyền lợi của khách hàng sau tư
										vấn
									</li>
								</ul>
							</div>
						</div>

						<div className="more-questions">
							<p>
								Cần tìm hiểu thêm?
								<a href="#/">Xem câu hỏi thường gặp.</a>
							</p>
						</div>

						<Footer />

						<div className="footer2">
							<div className="footer-left">
								<p>&copy; 2022 Pham Duc Tinh</p>
							</div>
							<div className="footer-right">
								<i className="fab fa-facebook-square"></i>
								<i className="fab fa-youtube"></i>
								<i className="fab fa-instagram"></i>
								<i className="fab fa-twitter"></i>
							</div>
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
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(AllTelemedicines);
