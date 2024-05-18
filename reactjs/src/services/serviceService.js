import axios from "../axios";

const handleCreateService = (data) => {
	return axios.post("/api/create-service", data);
};

const getALLService = () => {
	return axios.get("/api/get-all-service");
};

const deleteService = (id) => {
	return axios.delete(`/api/delete-service?id=${id}`);
};

const updateService = (data) => {
	return axios.put(`/api/update-service`, data);
};

const getTotalRowService = () => {
	return axios.get("/api/get-total-row-service");
};

const getPaginationService = (page) => {
	return axios.get(`/api/get-pagination-service?page=${page}`);
};

const getServiceById = (id) => {
	return axios.get(`/api/get-service-by-id?id=${id}`);
};

export {
	handleCreateService,
	getALLService,
	deleteService,
	updateService,
	getTotalRowService,
	getPaginationService,
	getServiceById,
};
