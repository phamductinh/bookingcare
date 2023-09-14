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
	getDoc,
	documentId,
} from "firebase/firestore";

class ManageChats extends Component {
	constructor(props) {
		super(props);
		this.state = {
			users: [],
			messages: [],
			documentId: null,
		};
	}

	async componentDidMount() {
		const messagesQuerySnapshot = await getDocs(collection(db, "messages"));

		const uids = [];
		messagesQuerySnapshot.forEach((messageDoc) => {
			const uid = messageDoc.data().uid;
			uids.push(uid);
		});

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

		await this.listenToMessages(db, this.state.documentId);
	}

	async componentWillUnmount() {
		if (this.state.unsubscribe) {
			await this.state.unsubscribe();
		}
	}

	async listenToMessages(db, documentId) {
		if (!documentId) {
			console.log("miss id");
			return;
		}

		const q = query(
			collection(db, "messages"),
			where("roomId", "==", documentId)
		);

		const unsubscribe = await onSnapshot(q, async (querySnapshot) => {
			const messages = [];
			querySnapshot.forEach((documentSnapshot) => {
				const documentData = documentSnapshot.data();
				if (documentData.messages) {
					messages.push(...documentData.messages);
				}
			});

			await this.setState({ messages });
			console.log(this.state.messages);
		});

		await this.setState({
			unsubscribe: unsubscribe,
		});

		return unsubscribe;
	}

	async handleShowMessages(item) {
		await this.setState({
			documentId: item.uid,
		});

		if (this.state.unsubscribe) {
			await this.state.unsubscribe();
		}

		await this.listenToMessages(db, this.state.documentId);
	}

	render() {
		let { users, messages } = this.state;
		let currentUser = auth.currentUser;
		return (
			<>
				<div className="manage-chat-container">
					<div className="sidebar">
						<h2>Users</h2>
						<div className="users-list">
							{users.map((item, index) => (
								<div
									className="user-message"
									key={index}
									onClick={() =>
										this.handleShowMessages(item)
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
					<div className="chat-container">
						{messages.map((item, index) => (
							<div
								className={`msg-content ${
									item.uid === currentUser.uid
										? "msg-sent"
										: "msg-received"
								}`}
							>
								<div className="msg-name">
									{item.displayName}
								</div>
								<div className="msg-under">
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
								</div>
							</div>
						))}

						<div className="input-container">
							<input
								type="text"
								className="message-input"
								placeholder="Type your message..."
							/>
							<button className="send-button">Send</button>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageChats);
