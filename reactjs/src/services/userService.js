import axios from "../axios";

const handleLoginAPI = (userEmail, userPassword) => {
	return axios.post("/api/login", {
		email: userEmail,
		password: userPassword,
	});
};

const handleCreateUser = (data) => {
	return axios.post("/api/create-user", data);
};

const changePasswordService = (userData) => {
	return axios.put("/api/change-password", userData);
};

const resetPasswordService = (userData) => {
	return axios.put("/api/reset-password", userData);
};

const sendEmailPasswordService = (email) => {
	return axios.post(`/api/send-email-reset-password?email=${email}`);
};

const getAllUsers = () => {
	return axios.get("/api/users");
};

const getTotalRowUser = () => {
	return axios.get("/api/get-total-row-user");
};

const getPaginationUsers = (page) => {
	return axios.get(`/api/get-pagination-users?page=${page}`);
};

const deleteUser = (userId) => {
	return axios.delete(`/api/delete-user?id=${userId}`);
};

const editUser = (userData) => {
	return axios.put("/api/edit-user", userData);
};

const updateInforUser = (userData) => {
	return axios.put("/api/update-infor-user", userData);
};

const getUserById = (userId) => {
	return axios.get(`/api/get-user?id=${userId}`);
};

export {
	handleLoginAPI,
	handleCreateUser,
	getAllUsers,
	deleteUser,
	editUser,
	getPaginationUsers,
	getTotalRowUser,
	getUserById,
	updateInforUser,
	changePasswordService,
	sendEmailPasswordService,
	resetPasswordService,
};
