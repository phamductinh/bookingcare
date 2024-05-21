import React, { Component } from "react";
import { connect } from "react-redux";
import { getDoctorById } from "../../../services/doctorService";
import {
	handleCreateFeedback,
	getFeedbackByDoctorId,
	updateFeedback,
	deleteFeedback,
} from "../../../services/reviewService";
import { NumericFormat } from "react-number-format";
import { Link } from "react-router-dom";
import { withRouter } from "react-router";
import "./DetailDoctor.css";
import { toast } from "react-toastify";
import Footer from "../../HomePage/Footer";

class DetailDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			detailDoctor: "",
			isShowUpdate: false,
			confirmDelete: false,
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
		this.getAllFeedbacks();
	}

	getAllFeedbacks = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		) {
			let doctorId = this.props.match.params.id;
			let res = await getFeedbackByDoctorId(doctorId);
			console.log(res);
			if (res && res.code === 200) {
				this.setState({
					feedbacks: res.data,
				});
			}
		}
	};

	handleOnchangeInput = (event) => {
		this.setState({
			comment: event.target.value,
		});
	};

	handleAddNewFeedback = async () => {
		if (
			this.props.match &&
			this.props.match.params &&
			this.props.match.params.id
		)
			if (this.props.isLoggedIn) {
				let data = {
					doctorId: this.props.match.params.id,
					comment: this.state.comment,
					userId: this.props.userInfor.id,
				};

				const isEmptyField = Object.values(data).some(
					(value) => !value
				);

				if (isEmptyField) {
					console.log("Vui lòng điền đầy đủ thông tin!");
				} else {
					try {
						let res = await handleCreateFeedback(data);
						toast.success("Đánh giá thành công!");
						this.getAllFeedbacks();
						this.setState({
							comment: "",
						});
					} catch (error) {
						console.log(error);
					}
				}
			}
	};

	handleUpdateFeedback = async () => {
		let data = {
			comment: this.state.comment,
			id: this.state.feedbackId,
		};
		try {
			let res = await updateFeedback(data);
			toast.success("Chỉnh sửa thành công!");
			this.setState({
				isShowUpdate: false,
				comment: "",
			});
			this.getAllFeedbacks();
		} catch (error) {
			console.log(error);
		}
	};

	handleShowUpdate = (item) => {
		this.setState((prevState) => ({
			feedbackId: item.id,
			comment: item.comment,
			isShowUpdate: !prevState.isShowUpdate,
		}));
	};

	handleConfirmDelete = (item) => {
		this.setState({
			confirmDelete: true,
			reviewId: item.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	handleDeleteFeedback = async () => {
		try {
			let res = await deleteFeedback(this.state.reviewId);
			if (res && res.code === 200) {
				await this.getAllFeedbacks();
				toast.success("Xóa đánh giá thành công!");
				this.setState({
					confirmDelete: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Something wrong !");
		}
	};

	handleViewBooking = () => {
		let id = this.props.match.params.id;
		this.props.history.push(`/booking/${id}`);
	};

	render() {
		let { detailDoctor, isShowUpdate, feedbacks, confirmDelete } =
			this.state;
		return (
			<>
				<div className="detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<Link to="/home">
								<i className="fas fa-long-arrow-left"></i>
							</Link>

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
					<div className="detail-doctor-container">
						<div className="detail-doctor-infor">
							<div
								className="detail-doctor-img"
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
							<div className="detail-doctor-infors">
								<h1>Bác sĩ {detailDoctor.name}</h1>
								<p>{detailDoctor.introduction}</p>
							</div>
						</div>
						<div className="detail-doctor-schedule">
							<div className="detail-doctor-schedule-left">
								<h3>Bạn đang gặp vấn đề về sức khỏe ?</h3>
								<button
									className="booking-now"
									onClick={() => this.handleViewBooking()}
								>
									<Link to="/booking">
										Đặt lịch ngay
										<i class="fa-solid fa-arrow-right"></i>
									</Link>
								</button>
								<div className="choose-and-book">
									<p>
										Click{" "}
										<i className="fas fa-hand-pointer"></i>
										và đặt lịch (Miễn phí)
									</p>
								</div>
							</div>
							<div className="detail-doctor-schedule-right">
								<div className="exam-address">
									<h3>ĐỊA CHỈ KHÁM</h3>
									<p>{detailDoctor.clinic}</p>
									<p>{detailDoctor.address}</p>
								</div>
								<div className="exam-price">
									<h3>
										<strong>GIÁ KHÁM:</strong>{" "}
										<NumericFormat
											value={detailDoctor.price}
											displayType={"text"}
											thousandSeparator={true}
											suffix={"VNĐ"}
										/>
									</h3>
								</div>
								<div className="insurance">
									<h3>
										<strong>LOẠI BẢO HIỂM ÁP DỤNG.</strong>
									</h3>
								</div>
							</div>
						</div>
						<div
							className="detail-doctor-introduction"
							dangerouslySetInnerHTML={{
								__html: detailDoctor.description,
							}}
						></div>

						<div className="feedback-container">
							<p className="feedback-title">
								Phản hồi của bệnh nhân sau khi đi khám
							</p>

							{feedbacks &&
								feedbacks.map((item, index) => {
									let isMeSelf =
										this.props.userInfor &&
										item.userId === this.props.userInfor.id;

									return (
										<div
											className="feedback-item"
											key={index}
										>
											<div className="feedback-name">
												{item.fullName}
											</div>
											<div className="feedback-content">
												{item.comment}{" "}
												{isMeSelf && (
													<>
														<a
															className="edit-feedback"
															href="#/"
															onClick={() =>
																this.handleShowUpdate(
																	item
																)
															}
														>
															<i className="fas fa-pencil-alt"></i>
														</a>
														<a
															className="delete-feedback"
															href="#/"
															onClick={() =>
																this.handleConfirmDelete(
																	item
																)
															}
														>
															<i className="fas fa-trash"></i>
														</a>
													</>
												)}
											</div>
										</div>
									);
								})}

							<div className="feedback-input-container">
								<textarea
									name=""
									id=""
									className="feedback-input"
									cols="30"
									rows="2"
									placeholder="Đánh giá bác sĩ"
									value={this.state.comment}
									onChange={(event) =>
										this.handleOnchangeInput(event)
									}
								></textarea>
								{isShowUpdate ? (
									<button
										className="btn-feedback"
										onClick={() =>
											this.handleUpdateFeedback()
										}
									>
										Chỉnh sửa
									</button>
								) : (
									<button
										className="btn-feedback"
										onClick={() =>
											this.handleAddNewFeedback()
										}
									>
										Đánh giá
									</button>
								)}
							</div>
						</div>

						<div className="introduction">
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
				{confirmDelete ? (
					<div className="confirm-delete">
						<div className="confirmation-text">
							Bạn có chắc chắn muốn xóa không?
						</div>
						<div className="button-container">
							<button
								className="cancel-button"
								onClick={() => this.handleCloseConfirmDelete()}
							>
								Cancel
							</button>
							<button
								className="confirmation-button"
								onClick={() => this.handleDeleteFeedback()}
							>
								Delete
							</button>
						</div>
					</div>
				) : null}
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
	return {};
};

export default withRouter(
	connect(mapStateToProps, mapDispatchToProps)(DetailDoctor)
);
