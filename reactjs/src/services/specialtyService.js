import axios from "../axios";

const handleCreateSpecialty = (data, formData) => {
	return axios.post("/api/create-specialty", data, formData);
};

const getALLSpecialty = () => {
	return axios.get("/api/get-all-specialty");
};

export { handleCreateSpecialty, getALLSpecialty };
