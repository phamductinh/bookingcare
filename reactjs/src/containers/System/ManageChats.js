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

class ManageChats extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {
		const usersCollectionRef = collection(db, "users");

		// Tạo một truy vấn để lấy tất cả người dùng có uid tương tự với documentId trong collection "messages"
		const messagesCollectionRef = collection(db, "chat");
		const messagesQuerySnapshot = await getDocs(messagesCollectionRef);

		const uids = []; // Danh sách các uid từ collection "messages"
		messagesQuerySnapshot.forEach((messageDoc) => {
			const uid = messageDoc.id;
			uids.push(uid);
		});

		// Lấy danh sách người dùng có uid tương tự với danh sách uid từ collection "messages"
		const queryUsersByUid = query(
			usersCollectionRef,
			where("uid", "in", uids)
		);

		const usersArray = [];

		getDocs(queryUsersByUid)
			.then((querySnapshot) => {
				querySnapshot.forEach((userDoc) => {
					const userData = userDoc.data();
					usersArray.push(userData);
					console.log("Thông tin người dùng:", usersArray);
				});
			})
			.catch((error) => {
				console.error("Lỗi khi lấy danh sách người dùng:", error);
			});
	}

	render() {
		return (
			<>
				<div className="manage-chat-container">
					<div className="sidebar">
						<h2>Users</h2>
						<div className="users-list">
							<div className="user-message">
								<div className="user-message-img"></div>
								<div className="user-message-name">
									Nguyen Van A
								</div>
							</div>
							<li>Group 2</li>
							<li>Group 3</li>
						</div>
					</div>
					<div className="chat-container">
						<ul className="message-list">
							<li className="message received">Hello!</li>
							<li className="message sent">Hi there!</li>
						</ul>
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
