import db from "../configs/connectDB";
import {
	findAllSpecialtyQuery,
	createNewSpecialtyQuery,
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
	let file = req.files.image;
	let filename = Date.now() + "_" + file.name;
	file.mv(__dirname + "/uploads/" + filename, (err) => {
		if (err) {
			console.error(err);
			return res.status(500).json({ message: "Error uploading file" });
		}
		db.query(
			createNewSpecialtyQuery,
			[name, description, descriptionHTML, filename],
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
