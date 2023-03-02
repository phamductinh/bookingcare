import db from "../configs/connectDB";
import {
	validateEmail,
	validatePassword,
	validateFullName,
	validateAddress,
} from "../middlewares/validateUser";
import bcrypt from "bcryptjs";

let getAllUsers = (callback) => {
	db.query("SELECT * FROM user", (error, results, fields) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getUserById = (userId, callback) => {
	db.query(
		"SELECT * FROM user WHERE id = ?",
		userId,
		(error, results, fields) => {
			if (error) {
				return callback(error);
			}
			return callback(null, results[0]);
		}
	);
};

let createUser = (userData, callback) => {
	let { email, password, fullName, address, gender, phoneNumber } = userData;
	if (!email || !password || !fullName || !address || !gender) {
		let error = new Error("Missing input parameters!");
		error.statusCode = 400;
		return callback(error);
	}
	db.query(
		`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(email)});`,
		(err, result) => {
			if (err) {
				return callback(err);
			}

			if (result.length) {
				let error = new Error("This user is already in used!");
				error.statusCode = 409;
				return callback(error);
			}

			if (!validatePassword(password)) {
				let error = new Error(
					"The password must include a special character and capitalize the first letter!"
				);
				error.statusCode = 400;
				return callback(error);
			}
			bcrypt.hash(password, 10, (err, hash) => {
				if (err) {
					return callback(err);
				}

				if (!validateEmail(email)) {
					let error = new Error("Invalid email!");
					error.statusCode = 400;
					return callback(error);
				}

				if (!validateFullName(fullName)) {
					let error = new Error(
						"Fullname can't contain special characters and number!"
					);
					error.statusCode = 400;
					return callback(error);
				}

				if (!validateAddress(address)) {
					let error = new Error(
						"Address can't contain special characters!"
					);
					error.statusCode = 400;
					return callback(error);
				}

				db.query(
					`INSERT INTO user (email, password, fullName, address, gender, phoneNumber) VALUES (${db.escape(
						email
					)}, ${db.escape(hash)}, ${db.escape(fullName)}, ${db.escape(
						address
					)}, ${db.escape(gender)}, ${db.escape(phoneNumber)})`,
					(err, results) => {
						if (err) {
							return callback(err);
						}

						callback(null, results);
					}
				);
			});
		}
	);
};

module.exports = {
	getUserById,
	getAllUsers,
	createUser,
};
