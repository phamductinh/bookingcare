import axios from "../axios";

const handleCreateSpecialty = (data) => {
	return axios.post("/api/create-specialty", data);
};

const getALLSpecialty = () => {
	return axios.get("/api/get-all-specialty");
};

const deleteSpecialty = (id) => {
	return axios.delete(`/api/delete-specialty?id=${id}`);
};

const updateSpecialty = (data) => {
	return axios.put(`/api/update-specialty`, data);
};

const getTotalRowSpecialty = () => {
	return axios.get("/api/get-total-row-specialty");
};

const getPaginationSpecialty = (page) => {
	return axios.get(`/api/get-pagination-specialty?page=${page}`);
};

export {
	handleCreateSpecialty,
	getALLSpecialty,
	deleteSpecialty,
	updateSpecialty,
	getTotalRowSpecialty,
	getPaginationSpecialty,
};
