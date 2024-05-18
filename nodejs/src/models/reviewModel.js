import db from "../configs/connectDB";
import {
	totalRowReview,
	deleteReviewById,
	createAFeedbackQuery,
	getFeedbackByDoctorIdQuery,
	updateFeedbackQuery,
} from "../database/queries";
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

let getFeedbackByDoctorIdModel = (doctorId, callback) => {
	db.query(getFeedbackByDoctorIdQuery, doctorId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let createAFeedbackModel = (data, callback) => {
	let { doctorId, comment, userId } = data;

	db.query(
		createAFeedbackQuery,
		[doctorId, comment, userId],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateFeedbackModel = (data, callback) => {
	let values = [data.comment, data.id];
	if (!data.id) {
		let error = new Error(errMsg.missing_input);
		error.statusCode = 400;
		return callback(error);
	}

	db.query(updateFeedbackQuery, values, callback);
};

module.exports = {
	getTotalRowReviewModel,
	getPaginationReviewModel,
	deleteReviewModel,
	createAFeedbackModel,
	getFeedbackByDoctorIdModel,
	updateFeedbackModel,
};
