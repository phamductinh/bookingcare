import db from "../configs/connectDB";
import telemedicineModel from "../models/telemedicineModel";

let getHomePage = (req, res) => {
	return res.send("hello");
};

const getAllTelemedicine = (req, res) => {
	telemedicineModel.getAllTelemedicine((error, results) => {
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

let createTelemedicine = (req, res) => {
	let data = req.body;
	telemedicineModel.createNewTelemedicine(data, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(400).send({
				code: 400,
				msg: "Something wrong !",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Create successfully !",
		});
	});
};

module.exports = {
	getHomePage,
	createTelemedicine,
	getAllTelemedicine,
};