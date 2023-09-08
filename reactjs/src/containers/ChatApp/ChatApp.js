import React, { Component } from "react";
import { connect } from "react-redux";
import { auth, FBProvider, db } from "../../firebase/config";
import { signInWithPopup, onAuthStateChanged } from "firebase/auth";
import {
	doc,
	setDoc,
	getFirestore,
	getDoc,
	onSnapshot,
	collection,
	addDoc,
	orderBy,
	query,
	serverTimestamp,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import "./ChatApp.css";

class ChatApp extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isShowChat: false,
			user: "",
            messages: [],
            newMessage: ""
		};
	}

	componentDidMount() {
		const uns = onAuthStateChanged(auth, (user) => {
			this.setState({
				user: user,
			});
		});

		const q = query(collection(db, "messages", orderBy("timestamp")));
		const unsubscribe = onSnapshot(q, (snapshot) => {
			this.setState(
				snapshot.docs.map((doc) => ({
					id: doc.id,
					data: doc.data(),
				}))
			);
		});

		return unsubscribe;
	}

	async handleLoginWithFB() {
		const data = await signInWithPopup(auth, FBProvider);
		console.log("data", data);
	}

	handleOpenChatBox = async () => {
		await this.setState((prevState) => ({
			isShowChat: !prevState.isShowChat,
		}));
	};

	sendMessage = async () => {
		await addDoc(collection(db, "messages"), {
			uid: this.state.user.uid,
			photoURL: this.state.photoURL,
			displayName: this.state.displayName,
			text: this.state.newMessage,
			timestamp: serverTimestamp(),
		});
	};

	render() {
		let { isShowChat, user } = this.state;
		console.log(user);
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
							{user ? (
								<div>
									<div class="comments"></div>

									<div class="text-box">
										<div class="box-container">
											<textarea placeholder="Chat"></textarea>
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
								</div>
							) : (
								<div>
									<p class="chat-text">
										Xin chào. Chúng tôi có thể giúp gì cho
										bạn?
									</p>
									<button
										class="btn-start-chat"
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
