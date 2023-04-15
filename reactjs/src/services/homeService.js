import axios from "../axios";

const handleCreateTelemedicine = (data) => {
	return axios.post("/api/create-telemedicine", data);
};

const getALLTelemedicine = () => {
	return axios.get("/api/get-all-telemedicine");
};

export { handleCreateTelemedicine, getALLTelemedicine };
