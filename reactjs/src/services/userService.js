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

export { handleLoginAPI, handleCreateUser, getAllUsers };
