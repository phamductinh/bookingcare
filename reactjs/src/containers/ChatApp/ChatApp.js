import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, FBProvider, db } from "../../firebase/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
	getDocs,
	collection,
	addDoc,
	orderBy,
	query,
	onSnapshot,
	serverTimestamp,
} from "firebase/firestore";
import "./ChatApp.css";

class ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowChat: false,
			user: "",
			messages: [],
			newMessage: "",
		};
	}

	async componentDidMount() {
		const uns = onAuthStateChanged(auth, (user) => {
			this.setState({
				user: user,
			});
		});

		const q = query(collection(db, "messages"), orderBy("timestamp"));
		const unsubscribe = onSnapshot(q, (querySnapshot) => {
			const messages = [];
			querySnapshot.forEach((doc) => {
				messages.push(doc.data());
			});

			this.setState({
				messages: messages,
			});
		});

		this.setState({
			unsubscribe: unsubscribe,
		});

		return unsubscribe;
	}

	async handleLoginWithFB() {
		const data = await signInWithPopup(auth, FBProvider);
	}

	async handleSignOut() {
		auth.signOut();
	}

	handleOpenChatBox = async () => {
		await this.setState((prevState) => ({
			isShowChat: !prevState.isShowChat,
		}));
	};

	sendMessage = async () => {
		await addDoc(collection(db, "messages"), {
			uid: this.state.user.uid,
			photoURL: this.state.user.photoURL,
			displayName: this.state.user.displayName,
			text: this.state.newMessage,
			timestamp: serverTimestamp(),
		});
		await this.setState({
			newMessage: "",
		});
	};

	handleOnchangeMessage = (event) => {
		this.setState({
			newMessage: event.target.value,
		});
	};

	componentWillUnmount() {
		if (this.state.unsubscribe) {
			this.state.unsubscribe();
		}
	}

	render() {
		let { isShowChat, user, messages } = this.state;
		let currentUser = auth.currentUser;
		return (
			<>
				<div>
					<button
						className="btn-messenger"
						onClick={() => this.handleOpenChatBox()}
					>
						<i className="fa-brands fa-facebook-messenger"></i>
					</button>
					{isShowChat && (
						<div className="messenger-box">
							<div className="messenger-header">
								<span className="messenger-title">
									Chat with Admin
								</span>
								{user ? (
									<button
										className="btn-messenger-logout"
										onClick={() => this.handleSignOut()}
									>
										End
									</button>
								) : (
									""
								)}
							</div>
							{user ? (
								<div>
									<div className="comments">
										{messages.map((msg, index) => (
											<div
												key={index}
												className={`message-content ${
													msg.uid === currentUser.uid
														? "sent"
														: "received"
												}`}
											>
												<p className="message-name">
													{msg.displayName}
												</p>
												<div
													className={`message-under ${
														msg.uid ===
														currentUser.uid
															? "message-send"
															: ""
													}`}
												>
													<div
														className="message-avt"
														style={{
															backgroundImage: `url(${msg.photoURL})`,
														}}
													></div>
													<h3 className="message-message">
														{msg.text}
													</h3>
												</div>
											</div>
										))}
									</div>

									<div className="text-box">
										<div className="box-container">
											<textarea
												placeholder="Chat"
												value={this.state.newMessage}
												onChange={(event) =>
													this.handleOnchangeMessage(
														event
													)
												}
											></textarea>
											<div className="formatting">
												<button
													type="button"
													className="send"
													title="Send"
													onClick={() =>
														this.sendMessage()
													}
												>
													<svg
														fill="none"
														viewBox="0 0 24 24"
														height="18"
														width="18"
														xmlns="http://www.w3.org/2000/svg"
													>
														<path
															strokeLinejoin="round"
															strokeLinecap="round"
															strokeWidth="2.5"
															stroke="#ffffff"
															d="M12 5L12 20"
														></path>
														<path
															strokeLinejoin="round"
															strokeLinecap="round"
															strokeWidth="2.5"
															stroke="#ffffff"
															d="M7 9L11.2929 4.70711C11.6262 4.37377 11.7929 4.20711 12 4.20711C12.2071 4.20711 12.3738 4.37377 12.7071 4.70711L17 9"
														></path>
													</svg>
												</button>
											</div>
										</div>
									</div>
								</div>
							) : (
								<div>
									<p className="chat-text">
										Xin chào. Chúng tôi có thể giúp gì cho
										bạn?
									</p>
									<button
										className="btn-start-chat"
										onClick={() => this.handleLoginWithFB()}
									>
										Bắt đầu chat
									</button>
								</div>
							)}
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
