import db from "../configs/connectDB";
import {
	findAllServiceQuery,
	createNewServiceQuery,
	deleteServiceById,
	totalRowService,
	findServiceById,
	updateServiceQuery,
} from "../database/queries";

let getAllServiceModel = (callback) => {
	db.query(findAllServiceQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let createNewServiceModel = (data, callback) => {
	let { name, description, descriptionHTML, price } = data;
	if (!name || !description || !descriptionHTML || !price) {
		let error = new Error("Missing input !");
		error.statusCode = 400;
		return callback(error);
	}
	db.query(
		createNewServiceQuery,
		[name, description, descriptionHTML, price],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateServiceModel = (data, callback) => {
	db.query(updateServiceQuery, data, (error, results, fields) => {
		callback(error, results, fields);
	});
};

let deleteServiceModel = (id, callback) => {
	return db.query(deleteServiceById, [id], callback);
};

let getTotalRowServiceModel = (callback) => {
	db.query(totalRowService, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getPaginationServiceModel = (start, limit, callback) => {
	let sql = `SELECT * FROM service ORDER BY id ASC LIMIT ${start} , ${limit}`;
	db.query(sql, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getServiceByIdModel = (id, callback) => {
	db.query(findServiceById, id, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getAllServiceModel,
	createNewServiceModel,
	deleteServiceModel,
	updateServiceModel,
	getTotalRowServiceModel,
	getPaginationServiceModel,
	getServiceByIdModel,
};
