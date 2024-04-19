import axios from "../axios";

const getTotalRowReview = () => {
	return axios.get("/api/get-total-row-review");
};

const getPaginationReviews = (doctorId, page) => {
	return axios.get(
		`/api/get-pagination-review?doctorId=${doctorId}&page=${page}`
	);
};

const deleteReview = (token, id) => {
	return axios.delete(`/api/delete-review?id=${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

export { getTotalRowReview, getPaginationReviews, deleteReview };
