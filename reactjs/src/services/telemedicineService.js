import axios from "../axios";

const handleCreateTelemedicine = (data) => {
	return axios.post("/api/create-telemedicine", data);
};

const getALLTelemedicine = () => {
	return axios.get("/api/get-all-telemedicine");
};

const getTelemedicine = (id) => {
	return axios.get(`/api/get-telemedicine`, id);
};

const deleteTelemedicine = (id) => {
	return axios.delete(`/api/delete-telemedicine?id=${id}`);
};

const updateTelemedicine = (data) => {
	return axios.put(`/api/update-telemedicine`, data);
};

const getTotalRowTelemedicine = () => {
	return axios.get("/api/get-total-row-telemedicine");
};

const getPaginationTelemedicine = (page) => {
	return axios.get(`/api/get-pagination-telemedicine?page=${page}`);
};

export {
	handleCreateTelemedicine,
	getALLTelemedicine,
	deleteTelemedicine,
	updateTelemedicine,
	getTelemedicine,
	getTotalRowTelemedicine,
	getPaginationTelemedicine,
};
