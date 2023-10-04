import axios from "../axios";

const handleCreateRoom = (data) => {
	return axios.post("/api/create-room", data);
};

const getRoomByCode = (code) => {
	return axios.get(`/api/get-room?id=${code}`);
};

export { handleCreateRoom, getRoomByCode };
