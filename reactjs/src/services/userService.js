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

const getAllUsers = (token) => {
	return axios.get("/api/users", {
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

export { handleLoginAPI, handleCreateUser, getAllUsers, deleteUser, editUser };
