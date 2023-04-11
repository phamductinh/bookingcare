import db from "../configs/connectDB";

let createTelemedicine = (data, callback) => {
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
	createTelemedicine,
};
