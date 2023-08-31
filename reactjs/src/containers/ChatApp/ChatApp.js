import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, FBProvider } from "../../firebase/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import { Link } from "react-router-dom";
import "./ChatApp.css";

class ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowChat: false,
		};
	}

	componentDidMount() {
		const uns = onAuthStateChanged(auth, (user) => {
			console.log({ user });
		});
	}

	async handleLoginWithFB() {
		await signInWithPopup(auth, FBProvider);
	}

	handleOpenChatBox = async () => {
		await this.setState((prevState) => ({
			isShowChat: !prevState.isShowChat,
		}));
	};

	render() {
		let { isShowChat } = this.state;
		return (
			<>
				<div>
					<button
						class="btn-messenger"
						onClick={() => this.handleOpenChatBox()}
					>
						<i class="fa-brands fa-facebook-messenger"></i>
					</button>
					{isShowChat && (
						<div class="messenger-box">
							<span class="messenger-title">Chat with Admin</span>
							{/* <div>
								<div class="comments"></div>

								<div class="text-box">
									<div class="box-container">
										<textarea placeholder="Reply"></textarea>
										<div class="formatting">
											<button
												type="submit"
												class="send"
												title="Send"
											>
												<svg
													fill="none"
													viewBox="0 0 24 24"
													height="18"
													width="18"
													xmlns="http://www.w3.org/2000/svg"
												>
													<path
														stroke-linejoin="round"
														stroke-linecap="round"
														stroke-width="2.5"
														stroke="#ffffff"
														d="M12 5L12 20"
													></path>
													<path
														stroke-linejoin="round"
														stroke-linecap="round"
														stroke-width="2.5"
														stroke="#ffffff"
														d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
													></path>
												</svg>
											</button>
										</div>
									</div>
								</div>
							</div> */}
							<div>
								<p class="chat-text">
									Xin chào. Chúng tôi có thể giúp gì cho bạn?
								</p>
								<button
									class="btn-start-chat"
									onClick={() => this.handleLoginWithFB()}
								>
									Bắt đầu chat
								</button>
							</div>
						</div>
					)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ChatApp);
