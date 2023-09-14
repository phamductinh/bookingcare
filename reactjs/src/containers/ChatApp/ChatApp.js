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
	doc,
	onSnapshot,
	serverTimestamp,
	setDoc,
	arrayUnion,
	where,
} from "firebase/firestore";
import "./ChatApp.css";
import moment from "moment";

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
		const uns = onAuthStateChanged(auth, async (user) => {
			await this.setState({
				user: user,
			});
		});

		let currentUser = await auth.currentUser;

		if (currentUser) {
			const q = query(
				collection(db, "messages"),
				where("roomId", "==", currentUser.uid),
				orderBy("timestamp")
			);
			const unsubscribe = await onSnapshot(q, async (querySnapshot) => {
				const messages = [];
				querySnapshot.forEach((doc) => {
					messages.push(doc.data());
				});

				await this.setState({
					messages: messages,
				});
			});

			await this.setState({
				unsubscribe: unsubscribe,
			});

			return unsubscribe;
		}
	}

	async handleLoginWithFB() {
		const data = await signInWithPopup(auth, FBProvider)
			.then(async (result) => {
				const user = result.user;
				await this.setState({
					user: result.user,
				});

				const userRef = doc(db, "users", user.uid);
				await setDoc(userRef, {
					displayName: user.displayName,
					email: user.email,
					photoURL: user.photoURL,
					uid: user.uid,
				});
			})
			.catch((error) => {
				console.error("Lỗi khi đăng nhập bằng Google:", error);
			});
	}

	async handleSignOut() {
		await auth.signOut();
	}

	handleOpenChatBox = async () => {
		await this.setState((prevState) => ({
			isShowChat: !prevState.isShowChat,
		}));
	};

	sendMessage = async () => {
		await addDoc(collection(db, "messages"), {
			roomId: this.state.user.uid,
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

	handleOnchangeMessage = async (event) => {
		await this.setState({
			newMessage: event.target.value,
		});
	};

	componentWillUnmount() {
		if (this._isMounted) {
			if (this.state.unsubscribe) {
				this.state.unsubscribe();
			}
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
															? "message-sent"
															: ""
													}`}
												>
													<div
														className="message-avt"
														style={{
															backgroundImage: `url(${msg.photoURL})`,
														}}
													></div>
													<h3
														className={`message-text ${
															msg.uid ===
															currentUser.uid
																? "message-text-received"
																: "message-text-sent"
														}`}
													>
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
