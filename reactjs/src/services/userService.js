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

const getAllUsers = (token) => {
	return axios.get("/api/users", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getTotalRowUser = (token) => {
	return axios.get("/api/get-total-row-user", {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const getPaginationUsers = (token, page) => {
	return axios.get(`/api/get-pagination-users?page=${page}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const deleteUser = (token, userId) => {
	return axios.delete(`/api/delete-user?id=${userId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const editUser = (token, userData) => {
	return axios.put("/api/edit-user", userData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
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
