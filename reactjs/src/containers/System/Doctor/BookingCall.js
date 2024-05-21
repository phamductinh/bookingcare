import React, { Component } from "react";
import { connect } from "react-redux";
import { getDoctorById } from "../../../services/doctorService";
import { NumericFormat } from "react-number-format";
import "./BookingCall.css";
import {
	bookingAnAppointmentService,
	checkoutBooking,
	getBookingByDate,
} from "../../../services/bookingService";
import { toast } from "react-toastify";
import * as actions from "../../../store/actions/";
import { v4 as uuidv4 } from "uuid";
import LoadingSpinner from "../../../components/Common/Loading";
import ReCAPTCHA from "react-google-recaptcha";
import Footer from "../../HomePage/Footer";

class BookingCall extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: "",
			captchaIsDone: false,
			bookedTimes: [],
			selectedButton: null,
		};
	}

	async componentDidMount() {
		window.scrollTo(0, 0);
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let id = this.props.match.params.id;
			let res = await getDoctorById(id);
			if (res && res.code === 200) {
				this.setState({
					detailDoctor: res.data,
				});
			}
		}
	}

	handleViewBooking = () => {
		let id = this.props.match.params.id;
		this.props.history.push(`/booking/${id}`);
	};

	goBack = () => {
		this.props.history.push(`/detail-doctor/${this.props.match.params.id}`);
	};

	handleOnchangeInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	handleOnchangeCaptcha = () => {
		this.setState({
			captchaIsDone: true,
		});
	};

	handleOnchangeDate = async (event) => {
		let date = event.target.value;

		let hours = [];
		let startTime = 7;
		let endTime = 16;
		for (let i = startTime; i <= endTime; i++) {
			let time = i + ":00";
			hours.push(time);
		}

		let currentDate = new Date();
		currentDate.setHours(0, 0, 0, 0);
		let dateChoosed = new Date(date);
		dateChoosed.setHours(0, 0, 0, 0);

		let formatDate = new Date(date).getTime();

		this.setState({
			hours: hours,
			date: date,
		});
		let res = await getBookingByDate(formatDate);
		if (res && res.code === 200) {
			const bookingTimes = res.data.map((item) => item.booking_time);
			if (currentDate.getTime() === dateChoosed.getTime()) {
				const currentHour = new Date().getHours();
				for (let i = 0; i < hours.length; i++) {
					const [hour] = hours[i].split(":");
					if (parseInt(hour, 10) <= currentHour + 1) {
						bookingTimes.push(hours[i]);
					}
				}
			}
			this.setState({
				bookedTimes: bookingTimes,
			});
		}
	};

	handleButtonClick = async (e, item) => {
		e.preventDefault();
		if (this.state.selectedButton !== item) {
			await this.setState({ selectedButton: item });
		} else {
			await this.setState({ selectedButton: null });
		}
	};

	handleBooking = async () => {
		if (this.props.isLoggedIn) {
			let formatedDate = new Date(this.state.date).getTime();
			let formattedDate = new Date(formatedDate);

			let day = formattedDate.getDate();
			let month = formattedDate.getMonth() + 1;
			let year = formattedDate.getFullYear();

			let formattedDateString = `${day}/${month}/${year}`;
			let idRoom = uuidv4();
			let bookId = uuidv4();
			this.setState({
				bookId: bookId,
			});

			let data = {
				userId: this.props.userInfor.id,
				doctorId: this.props.match.params.id,
				booking_date: formatedDate,
				booking_time: this.state.selectedButton,
				fullName: this.state.fullName,
				gender: this.state.gender,
				phoneNumber: this.state.phoneNumber,
				birthday: this.state.birthday,
				address: this.state.address,
				reason: this.state.reason,
				status: "Pending",
				receiverEmail: this.props.userInfor.email,
				doctorName: this.state.detailDoctor.name,
				booking_date_formated: formattedDateString,
				isTelemedicine: 1,
				exam_time: this.state.bookingTime,
				idRoom: idRoom,
				bookId: bookId,
			};
			const isEmptyField = Object.values(data).some((value) => !value);
			if (isEmptyField) {
				this.setState({
					errMsgSignUp: "Vui lòng điền đầy đủ thông tin!",
				});
				return false;
			} else if (!this.state.captchaIsDone) {
				this.setState({
					errMsgSignUp: "Vui lòng xác nhận reCAPTCHA!",
				});
				return false;
			} else {
				try {
					this.setState({
						errMsgSignUp: "",
						isLoading: true,
					});
					let response = await bookingAnAppointmentService(data);
					toast.success(
						"Đặt lịch thành công. Chuyển tới trang thanh toán!!"
					);
					this.setState({
						isLoading: false,
					});
					return true;
				} catch (error) {
					console.log(error);
					if (error.response) {
						if (error.response.data) {
							this.setState({
								errMsgSignUp: error.response.data.msg,
								isLoading: false,
							});
						}
					}
					return false;
				}
			}
		} else {
			this.props.history.push("/login");
		}
	};

	handleCheckoutNow = async () => {
		try {
			const resultBook = await this.handleBooking();
			if (!resultBook) return;
			const resultUrlPayment = await checkoutBooking({
				title: "Khám trực tuyến",
				price: this.state.detailDoctor.price,
				quantity: 1,
				bookId: this.state.bookId,
				isTelemedicine: 1,
			});
			console.log("hi");
			window.open(resultUrlPayment.url, "_self");
		} catch (error) {
			console.log(error);
		}
	};

	render() {
		let { detailDoctor, isLoading, hours, bookedTimes, selectedButton } =
			this.state;
		let currentDate = new Date().toISOString().split("T")[0];
		let key = "6Ldzs9IpAAAAAPHFNOMBUWWsIkTQ2HRS9V3_lMP3";
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>

							<h2>Bác sĩ {detailDoctor.name}</h2>
						</div>
						<div className="detail-doctor-header-right">
							<div className="detail-doctor-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>
					<div className="booking-detail-doctor-container">
						<div className="booking-detail-doctor-infor">
							<div
								className="booking-detail-doctor-img"
								style={{
									backgroundImage: `url(${
										detailDoctor && detailDoctor.image
											? new Buffer(
													detailDoctor.image,
													"base64"
											  ).toString("binary")
											: ""
									})`,
								}}
							></div>
							<div className="booking-detail-doctor-infors">
								<h2>Đặt lịch khám</h2>
								<h1>Bác sĩ {detailDoctor.name}</h1>
								<p>{detailDoctor.introduction}</p>
								<div>
									Giá khám:
									<NumericFormat
										className="price-booking-header"
										value={detailDoctor.price}
										displayType={"text"}
										thousandSeparator={true}
										suffix={"VNĐ"}
									/>
								</div>
							</div>
						</div>
						<div className="booking-container">
							<form action="">
								<div>
									<label
										htmlFor=""
										className="examination-time"
									>
										<input
											type="radio"
											name="booking-time"
											id="booking-time"
											value="60p"
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"bookingTime"
												)
											}
										/>
										<span>Thời lượng 60 phút</span>
										<div>
											<NumericFormat
												className="price-booking-header"
												value={detailDoctor.price}
												displayType={"text"}
												thousandSeparator={true}
												suffix={"VNĐ"}
											/>
										</div>
									</label>
									<label
										htmlFor=""
										className="examination-time"
									>
										<input
											type="radio"
											name="booking-time"
											id="booking-time"
											value="120p"
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"bookingTime"
												)
											}
										/>
										<span>Thời lượng 120 phút</span>
										<div>
											<NumericFormat
												className="price-booking-header"
												value={detailDoctor.price * 2}
												displayType={"text"}
												thousandSeparator={true}
												suffix={"VNĐ"}
											/>
										</div>
									</label>
								</div>
								<label htmlFor="">Chọn ngày khám:</label>
								<div className="booking-input">
									<i className="fa-solid fa-calendar"></i>
									<input
										type="date"
										min={currentDate}
										onChange={(event) =>
											this.handleOnchangeDate(
												event,
												"date"
											)
										}
									/>
								</div>
								{hours && (
									<>
										<label htmlFor="">Chọn giờ khám:</label>
										<div className="time-content-btns">
											{hours.map((item, index) => {
												const isDisabled =
													bookedTimes.includes(item);
												return (
													<button
														key={index}
														className={`btn-time ${
															isDisabled
																? "btn-disabled"
																: ""
														} ${
															selectedButton ===
															item
																? "btn-selected"
																: ""
														}`}
														disabled={isDisabled}
														onClick={(e) =>
															this.handleButtonClick(
																e,
																item
															)
														}
													>
														{item}
													</button>
												);
											})}
										</div>
									</>
								)}
								<div className="booking-input">
									<i className="fa-solid fa-user"></i>
									<input
										type="text"
										placeholder="Họ tên bệnh nhân"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"fullName"
											)
										}
									/>
								</div>
								<div className="booking-note">
									Hãy ghi rõ Họ Và Tên, viết hoa những chữ cái
									đầu tiên, ví dụ: Phạm Đức Tịnh
								</div>
								<div className="booking-gender">
									<label htmlFor="">
										<input
											type="radio"
											name="gender"
											value="Nam"
											checked={
												this.state.gender === "Nam"
											}
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"gender"
												)
											}
										/>
										Nam
									</label>
									<label htmlFor="">
										<input
											type="radio"
											name="gender"
											value="Nữ"
											checked={this.state.gender === "Nữ"}
											onChange={(event) =>
												this.handleOnchangeInput(
													event,
													"gender"
												)
											}
										/>
										Nữ
									</label>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-phone"></i>
									<input
										type="tel"
										placeholder="Số điện thoại liên hệ"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"phoneNumber"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-calendar"></i>
									<input
										type="number"
										placeholder="Năm sinh"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"birthday"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-location-dot"></i>
									<input
										type="text"
										placeholder="Địa chỉ"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"address"
											)
										}
									/>
								</div>
								<div className="booking-input">
									<i className="fa-solid fa-comment"></i>
									<textarea
										placeholder="Lý do khám"
										onChange={(event) =>
											this.handleOnchangeInput(
												event,
												"reason"
											)
										}
									></textarea>
								</div>
								<div
									className="errMsgSignUp"
									style={{ color: "red" }}
								>
									{this.state.errMsgSignUp}
								</div>
								<div className="booking-total-price">
									<div>
										<div>Giá khám</div>
										<NumericFormat
											className="total-price"
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</div>
									<div>
										<div>Phí đặt lịch</div>
										<div className="total-price">
											Miễn phí
										</div>
									</div>
									<hr />
									<div>
										<div>Tổng cộng</div>
										<NumericFormat
											className="price-booking-header"
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</div>
								</div>
								<p>
									Quý khách vui lòng điền đầy đủ thông tin để
									tiết kiệm thời gian làm thủ tục khám
								</p>
								<ReCAPTCHA
									sitekey={key}
									onChange={(event) =>
										this.handleOnchangeCaptcha(event)
									}
								/>
								<button
									type="button"
									className="btn-booking"
									onClick={() => this.handleCheckoutNow()}
								>
									Thanh toán ngay
								</button>
							</form>
						</div>

						{/* <div className="introduction">
							<div
								className="bookingcare-role-btn"
								onclick="hiden_introduction()"
							>
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
						</div> */}

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
				{isLoading && <LoadingSpinner />}
			</>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		userInfor: state.user.userInfo,
		isLoggedIn: state.user.isLoggedIn,
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		userLoginSuccess: (userInfo) =>
			dispatch(actions.userLoginSuccess(userInfo)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(BookingCall);
