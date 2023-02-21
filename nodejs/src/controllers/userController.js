import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import emailValidator from "email-validator";

let getAllUsers = (req, res) => {
	db.query("SELECT * FROM user", (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: "200",
			data: results,
		});
	});
};

let getUser = (req, res) => {
	let userId = req.query.id;
	if (!userId) {
		return res
			.status(400)
			.send({ code: "400", msg: "Please provide id" });
	}
	db.query(
		"SELECT * FROM user WHERE id = ?",
		userId,
		(error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: "200",
				data: results[0],
			});
		}
	);
};

let createUser = (req, res) => {
	if (
		!req.body.email ||
		!req.body.password ||
		!req.body.fullName ||
		!req.body.address ||
		!req.body.gender
	) {
		return res.status(408).send({
			code: "400",
			msg: "Missing parameters !",
		});
	} else {
		db.query(
			`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
				req.body.email
			)});`,
			(err, result) => {
				if (result.length) {
					return res.status(409).send({
                        code: "409",
						msg: "This user is already in used !",
					});
				} else {
					bcrypt.hash(req.body.password, 10, (err, hash) => {
						if (err) {
							return res.status(500).send({
								msg: err,
							});
						} else {
							let email = req.body.email;
							if (!emailValidator.validate(email)) {
								return res.status(400).send({
									code: "400",
									msg: "Invalid email !",
								});
							}
							db.query(
								`INSERT INTO user (email, password, fullName, address, gender, phoneNumber) VALUES (${db.escape(
									email
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
										code: "200",
										msg: "Create a user successfully !",
									});
								}
							);
						}
					});
				}
			}
		);
	}
};

let updateUser = (req, res) => {
	let userId = req.body.id;
	let fullName = req.body.fullName;
	let address = req.body.address;
	let gender = req.body.gender;
	let phoneNumber = req.body.phoneNumber;
	if (!userId) {
		return res
			.status(400)
			.send({ code: "400", msg: "Please provide userId" });
	} else if (req.body.email || req.body.password) {
		return res.status(401).send({
            code: "401",
			msg: "Email and password can't be changed !",
		});
	} else {
		db.query(
			"UPDATE user SET fullName = ?, address = ?, gender = ?, phoneNumber = ? WHERE id = ?",
			[fullName, address, gender, phoneNumber, userId],
			(error, results, fields) => {
				if (error) throw error;
				return res.send({
					code: "200",
					msg: "User has been updated successfully.",
				});
			}
		);
	}
};

let deleteUser = (req, res) => {
	let userId = req.body.id;
	if (!userId) {
		return res
			.status(400)
			.send({ code: "400", msg: "Please provide userId" });
	} else {
		db.query(
			"DELETE FROM user WHERE id = ?",
			[userId],
			(error, results, fields) => {
				if (error) throw error;
				return res.send({
					code: "200",
					msg: "User has been deleted successfully.",
				});
			}
		);
	}
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser,
};
