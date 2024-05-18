import db from "../configs/connectDB";
import {
	findAllSpecialtyQuery,
	createNewSpecialtyQuery,
	deleteSpecialtyById,
	totalRowSpecialty,
	findSpecialtyById,
} from "../database/queries";

let getAllSpecialtyModel = (callback) => {
	db.query(findAllSpecialtyQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let createNewSpecialtyModel = (data, callback) => {
	let { name, description, descriptionHTML, image } = data;
	if (!name || !description || !descriptionHTML) {
		let error = new Error("Missing input !");
		error.statusCode = 400;
		return callback(error);
	}
	db.query(
		createNewSpecialtyQuery,
		[name, description, descriptionHTML, image],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateSpecialtyModel = (data, callback) => {
	db.query(updateSpecialtyQuery, data, (error, results, fields) => {
		callback(error, results, fields);
	});
};

let deleteSpecialtyModel = (id, callback) => {
	return db.query(deleteSpecialtyById, [id], callback);
};

let getTotalRowSpecialtyModel = (callback) => {
	db.query(totalRowSpecialty, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getPaginationSpecialtyModel = (start, limit, callback) => {
	let sql = `SELECT * FROM specialty ORDER BY id ASC LIMIT ${start} , ${limit}`;
	db.query(sql, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getSpecialtyByIdModel = (id, callback) => {
	db.query(findSpecialtyById, id, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getAllSpecialtyModel,
	createNewSpecialtyModel,
	deleteSpecialtyModel,
	updateSpecialtyModel,
	getTotalRowSpecialtyModel,
	getPaginationSpecialtyModel,
	getSpecialtyByIdModel,
};
