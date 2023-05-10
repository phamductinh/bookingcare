import axios from "../axios";

const handleCreateTelemedicine = (data) => {
	return axios.post("/api/create-telemedicine", data);
};

const getALLTelemedicine = () => {
	return axios.get("/api/get-all-telemedicine");
};

const deleteTelemedicine = (id) => {
	return axios.delete(`/api/delete-telemedicine?id=${id}`);
};

export { handleCreateTelemedicine, getALLTelemedicine, deleteTelemedicine };
