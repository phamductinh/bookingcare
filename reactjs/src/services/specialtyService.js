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

export { handleCreateSpecialty, getALLSpecialty, deleteSpecialty };
