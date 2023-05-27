import axios from "../axios";

const handleCreateDoctor = (data) => {
	return axios.post("/api/create-doctor", data);
};

const getAllDoctors = () => {
	return axios.get("/api/get-all-doctors");
};

const getDoctorById = (doctorId) => {
	return axios.get("/api/get-doctor", doctorId);
};

const deleteDoctor = (doctorId) => {
	return axios.delete(`/api/delete-user?id=${doctorId}`);
};

const updateDoctor = (doctorData) => {
	return axios.put("/api/update-doctor", doctorData);
};

export {
	handleCreateDoctor,
	getAllDoctors,
	getDoctorById,
	deleteDoctor,
	updateDoctor,
};
