import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";

const getAllUsers = (req, res) => {
	userModel.getAllUsers((error, results) => {
		if (error) {
			return res.status(500).send({
				code: "500",
				msg: "Failed to fetch users",
			});
		} else {
			return res.status(200).send({
				code: "200",
				data: results,
			});
		}
	});
};

let getUser = (req, res) => {
	let userId = req.query.id;
    if (!userId) {
        return res
            .status(400)
            .send({ code: "400", msg: "Please provide id" });
    }

    userModel.getUserById(userId, (error, user) => {
        if (error) {
            throw error;
        }
        return res.send({
            code: "200",
            data: user,
        });
    });
};

let createUser = (req, res) => {
	const userData = req.body;
	userModel.createUser(userData, (err, results) => {
		if (err) {
			return res.status(err.statusCode || 500).send({
				code: err.statusCode || 500,
				msg: err.message,
			});
		}

		return res.status(201).send({
			code: 200,
			msg: "Create a user successfully!",
		});
	});
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
