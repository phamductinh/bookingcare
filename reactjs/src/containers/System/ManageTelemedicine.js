import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./ManageTelemedicine.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../utils";
import {
	handleCreateTelemedicine,
	getALLTelemedicine,
} from "../../services/homeService";

const mdParser = new MarkdownIt();

class ManageTelemedicine extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			image: "",
			description: "",
			descriptionHTML: "",
			arrTelems: [],
		};
	}

	async componentDidMount() {
		await this.getALLTelemedicineReact();
	}

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
			description: text,
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

	getALLTelemedicineReact = async () => {
		let res = await getALLTelemedicine();
		console.log("check res", res);
		if (res && res.code === 200) {
			this.setState({
				arrTelems: res.data,
			});
		}
	};

	handleCreateNewTelemedicine = async () => {
		let infor = {
			name: this.state.name,
			description: this.state.description,
			descriptionHTML: this.state.descriptionHTML,
			image: this.state.imageBase64,
		};
		console.log(infor);
		try {
			let res = await handleCreateTelemedicine(infor);
			if (res && res.code === 200) {
				await this.getALLTelemedicineReact();
				toast.success("Add new telemedicine successfully !");
				this.setState({
					name: "",
					description: "",
					descriptionHTML: "",
					image: "",
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Add new telemedicine failed !");
		}
	};

	render() {
		const { name, image, description } = this.state;
		let arrTelems = this.state.arrTelems;
		console.log(arrTelems);
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="tele-container">
					<div className="title">Quản lý khám từ xa</div>
					<form>
						<div className="tele-input">
							<div className="tele-name">
								<label htmlFor="name">Telemedicine Name:</label>
								<input
									type="text"
									value={name}
									onChange={(event) =>
										this.handleOnchangeInput(event, "name")
									}
								/>
							</div>
							<div className="tele-image">
								<label htmlFor="image">Image:</label>
								<input
									id="file-input"
									type="file"
									name="file"
									value={image}
									accept="image/png, image/jpeg"
									onChange={(event) =>
										this.handleOnchangeImage(event, "image")
									}
								/>
							</div>
							<button
								className="btn-add-new-tele"
								type="button"
								onClick={() =>
									this.handleCreateNewTelemedicine()
								}
							>
								Thêm mới
							</button>
						</div>

						<div className="description">
							<label htmlFor="">Description:</label>
							<MdEditor
								style={{ height: "300px" }}
								renderHTML={(text) => mdParser.render(text)}
								onChange={this.handleEditorChange}
								value={description}
							/>
						</div>
					</form>
					<table id="customers">
						<tr>
							<th width="20%" className="text-center">
								Name
							</th>
							<th width="20%" className="text-center">
								Description
							</th>
							<th width="20%" className="text-center">
								DescriptionHTML
							</th>
							<th width="20%" className="text-center">
								Image
							</th>
							<th width="12%" className="text-center">
								Actions
							</th>
						</tr>

						{arrTelems &&
							arrTelems.map((item, index) => {
								let imageBase64 = new Buffer(
									item.image,
									"base64"
								).toString("binary");
								return (
									<tr
										key={index}
										height="160px"
										className="tele-col"
									>
										<td>{item.name}</td>
										<td>
											<div className="description-table">
												{item.description}
											</div>
										</td>
										<td>
											<div className="description-table">
												{item.descriptionHTML}
											</div>
										</td>
										<td>
											<div
												className="tele-image-table"
												style={{
													backgroundImage: `url(${imageBase64})`,
												}}
											></div>
										</td>
										<td className="text-center">
											<button
												className="btn-edit"
												onClick={() =>
													this.handleOpenModalEdit(
														item
													)
												}
											>
												<i className="fas fa-pencil-alt"></i>
											</button>
											<button
												className="btn-delete"
												onClick={() =>
													this.handleConfirmDelete(
														item
													)
												}
											>
												<i className="fas fa-trash"></i>
											</button>
										</td>
									</tr>
								);
							})}
					</table>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageTelemedicine);
