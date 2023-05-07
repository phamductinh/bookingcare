import db from "../configs/connectDB";
import {
	findAllTelemedicine,
	createTelemedicineQuery,
    deleteTelemedicineById
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


module.exports = {
	createNewTelemedicine,
	getAllTelemedicine,
    deleteTelemedicineModel
};
