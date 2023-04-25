import db from "../configs/connectDB";
import {
	findAllSpecialtyQuery,
	createNewSpecialtyQuery,
} from "../database/queries";
import fileUpload from "express-fileupload";

let getAllSpecialtyModel = (callback) => {
	db.query(findAllSpecialtyQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let createNewSpecialtyModel = (data, file, callback) => {
	let { name, description, descriptionHTML, image } = data;
	if (!name || !description || !descriptionHTML) {
		let error = new Error("Missing input !");
		error.statusCode = 400;
		return callback(error);
	}
	let filename = file.name;
	file.mv(path.join(__dirname, "../public/images", filename), (err) => {
		if (err) {
			return callback(err);
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
	});
};

module.exports = {
	getAllSpecialtyModel,
	createNewSpecialtyModel,
};
