import axios from "../axios";

const handleCreateDoctor = (data) => {
	return axios.post("/api/create-doctor", data);
};

const getAllDoctors = () => {
	return axios.get("/api/get-all-doctors");
};

const getOutstandingDoctors = () => {
	return axios.get("/api/get-outstanding-doctors");
};

const getDoctorById = (doctorId) => {
	return axios.get(`/api/get-a-doctor?id=${doctorId}`);
};

const getDoctorIsTelemedicine = (telemId) => {
	return axios.get(`/api/get-doctor-is-telemedicine?id=${telemId}`);
};

const getDoctorByKeyword = (keyword, specialtyId) => {
	return axios.get(
		`/api/get-doctor-by-keyword?keyword=${keyword}&specialtyId=${specialtyId}`
	);
};

const deleteDoctor = (doctorId) => {
	return axios.delete(`/api/delete-doctor?id=${doctorId}`);
};

const updateDoctor = (doctorData) => {
	return axios.put("/api/update-doctor", doctorData);
};

const getTotalRowDoctor = () => {
	return axios.get("/api/get-total-row-doctor");
};

const getPaginationDoctors = (page) => {
	return axios.get(`/api/get-pagination-doctors?page=${page}`);
};

const getDoctorBySpecialtyId = (id) => {
	return axios.get(`/api/get-doctor-by-specialtyId?id=${id}`);
};

const getDoctorByServiceId = (id) => {
	return axios.get(`/api/get-doctor-by-serviceId?id=${id}`);
};

export {
	handleCreateDoctor,
	getAllDoctors,
	getDoctorById,
	deleteDoctor,
	updateDoctor,
	getDoctorIsTelemedicine,
	getDoctorByKeyword,
	getTotalRowDoctor,
	getPaginationDoctors,
	getDoctorBySpecialtyId,
	getDoctorByServiceId,
	getOutstandingDoctors,
};
