import db from "../configs/connectDB";
import { totalRowReview, deleteReviewById } from "../database/queries";
import { errMsg } from "../utils/resMsg";

let getTotalRowReviewModel = (callback) => {
	db.query(totalRowReview, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getPaginationReviewModel = (doctorId, start, limit, callback) => {
	let sql = `SELECT review.*, user.fullName as patientName FROM review LEFT JOIN user ON user.id = review.userId WHERE doctorId = ${doctorId} ORDER BY id ASC LIMIT ${start} , ${limit}`;
	db.query(sql, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let deleteReviewModel = (id, callback) => {
	return db.query(deleteReviewById, [id], callback);
};

module.exports = {
	getTotalRowReviewModel,
	getPaginationReviewModel,
	deleteReviewModel,
};
