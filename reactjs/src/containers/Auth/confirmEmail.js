import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import "./confirmEmail.css";
import { toast } from "react-toastify";
import { sendEmailPasswordService } from "../../services/userService";
import LoadingSpinner from "../../components/Common/Loading";

class confirmEmail extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	handleOnchangeEmail = (event) => {
		this.setState({
			email: event.target.value,
		});
	};

	handleConfirm = async () => {
		this.setState({
			errMsgSignUp: "",
			isLoading: true,
		});
		try {
			let response = await sendEmailPasswordService(this.state.email);
			toast.success("Gửi email xác nhận thành công!");
			console.log("check response", response);
			this.setState({
				email: "",
				isLoading: false,
			});
		} catch (error) {
			console.log(error);
			this.setState({
				email: "",
				isLoading: false,
			});
		}
	};

	goBack = () => {
		this.props.history.push(`/login`);
	};

	render() {
		let { isLoading } = this.state;
		return (
			<>
				<div className="booking-detail-doctor-container">
					<div className="detail-doctor-header">
						<div className="detail-doctor-header-left">
							<i
								className="fas fa-long-arrow-left"
								onClick={this.goBack}
							></i>
						</div>
						<div className="detail-doctor-header-right">
							<div className="detail-doctor-header-support">
								<i className="far fa-question-circle"></i>
								Hỗ trợ
							</div>
							<i className="fas fa-bars"></i>
						</div>
					</div>
					<div class="form-container-email">
						<div class="logo-container-email">Quên mật khẩu</div>
						<form class="form-email">
							<div class="form-group-email">
								<label for="email">
									Vui lòng nhập email để đặt lại mật khẩu của
									bạn
								</label>
								<input
									type="text"
									id="email"
									name="email"
									placeholder="Nhập email của bạn"
									required=""
									value={this.state.email}
									onChange={(event) =>
										this.handleOnchangeEmail(event)
									}
								/>
							</div>

							<button
								class="form-submit-btn-email"
								type="button"
								onClick={() => this.handleConfirm()}
							>
								Gửi email xác nhận
							</button>
						</form>

						<p class="signup-link">
							Chưa có tài khoản?
							<Link to="/sign-up">Đăng kí</Link>
						</p>
					</div>

					<div className="booking-detail-doctor-container">
						<div className="footer2cf">
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
	return {};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(confirmEmail);
