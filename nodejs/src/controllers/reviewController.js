import db from "../configs/connectDB";
import reviewModel from "../models/reviewModel";
import { errMsg, successMsg } from "../utils/resMsg";

const getTotalRowReview = (req, res) => {
	reviewModel.getTotalRowReviewModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: errMsg.failed,
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

const getPaginationReviews = (req, res) => {
	let doctorId = req.query.doctorId;
	let page = req.query.page ? req.query.page : 1;
	let limit = 4;
	let start = (page - 1) * limit;
	reviewModel.getPaginationReviewModel(
		doctorId,
		start,
		limit,
		(error, results) => {
			if (error) {
				return res.status(500).send({
					code: 500,
					msg: "Failed!",
				});
			} else {
				return res.status(200).send({
					code: 200,
					data: results,
				});
			}
		}
	);
};


let deleteReview = (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}
	reviewModel.deleteReviewModel(id, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: "Delete successfully!",
		});
	});
};

module.exports = {
	getTotalRowReview,
	getPaginationReviews,
    deleteReview
};
