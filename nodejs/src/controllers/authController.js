import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey = process.env.SECRET_TOKEN_KEY;

let register = (req, res, next) => {
	db.query(
		`SELECT * FROM user WHERE LOWER(email) = LOWER(${db.escape(
			req.body.email
		)});`,
		(err, result) => {
			if (result.length) {
				return res.status(409).send({
                    code: "409",
					msg: "This user is already in use!",
				});
			} else {
				// username is available
				bcrypt.hash(req.body.password, 10, (err, hash) => {
					if (err) {
						return res.status(400).send({
							msg: err,
							code: "400",
						});
					} else {
						db.query(
							`INSERT INTO user (email, password) VALUES (${db.escape(
								req.body.email
							)}, ${db.escape(hash)})`,
							(err, result) => {
								if (err) {
									throw err;
								}
								return res.status(201).send({
                                    code: "201",
									msg: "The user has been registerd !",
								});
							}
						);
					}
				});
			}
		}
	);
};

let login = (req, res, next) => {
	db.query(
		`SELECT * FROM user WHERE email = ${db.escape(req.body.email)};`,
		(err, result) => {
			if (err) {
				throw err;
			}
			if (!result.length) {
				return res.status(400).send({
					code: "400",
					msg: "User does not exist !",
				});
			}
			// check password
			bcrypt.compare(
				req.body.password,
				result[0]["password"],
				(bErr, bResult) => {
					// wrong password
					if (bErr) {
						throw bErr;
					}
					if (bResult) {
						let token = jwt.sign(
							{
								id: result[0].id,
								fullName: result[0].fullName,
								address: result[0].address,
								gender: result[0].gender,
								phoneNumber: result[0].phoneNumber,
							},
							secretKey
						);
						return res.status(200).send({
                            code: "200",
							msg: "Logged in!",
							token,
							user: result[0],
						});
					}
					return res.status(401).send({
                        code: "401",
						msg: "Email or password is incorrect!",
					});
				}
			);
		}
	);
};

module.exports = {
	login,
	register,
};
