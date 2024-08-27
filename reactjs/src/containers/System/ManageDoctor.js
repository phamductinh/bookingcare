import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageDoctor.css";
import {
	handleCreateDoctor,
	deleteDoctor,
	updateDoctor,
	getPaginationDoctors,
	getTotalRowDoctor,
} from "../../services/doctorService";
import { getALLSpecialty } from "../../services/specialtyService";
import { getAllClinics } from "../../services/clinicService";
import { getALLTelemedicine } from "../../services/telemedicineService";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../Header/Header";
import LoadingSpinner from "../../components/Common/Loading";
import { CommonUtils } from "../../utils";
import MdEditor from "react-markdown-editor-lite";
import MarkdownIt from "markdown-it";
import "react-markdown-editor-lite/lib/index.css";
import Pagination from "../../components/Common/Pagination";
const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
	constructor(props) {
		super(props);
		this.state = {
			arrDoctors: [],
			arrClinics: [],
			arrSpecialty: [],
			arrTelems: [],
			id: "",
			name: "",
			address: "",
			image: "",
			imageBase64: "",
			setModalIsOpen: false,
			setModalEditIsOpen: false,
			isLoading: false,
			confirmDelete: false,
			newPage: 1,
		};
	}

	async componentDidMount() {
		await this.getAllDoctorsReact();
		await this.getAllClinicsReact();
		await this.getAllSpecialtyReact();
		await this.getTotalRowDoctorReact();
		await this.getAllTelemedicineReact();
	}

	getAllDoctorsReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getPaginationDoctors(this.state.newPage);
		console.log(res);
		if (res && res.code === 200) {
			this.setState({
				arrDoctors: res.data,
				isLoading: false,
			});
		}
	};

	getTotalRowDoctorReact = async () => {
		let res = await getTotalRowDoctor();
		if (res && res.code === 200) {
			let row = Math.ceil(res.data.totalRow / 5);
			this.setState({
				totalRow: row,
			});
		}
	};

	getAllSpecialtyReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getALLSpecialty();
		if (res && res.code === 200) {
			this.setState({
				arrSpecialty: res.data,
				isLoading: false,
			});
		}
	};
	getAllClinicsReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getAllClinics();
		if (res && res.code === 200) {
			this.setState({
				arrClinics: res.data,
				isLoading: false,
			});
		}
	};
	getAllTelemedicineReact = async () => {
		this.setState({
			isLoading: true,
		});
		let res = await getALLTelemedicine();
		if (res && res.code === 200) {
			this.setState({
				arrTelems: res.data,
				isLoading: false,
			});
		}
	};

	handleOpenModal() {
		this.setState({
			setModalIsOpen: true,
		});
	}

	handleOpenModalEdit(user) {
		this.setState({
			setModalEditIsOpen: true,
			name: user.name,
			introduction: user.introduction,
			clinicId: user.clinicId,
			specialtyId: user.specialtyId,
			telemId: user.telemId,
			description: user.description,
			address: user.address,
			image: user.image,
			price: user.price,
			doctorId: user.id,
		});
	}

	handleCloseModal() {
		this.setState({
			setModalEditIsOpen: false,
			setModalIsOpen: false,
			name: "",
			introduction: "",
			clinicId: "",
			specialtyId: "",
			description: "",
			address: "",
			price: "",
			image: "",
			telemId: "",
			isLoading: false,
			errMsgSignUp: "",
		});
	}

	handleOnchangeModalInput = async (event, id) => {
		let copyState = { ...this.state };
		copyState[id] = event.target.value;
		await this.setState({
			...copyState,
		});
	};

	handleEditorChange = async ({ html, text }) => {
		await this.setState({
			descriptionHTML: html,
		});
	};

	handleOnchangeImage = async (event) => {
		let data = event.target.files;
		let file = data[0];
		if (file) {
			let base64 = await CommonUtils.getBase64(file);
			await this.setState({
				imageBase64: base64,
			});
		}
	};

	handleAddNewDoctor = async () => {
		let newDoctorData = {
			name: this.state.name,
			introduction: this.state.introduction,
			clinicId: this.state.clinic,
			specialtyId: this.state.specialty,
			description: this.state.descriptionHTML,
			address: this.state.address,
			price: this.state.price,
			imageBase64: this.state.imageBase64,
			telemId: this.state.telemId,
		};
		try {
			this.setState({
				errMsgSignUp: "",
				isLoading: true,
			});
			let response = await handleCreateDoctor(newDoctorData);
			await this.getAllDoctorsReact();
			console.log("check response", response);
			toast.success("Thêm mới thành công!");
			this.setState({
				name: "",
				introduction: "",
				clinicId: "",
				specialtyId: "",
				description: "",
				address: "",
				price: "",
				image: "",
				telemId: "",
				setModalIsOpen: false,
				isLoading: false,
			});
		} catch (error) {
			if (error.response) {
				if (error.response.data) {
					this.setState({
						isLoading: false,
						errMsgSignUp: error.response.data.msg,
					});
				}
			}
		}
	};

	handleDeleteUser = async () => {
		try {
			let doctorId = this.state.doctorId;
			let res = await deleteDoctor(doctorId);
			console.log(res);
			if (res && res.code === 200) {
				await this.getAllDoctorsReact();
				toast.success("Xóa thành công!");
				this.setState({
					confirmDelete: false,
				});
			}
		} catch (error) {
			console.log(error);
			toast.error("Xóa thất bại!");
			this.setState({
				confirmDelete: false,
			});
		}
	};

	handleEditDoctor = async () => {
		try {
			let userData = {
				name: this.state.name,
				introduction: this.state.introduction,
				clinicId: this.state.clinicId,
				specialtyId: this.state.specialtyId,
				description: this.state.descriptionHTML,
				address: this.state.address,
				price: this.state.price,
				image: this.state.imageBase64,
				telemId: this.state.telemId,
				id: this.state.doctorId,
			};

			console.log(userData);

			let res = await updateDoctor(userData);
			if (res && res.code === 200) {
				this.setState({
					setModalEditIsOpen: false,
				});
				toast.success("Chỉnh sửa thành công!");
				await this.getAllDoctorsReact();
			}
		} catch (error) {
			console.log(error);
			toast.error("Chỉnh sửa thất bại!");
		}
	};

	handleConfirmDelete = async (item) => {
		await this.setState({
			confirmDelete: true,
			doctorId: item.id,
		});
	};

	handleCloseConfirmDelete() {
		this.setState({
			confirmDelete: false,
		});
	}

	handleCheckboxChange = async (event) => {
		const isChecked = event.target.checked;
		await this.setState({
			isTelemedicine: isChecked ? 1 : 0,
		});
	};

	handlePageChange = async (newPage) => {
		await this.setState({
			newPage: newPage,
		});
		await this.getAllDoctorsReact();
	};

	render() {
		let {
			arrDoctors,
			arrClinics,
			arrSpecialty,
			arrTelems,
			setModalIsOpen,
			setModalEditIsOpen,
			isLoading,
			confirmDelete,
			isTelemedicine,
		} = this.state;
		return (
			<>
				{this.props.isLoggedIn && <Header />}
				<div className="user-container">
					<div className="title text-center">Quản lý bác sĩ</div>
					<div className="mx-3">
						<button
							className="btn btn-primary px-3"
							onClick={() => this.handleOpenModal()}
						>
							Thêm mới bác sĩ
						</button>
					</div>
					<div className="users-table mt-3 mx-3">
						<table id="customers">
							<tbody>
								<tr>
									<th width="5%" className="text-center">
										Id
									</th>
									<th width="20%" className="text-center">
										Ảnh
									</th>
									<th width="20%" className="text-center">
										Họ và tên
									</th>
									<th width="20%" className="text-center">
										Giới thiệu
									</th>
									<th width="15%" className="text-center">
										Địa chỉ
									</th>
									<th width="10%" className="text-center">
										Giá
									</th>
									<th width="10%" className="text-center">
										Acts
									</th>
								</tr>

								{arrDoctors &&
									arrDoctors.map((item, index) => {
										let imageBase64 = new Buffer(
											item.image,
											"base64"
										).toString("binary");
										return (
											<tr key={index}>
												<td>{item.id}</td>
												<td>
													<div
														className="doctor-img-table"
														style={{
															backgroundImage: `url(${imageBase64})`,
														}}
													></div>
												</td>
												<td>{item.name}</td>
												<td>{item.introduction}</td>
												<td>{item.address}</td>
												<td>{item.price}</td>
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
							</tbody>
						</table>
					</div>

					<div className="pagination-container">
						<Pagination
							totalPages={this.state.totalRow}
							onPageChange={this.handlePageChange}
						/>
					</div>

					{setModalIsOpen ? (
						<div id="add-new-modal" className="modal">
							<div className="modal-content">
								<p>Thêm mới bác sĩ</p>
								<input
									className="name"
									type="text"
									placeholder="Họ và tên"
									value={this.state.name}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"name"
										)
									}
								/>
								<textarea
									name="introduction"
									id="introduction"
									placeholder="Giới thiệu"
									cols="30"
									rows="5"
									value={this.state.introduction}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"introduction"
										)
									}
								></textarea>

								<input
									className="address"
									name="address"
									type="text"
									placeholder="Địa chỉ"
									value={this.state.address}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"address"
										)
									}
								/>
								<div className="price-field">
									<input
										className="price"
										name="price"
										type="text"
										placeholder="Giá"
										value={this.state.price}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"price"
											)
										}
									/>
									<input
										className="doctor-image"
										name="image"
										type="file"
										accept="image/png, image/jpeg"
										onChange={(event) =>
											this.handleOnchangeImage(
												event,
												"image"
											)
										}
									/>
								</div>
								<div className="modal-select">
									<select
										name="clinic"
										id="clinic-select"
										value={this.state.clinic}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"clinic"
											)
										}
									>
										<option value="" disabled>
											Phòng khám
										</option>
										{arrClinics &&
											arrClinics.length > 0 &&
											arrClinics.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>

									<select
										name="specialty"
										id="specialty-select-doctor"
										value={this.state.specialty}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"specialty"
											)
										}
									>
										<option value="" disabled>
											Chuyên khoa
										</option>
										{arrSpecialty &&
											arrSpecialty.length > 0 &&
											arrSpecialty.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>
								</div>
								<div className="d-flex">
									<select
										name="specialty"
										id="telem-select-doctor"
										value={this.state.telemId}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"telemId"
											)
										}
									>
										<option value="" disabled>
											Khám từ xa
										</option>
										{arrTelems &&
											arrTelems.length > 0 &&
											arrTelems.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>
								</div>
								<MdEditor
									style={{ height: "250px" }}
									renderHTML={(text) => mdParser.render(text)}
									onChange={this.handleEditorChange}
									value={this.state.description}
								/>
								<div
									className="errMsgSignUp"
									style={{ color: "red" }}
								>
									{this.state.errMsgSignUp}
								</div>

								<div className="modal-btn">
									<button
										className="btn-add-new"
										type="button"
										onClick={() =>
											this.handleAddNewDoctor()
										}
									>
										Thêm mới
									</button>
									<button
										className="btn-cancel"
										type="button"
										onClick={() => this.handleCloseModal()}
									>
										Hủy
									</button>
								</div>
							</div>
						</div>
					) : null}

					{setModalEditIsOpen ? (
						<div id="add-new-modal" className="modal">
							<div className="modal-content">
								<p>Chỉnh sửa bác sĩ</p>
								<input
									className="name"
									type="text"
									placeholder="Họ và tên"
									value={this.state.name}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"name"
										)
									}
								/>
								<textarea
									name="introduction"
									id="introduction"
									placeholder="Giới thiệu"
									cols="30"
									rows="5"
									value={this.state.introduction}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"introduction"
										)
									}
								></textarea>

								<input
									className="address"
									name="address"
									type="text"
									placeholder="Địa chỉ"
									value={this.state.address}
									onChange={(event) =>
										this.handleOnchangeModalInput(
											event,
											"address"
										)
									}
								/>
								<div className="price-field">
									<input
										className="price"
										name="price"
										type="text"
										placeholder="Giá"
										value={this.state.price}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"price"
											)
										}
									/>
									<input
										className="doctor-image"
										name="image"
										type="file"
										accept="image/png, image/jpeg"
										onChange={(event) =>
											this.handleOnchangeImage(
												event,
												"image"
											)
										}
									/>
								</div>
								<div className="modal-select">
									<select
										name="clinic"
										id="clinic-select"
										value={this.state.clinic}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"clinic"
											)
										}
									>
										<option value="" disabled>
											Phòng khám
										</option>
										{arrClinics &&
											arrClinics.length > 0 &&
											arrClinics.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>

									<select
										name="specialty"
										id="specialty-select-doctor"
										value={this.state.specialty}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"specialty"
											)
										}
									>
										<option value="" disabled>
											Chuyên khoa
										</option>
										{arrSpecialty &&
											arrSpecialty.length > 0 &&
											arrSpecialty.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>
								</div>
								<div className="d-flex">
									<select
										name="specialty"
										id="telem-select-doctor"
										value={this.state.telemId}
										onChange={(event) =>
											this.handleOnchangeModalInput(
												event,
												"telemId"
											)
										}
									>
										<option value="" disabled>
											Khám từ xa
										</option>
										{arrTelems &&
											arrTelems.length > 0 &&
											arrTelems.map((item, index) => (
												<option
													key={index}
													value={item.id}
												>
													{item.name}
												</option>
											))}
									</select>
								</div>
								<MdEditor
									style={{ height: "250px" }}
									renderHTML={(text) => mdParser.render(text)}
									onChange={this.handleEditorChange}
									value={this.state.description}
								/>
								<div
									className="errMsgSignUp"
									style={{ color: "red" }}
								>
									{this.state.errMsgSignUp}
								</div>

								<div className="modal-btn">
									<button
										className="btn-add-new"
										type="button"
										onClick={() => this.handleEditDoctor()}
									>
										Chỉnh sửa
									</button>
									<button
										className="btn-cancel"
										type="button"
										onClick={() => this.handleCloseModal()}
									>
										Hủy
									</button>
								</div>
							</div>
						</div>
					) : null}

					{confirmDelete ? (
						<div className="confirm-delete">
							<div className="confirmation-text">
								Bạn có chắc chắn muốn xóa?
							</div>
							<div className="button-container">
								<button
									className="cancel-button"
									onClick={() =>
										this.handleCloseConfirmDelete()
									}
								>
									Hủy
								</button>
								<button
									className="confirmation-button"
									onClick={() => this.handleDeleteUser()}
								>
									Xóa
								</button>
							</div>
						</div>
					) : null}

					{isLoading && <LoadingSpinner />}
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
