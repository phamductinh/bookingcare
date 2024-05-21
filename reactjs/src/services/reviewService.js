import axios from "../axios";

const getTotalRowReview = () => {
	return axios.get("/api/get-total-row-review");
};

const getPaginationReviews = (doctorId, page) => {
	return axios.get(
		`/api/get-pagination-review?doctorId=${doctorId}&page=${page}`
	);
};

const deleteReview = (id) => {
	return axios.delete(`/api/delete-review?id=${id}`);
};

const getFeedbackByDoctorId = (doctorId) => {
	return axios.get(`/api/get-feedback-by-doctorId?doctorId=${doctorId}`);
};

const handleCreateFeedback = (data) => {
	return axios.post("/api/create-feedback", data);
};

const updateFeedback = (data) => {
	return axios.put("/api/update-feedback", data);
};

const deleteFeedback = (id) => {
	return axios.delete(`/api/delete-feedback?id=${id}`);
};

export {
	getTotalRowReview,
	getPaginationReviews,
	deleteReview,
	getFeedbackByDoctorId,
	handleCreateFeedback,
	updateFeedback,
	deleteFeedback,
};
