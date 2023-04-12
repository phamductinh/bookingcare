import db from "../configs/connectDB";
import { findAllTelemedicine, createTelemedicine } from "../database/queries";

let getAllTelemedicine = (callback) => {
	db.query(findAllTelemedicine, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let createNewTelemedicine = (data, callback) => {
	let { name, description, image } = data;
	if (!name || !description) {
		let error = new Error("Missing input !");
		error.statusCode = 400;
		return callback(error);
	}
	db.query(createTelemedicine, data, (err, results) => {
		if (err) {
			return callback(err);
		}
		callback(null, results);
	});
};

module.exports = {
	createNewTelemedicine,
	getAllTelemedicine,
};
