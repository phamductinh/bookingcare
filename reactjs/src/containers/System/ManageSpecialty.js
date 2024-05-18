import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpecialty.css";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import { CommonUtils } from "../../utils";
import {
	handleCreateSpecialty,
	deleteSpecialty,
	updateSpecialty,
	getTotalRowSpecialty,
	getPaginationSpecialty,
} from "../../services/specialtyService";
import Pagination from "../../components/Common/Pagination";

const mdParser = new MarkdownIt();

class ManageSpecialty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			name: "",
			image: "",
			description: "",
			descriptionHTML: "",
			arrSpecialty: [],
			confirmDelete: false,
			newPage: 1,
		};
	}

	async componentDidMount() {
		await this.getALLSpecialtyReact();
		await this.getTotalRowSpecialtyReact();
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

	getALLSpecialtyReact = async () => {
		let res = await getPaginationSpecialty(this.state.newPage);
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
			});
		}
	};

	getTotalRowSpecialtyReact = async () => {
		let res = await getTotalRowSpecialty();
		if (res && res.code === 200) {
			let row = Math.ceil(res.data.totalRow / 5);
			this.setState({
				totalRow: row,
			});
		}
	};

	handlePageChange = async (newPage) => {
		await this.setState({
			newPage: newPage,
		});
		await this.getALLSpecialtyReact();
	};

	handleCreateNewSpecialty = async () => {
		let infor = {
			name: this.state.name,
			description: this.state.description,
			descriptionHTML: this.state.descriptionHTML,
			image: this.state.imageBase64,
		};
		console.log(infor);
		try {
			let res = await handleCreateSpecialty(infor);
			if (res && res.code === 200) {
				await this.getALLSpecialtyReact();
				toast.success("Thêm mới thành công!");
				this.setState({
					name: "",
					description: "",
					descriptionHTML: "",
					image: "",
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Thêm mới thất bại!");
		}
	};

	handleDeleteSpecialty = async () => {
		try {
			let res = await deleteSpecialty(this.state.specialtyId);
			if (res && res.code === 200) {
				await this.getALLSpecialtyReact();
				toast.success("Xóa thành công!");
				this.setState({
					confirmDelete: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Xóa thất bại!");
		}
	};

	handleEditSpecialty = async () => {
		let data = {
			name: this.state.name,
			description: this.state.description,
			descriptionHTML: this.state.descriptionHTML,
			image: this.state.imageBase64,
			id: this.state.id,
		};
		try {
			let res = await updateSpecialty(data);
			if (res && res.code === 200) {
				await this.getALLSpecialtyReact();
				toast.success("Chỉnh sửa thành công!");
				this.setState({
					name: "",
					description: "",
					descriptionHTML: "",
					image: "",
					showBtnEdit: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Chỉnh sửa thất bại!");
		}
	};

	handleFillDataEdit = (item) => {
		try {
			this.setState({
				id: item.id,
				name: item.name,
				description: item.description,
				descriptionHTML: item.descriptionHTML,
				showBtnEdit: true,
			});
		} catch (error) {
			console.log(error);
		}
	};

	handleConfirmDelete = (user) => {
		this.setState({
			confirmDelete: true,
			specialtyId: user.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	render() {
		const { name, description, confirmDelete, showBtnEdit } = this.state;
		let arrSpecialty = this.state.arrSpecialty;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="tele-container">
					<div className="title">Quản lý chuyên khoa</div>
					<form>
						<div className="tele-input">
							<div className="tele-name">
								<label htmlFor="name">Tên chuyên khoa:</label>
								<input
									type="text"
									value={name}
									onChange={(event) =>
										this.handleOnchangeInput(event, "name")
									}
								/>
							</div>
							<div className="tele-image">
								<label htmlFor="image">Ảnh:</label>
								<input
									id="file-input"
									type="file"
									name="file"
									// value={image}
									accept="image/png, image/jpeg"
									onChange={(event) =>
										this.handleOnchangeImage(event, "image")
									}
								/>
							</div>
							{showBtnEdit ? (
								<button
									className="btn-edit-tele"
									type="button"
									onClick={() => this.handleEditSpecialty()}
								>
									Lưu
								</button>
							) : (
								<button
									className="btn-add-new-tele"
									type="button"
									onClick={() =>
										this.handleCreateNewSpecialty()
									}
								>
									Thêm mới
								</button>
							)}
						</div>

						<div className="description">
							<label htmlFor="">Mô tả:</label>
							<MdEditor
								style={{ height: "300px" }}
								renderHTML={(text) => mdParser.render(text)}
								onChange={this.handleEditorChange}
								value={description}
							/>
						</div>
					</form>
					<table id="customers">
						<tbody>
							<tr>
								<th width="10%" className="text-center">
									Id
								</th>
								<th width="30%" className="text-center">
									Tên
								</th>
								<th width="40%" className="text-center">
									Ảnh
								</th>
								<th width="20%" className="text-center">
									Acts
								</th>
							</tr>

							{arrSpecialty &&
								arrSpecialty.map((item, index) => {
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
											<td className="text-center">
												{item.id}
											</td>
											<td>{item.name}</td>
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
														this.handleFillDataEdit(
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
						</tbody>
					</table>
				</div>

				<div className="pagination-container">
					<Pagination
						totalPages={this.state.totalRow}
						onPageChange={this.handlePageChange}
					/>
				</div>

				{confirmDelete ? (
					<div className="confirm-delete">
						<div className="confirmation-text">
							Bạn có chắc chắn muốn xóa?
						</div>
						<div className="button-container">
							<button
								className="cancel-button"
								onClick={() => this.handleCloseConfirmDelete()}
							>
								Hủy
							</button>
							<button
								className="confirmation-button"
								onClick={() => this.handleDeleteSpecialty()}
							>
								Xóa
							</button>
						</div>
					</div>
				) : null}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpecialty);
