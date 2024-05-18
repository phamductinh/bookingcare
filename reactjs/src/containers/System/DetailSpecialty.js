import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./DetailSpecialty.css";
import { getDoctorBySpecialtyId } from "../../services/doctorService";
import { getSpecialtyById } from "../../services/specialtyService";
import { NumericFormat } from "react-number-format";

class DetailSpecialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
			detailSpecialty: "",
		};
	}

	async componentDidMount() {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let res = await getDoctorBySpecialtyId(id);
			if (res && res.code === 200) {
				this.setState({
					arrDoctors: res.data,
				});
			}
			this.getAllSpecialty();
		}
	}

	getAllSpecialty = async () => {
		let id = this.props.match.params.id;
		let res = await getSpecialtyById(id);
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				detailSpecialty: res.data,
			});
		}
	};

	handleViewBooking = (item) => {
		if (this.props.isLoggedIn) {
			this.props.history.push(`/booking/${item.id}`);
		} else {
			this.props.history.push("/login");
		}
	};

	goBack = () => {
		this.props.history.push(`/home`);
	};

	render() {
		let { arrDoctors, detailSpecialty } = this.state;
		return (
			<>
				<div className="detail-telemedicine-container">
					<div className="detail-tele-header">
						<div className="detail-tele-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
							<h2>Chuyên khoa phổ biến</h2>
						</div>
						<div className="detail-tele-header-right">
							<div className="detail-tele-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>

					<div className="telemedicine-infor-container">
						<div
							className="telemedicine-infor"
							id="telemedicine-infor"
							dangerouslySetInnerHTML={{
								__html: detailSpecialty.descriptionHTML,
							}}
						></div>
					</div>

					<div className="detail-tele-list-doctors-container">
						{/* <div className="detail-tele-province-filter">
							<select
								className="detail-tele-province"
								id="detail-tele-province"
							>
								<option value="nationwide">Toàn quốc</option>
								<option value="hanoi">Hà Nội</option>
								<option value="hcm">Hồ Chí Minh</option>
							</select>
						</div> */}

						{/* <div className="detail-tele-list-doctors">
							<div className="doctor-content">
								<div className="doctor-content-left">
									<div className="doctor-img"></div>
									<a href="#/">Xem thêm</a>
								</div>
								<div className="doctor-infor-telem">
									<h1>
										Thạc sĩ Tâm lý học Nguyễn Thị Thúy Hằng
										(Tư vấn từ xa)
									</h1>
									<p>
										Trưởng phòng, Chuyên viên Tham vấn học
										đường trường Marie Curie
									</p>
									<p>
										Quản lý, Chuyên viên Tham vấn học đường
										trường THCS Nguyễn Trường Tộ
									</p>
									<p>
										Nhiều năm kinh nghiệm làm việc chuyên
										sâu trong lĩnh vực đánh giá, tham vấn
										tâm lý cho trẻ em, vị thành niên và tham
										vấn gia đình
									</p>
									<p>
										<i className="fas fa-map-marker-alt"></i>
										Hà Nội
									</p>
								</div>
							</div>
							<div className="doctor-schedule">
								<select
									className="date-chooser"
									id="date-chooser"
								>
									<option value="2812">
										Hôm nay - 28/12
									</option>
									<option value="2912">Thứ 5 - 29/12</option>
									<option value="3012">Thứ 6 - 30/12</option>
								</select>
								<h2>
									<i className="fas fa-video"></i>LỊCH TƯ VẤN
									QUA VIDEO
								</h2>
								<div className="available-schedule">
									<a href="#/">
										<i className="fas fa-video"></i>07:00 -
										07:30
									</a>
									<a href="#/">
										<i className="fas fa-video"></i>07:30 -
										08:00
									</a>
									<a href="#/">
										<i className="fas fa-video"></i>08:00 -
										08:30
									</a>
									<a href="#/">
										<i className="fas fa-video"></i>08:30 -
										09:00
									</a>
									<a href="#/">
										<i className="fas fa-video"></i>09:00 -
										09:30
									</a>
									<a href="#/">
										<i className="fas fa-video"></i>09:30 -
										10:00
									</a>
								</div>
								<p>
									Chọn <i className="fas fa-hand-pointer"></i>
									và đặt (Phí đặt lịch 0đ)
								</p>
								<h3>
									<strong>GIÁ TƯ VẤN QUA VIDEO:</strong>{" "}
									1.500.000đ.<a href="#/">Xem chi tiết</a>
								</h3>
							</div>
						</div> */}

						{arrDoctors &&
							arrDoctors.length > 0 &&
							arrDoctors.map((item, index) => {
								return (
									<div
										className="detail-tele-list-doctors"
										key={index}
									>
										<div className="doctor-content">
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
												<a href="#/">Xem thêm</a>
											</div>
											<div className="doctor-infor-telem">
												<h1>
													Thạc sĩ Tâm lý học{" "}
													{item.name}
												</h1>
												<div
													dangerouslySetInnerHTML={{
														__html: item.description,
													}}
												></div>

												<p>
													<i className="fas fa-map-marker-alt"></i>
													{item.address}
												</p>
											</div>
										</div>
										<div className="doctor-schedule">
											<h2>
												Nếu bạn có vấn đề về sức khỏe
											</h2>
											<button
												className="booking-now"
												onClick={() =>
													this.handleViewBooking(item)
												}
											>
												<Link to="/booking">
													Đặt lịch ngay
													<i className="fa-solid fa-arrow-right"></i>
												</Link>
											</button>
											<p>
												Chọn{" "}
												<i className="fas fa-hand-pointer"></i>
												và đặt (Phí đặt lịch 0đ)
											</p>
											<h3>
												<strong>GIÁ KHÁM:</strong>{" "}
												<NumericFormat
													className="price-booking-header"
													value={item.price}
													displayType={"text"}
													thousandSeparator={true}
													suffix={"VNĐ"}
												/>
											</h3>
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

						<div className="footer1">
							<div className="company-infor">
								<div className="company-logo"></div>
								<div className="company-address">
									<h2>
										Công ty Cổ phần Công nghệ DANA Hospital
									</h2>
									<p>
										<i className="fas fa-map-marker-alt"></i>
										28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà
										Nội
									</p>
									<p>
										<i className="fas fa-check"></i>ĐKKD số:
										0106790291. Sở KHĐT Hà Nội cấp ngày
										16/03/2015
									</p>
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
										<a href="#/">
											Gói chuyển đổi số doanh nghiệp
										</a>
									</li>
									<li>
										<a href="#/">Tuyển dụng</a>
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
								<div className="headquarter">
									<h2>Trụ sở tại Hà Nội</h2>
									<p>
										28 Thành Thái, Dịch Vọng, Cầu Giấy, Hà
										Nội
									</p>
								</div>
								<div className="office">
									<h2>Văn phòng tại TP Hồ Chí Minh</h2>
									<p>Số 01, Hồ Bá Kiện, Phường 15, Quận 10</p>
								</div>
								<div className="footer-support">
									<h2>Hỗ trợ khách hàng</h2>
									<p>support@bookingcare.vn (7h - 18h)</p>
								</div>
							</div>
						</div>

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

export default connect(mapStateToProps, mapDispatchToProps)(DetailSpecialty);
