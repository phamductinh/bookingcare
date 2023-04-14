import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageTelemedicine.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../utils";

const mdParser = new MarkdownIt();

class ManageTelemedicine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			image: "",
			description: "",
		};
	}

	componentDidMount() {}

	handleOnchangeInput = (event, id) => {
		let stateCopy = { ...this.state };
		stateCopy[id] = event.target.value;
		this.setState({
			...stateCopy,
		});
	};

	handleEditorChange = ({ html, text }) => {
		this.setState({
			descriptionHTML: html,
			descriptionMarkdown: text,
		});
	};

	handleOnchangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			this.setState({
				imageBase64: base64,
			});
		}
	};

	render() {
		const { name, image, description } = this.state;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<form onSubmit={this.handleSubmit}>
					<div>
						<label htmlFor="name">Name:</label>
						<input
							type="text"
							value={name}
							onChange={(event) =>
								this.handleOnchangeInput(event, "name")
							}
						/>
					</div>
					<div>
						<label htmlFor="image">Image:</label>
						<input
							type="file"
							id="image"
							name="image"
							value={image}
							onChange={(event) =>
								this.handleOnchangeImage(event)
							}
						/>
					</div>

					<MdEditor
						style={{ height: "500px" }}
						renderHTML={(text) => mdParser.render(text)}
						onChange={this.handleEditorChange}
						value={this.state.descriptionMarkdown}
					/>

					<button type="submit">Submit</button>
				</form>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTelemedicine);
