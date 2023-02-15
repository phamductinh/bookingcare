import db from "../configs/connectDB";
import bcrypt from "bcryptjs";

let getAllUsers = (req, res) => {
	db.query("SELECT * FROM user", (error, results, fields) => {
		if (error) throw error;
		return res.send({
			error: false,
			message: "Users list:",
			data: results,
		});
	});
};

let getUser = (req, res) => {
	let userId = req.body.id;
	if (!userId) {
		return res
			.status(400)
			.send({ error: true, message: "Please provide userId" });
	}
	db.query(
		"SELECT * FROM user where id = ?",
		userId,
		(error, results, fields) => {
			if (error) throw error;
			return res.send({
                error: false,
				message: "Succeed !",
				data: results[0],
			});
		}
	);
};

let createUser = (req, res) => {
	db.query(
		`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
			req.body.email
		)});`,
		(err, result) => {
			if (result.length) {
				return res.status(409).send({
					msg: "This user is already in used !",
				});
			} else {
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(500).send({
							msg: err,
						});
					} else {
						db.query(
							`INSERT INTO user (email, password, fullName, address, gender, phoneNumber) VALUES (${db.escape(
								req.body.email
							)}, ${db.escape(hash)}, ${db.escape(
								req.body.fullName
							)}, ${db.escape(req.body.address)}, ${db.escape(
								req.body.gender
							)}, ${db.escape(req.body.phoneNumber)})`,
							(err, results) => {
								if (err) {
									throw err;
								}
								return res.status(201).send({
									msg: "Create a user succeed !",
								});
							}
						);
					}
				});
			}
		}
	);
};

let deleteUser = (req, res) => {
	let userId = req.body.id;
	if (!userId) {
		return res
			.status(400)
			.send({ error: true, message: "Please provide userId" });
	}
	db.query(
		"DELETE FROM user WHERE id = ?",
		[userId],
		(error, results, fields) => {
			if (error) throw error;
			return res.send({
				error: false,
				message: "User has been deleted successfully.",
			});
		}
	);
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
    deleteUser
};
