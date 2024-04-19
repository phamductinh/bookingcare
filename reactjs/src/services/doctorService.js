import axios from "../axios";

const handleCreateDoctor = (data) => {
	return axios.post("/api/create-doctor", data);
};

const getAllDoctors = () => {
	return axios.get("/api/get-all-doctors");
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

const deleteDoctor = (token, doctorId) => {
	return axios.delete(`/api/delete-doctor?id=${doctorId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const updateDoctor = (token, doctorData) => {
	return axios.put("/api/update-doctor", doctorData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
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
};
