import db from "../configs/connectDB";
import {
	findAllTelemedicine,
	createTelemedicineQuery,
	deleteTelemedicineById,
	updateTelemedicineQuery,
	totalRowTelemedicine,
} from "../database/queries";

let getAllTelemedicine = (callback) => {
	db.query(findAllTelemedicine, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getTelemedicineByIdModel = (id, callback) => {
	db.query(findTelemedicineById, id, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results[0]);
	});
};

let createNewTelemedicine = (data, callback) => {
	let { name, description, descriptionHTML, image } = data;
	if (!name || !description || !descriptionHTML) {
		let error = new Error("Missing input !");
		error.statusCode = 400;
		return callback(error);
	}
	db.query(
		createTelemedicineQuery,
		[name, description, descriptionHTML, image],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let deleteTelemedicineModel = (id, callback) => {
	return db.query(deleteTelemedicineById, [id], callback);
};

let updateTelemedicineModel = (data, callback) => {
	db.query(updateTelemedicineQuery, data, (error, results, fields) => {
		callback(error, results, fields);
	});
};

let getTotalRowTelemedicineModel = (callback) => {
	db.query(totalRowTelemedicine, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getPaginationTelemedicineModel = (start, limit, callback) => {
	let sql = `SELECT * FROM telemedicine ORDER BY id ASC LIMIT ${start} , ${limit}`;
	db.query(sql, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

module.exports = {
	createNewTelemedicine,
	getAllTelemedicine,
	deleteTelemedicineModel,
	updateTelemedicineModel,
	getTelemedicineByIdModel,
	getTotalRowTelemedicineModel,
	getPaginationTelemedicineModel,
};
