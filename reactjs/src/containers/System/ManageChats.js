import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageChats.css";
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
	where,
} from "firebase/firestore";
import Header from "../Header/Header";
import { formatRelative } from "date-fns";

class ManageChats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			messages: [],
			roomId: null,
			newMessage: "",
			isActive: null,
		};
	}

	scrollToBottom = () => {
		const chatContainer = document.getElementById("chat-container");
		chatContainer.scrollTop = chatContainer.scrollHeight;
	};

	async componentDidMount() {
		const uns = onAuthStateChanged(auth, async (user) => {
			await this.setState({
				user: user,
			});
		});

		const messagesQuerySnapshot = await getDocs(collection(db, "messages"));

		const uidsSet = new Set();

		messagesQuerySnapshot.forEach((messageDoc) => {
			const uid = messageDoc.data().uid;
			uidsSet.add(uid);
		});

		const uids = Array.from(uidsSet);

		const queryUsersByUid = query(
			collection(db, "users"),
			where("uid", "in", uids)
		);

		const usersArray = [];

		await getDocs(queryUsersByUid)
			.then(async (querySnapshot) => {
				querySnapshot.forEach((userDoc) => {
					const userData = userDoc.data();
					usersArray.push(userData);
				});
				await this.setState({
					users: usersArray,
				});
			})
			.catch((error) => {
				console.error("Lỗi khi lấy danh sách người dùng:", error);
			});

		await this.listenToMessages(db, this.state.roomId);
	}

	async componentWillUnmount() {
		if (this.state.unsubscribe) {
			await this.state.unsubscribe();
		}
	}

	async listenToMessages(db, roomId) {
		if (!roomId) {
			console.log("miss id");
			return;
		}

		const q = query(
			collection(db, "messages"),
			where("roomId", "==", roomId),
			orderBy("timestamp")
		);

		const unsubscribe = await onSnapshot(q, async (querySnapshot) => {
			const messages = [];
			querySnapshot.forEach((documentSnapshot) => {
				const documentData = documentSnapshot.data();
				messages.push(documentData);
			});

			await this.setState({ messages: messages });
			this.scrollToBottom();
		});

		await this.setState({
			unsubscribe: unsubscribe,
		});

		return unsubscribe;
	}

	async handleShowMessages(item, index) {
		await this.setState({
			roomId: item.uid,
			isActive: index,
		});

		if (this.state.unsubscribe) {
			await this.state.unsubscribe();
		}

		await this.listenToMessages(db, this.state.roomId);
	}

	handleOnchangeMessage = async (event) => {
		await this.setState({
			newMessage: event.target.value,
		});
	};

	sendMessage = async () => {
		await addDoc(collection(db, "messages"), {
			roomId: this.state.roomId,
			uid: this.state.user.uid,
			photoURL: this.state.user.photoURL,
			displayName: this.state.user.displayName,
			text: this.state.newMessage,
			timestamp: serverTimestamp(),
		});

        this.scrollToBottom();

		await this.setState({
			newMessage: "",
		});
	};

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

	formatDate(sc) {
		let formattedDate = "";
		if (sc) {
			formattedDate = formatRelative(new Date(sc * 1000), new Date(), {
				addSuffix: true,
			});

			formattedDate =
				formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
		}
		return formattedDate;
	}

	render() {
		let { user, users, messages, isActive } = this.state;
		let currentUser = auth.currentUser;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				{!user ? (
					<button onClick={() => this.handleLoginWithFB()}>
						Login
					</button>
				) : (
					<div className="manage-chat-container">
						<div className="sidebar">
							<h2>{currentUser.displayName}</h2>
							<div className="users-list">
								{users.map((item, index) => (
									<div
										className={`user-message ${
											isActive === index
												? "active-user"
												: ""
										}`}
										key={index}
										onClick={() =>
											this.handleShowMessages(item, index)
										}
									>
										<div
											className="user-message-img"
											style={{
												backgroundImage: `url(${item.photoURL})`,
											}}
										></div>
										<div className="user-message-name">
											{item.displayName}
										</div>
									</div>
								))}
							</div>
						</div>
						<div className="chat-container" id="chat-container">
							{messages.map((item, index) => (
								<div
									key={index}
									className={`msg-content ${
										item.uid === currentUser.uid
											? "msg-sent"
											: "msg-received"
									}`}
								>
									<div className="msg-name">
										{item.displayName}
									</div>
									<div
										className={`msg-under ${
											item.uid === currentUser.uid
												? "msg-sent-under"
												: ""
										}`}
									>
										<div
											className="msg-avt"
											style={{
												backgroundImage: `url(${item.photoURL})`,
											}}
										></div>
										<div
											className={`msg-text ${
												item.uid === currentUser.uid
													? "msg-text-received"
													: "msg-text-sent"
											}`}
										>
											{item.text}
										</div>
										<div className="msg-time-sent">
											{this.formatDate(
												item.timestamp?.seconds
											)}
										</div>
									</div>
								</div>
							))}

							<div className="input-container">
								<input
									type="text"
									className="message-input"
									placeholder="Type your message..."
									value={this.state.newMessage}
									onChange={(event) =>
										this.handleOnchangeMessage(event)
									}
								/>
								<button
									className="send-button"
									onClick={() => this.sendMessage()}
								>
									Send
								</button>
							</div>
						</div>
					</div>
				)}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageChats);
