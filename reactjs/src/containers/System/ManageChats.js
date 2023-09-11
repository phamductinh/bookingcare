import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageChats.css";
import {
	getAllDoctors,
	handleCreateDoctor,
	deleteDoctor,
	updateDoctor,
	getDoctorById,
} from "../../services/doctorService";
import { getALLSpecialty } from "../../services/specialtyService";
import { getAllClinics } from "../../services/clinicService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import LoadingSpinner from "../../components/Common/Loading";
import { CommonUtils } from "../../utils";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
const mdParser = new MarkdownIt();

class ManageChats extends Component {
	constructor(props) {
		super(props);
		this.state = {};
	}

	async componentDidMount() {}

	render() {
		return (
			<>
				<div className="chat-container">
					<div className="sidebar">
						<h2>Groups</h2>
						<ul>
							<li>Group 1</li>
							<li>Group 2</li>
							<li>Group 3</li>
						</ul>
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
