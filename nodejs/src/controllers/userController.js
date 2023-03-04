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
		return res.status(400).send({ code: "400", msg: "Please provide id" });
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
	let userData = req.body;
	userModel.createUser(userData, (err, results) => {
		if (err) {
			return res.status(err.statusCode).send({
				code: err.statusCode,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: "Create a user successfully!",
		});
	});
};

// let updateUser = (req, res) => {
// 	let id = req.params.id;
// 	let userData = req.body;
// 	userModel.updateAUser,
// 		userData,
// 		id,
// 		(error, results, fields) => {
// 			if (error) throw error;
// 			return res.send({
// 				code: "200",
// 				msg: "User has been updated successfully.",
// 			});
// 		};
// };

let updateUser = (req, res) => {
    let userData = req.body;
    userModel.updateAUser(userData, (error, results, fields) => {
      if (error) throw error;
      return res.send({
        code: "200",
        msg: "User has been updated successfully.",
      });
    });
  };

let deleteUser = (req, res) => {
	let userId = req.body.id;
	if (!userId) {
		return res
			.status(400)
			.send({ code: "400", msg: "Please provide userId!" });
	}
	userModel.getUserById(userId, (error, user) => {
		if (!user) {
			return res
				.status(400)
				.send({ code: "400", msg: "User does not exist!" });
		}
		userModel.deleteAUser(userId, (error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: "200",
				msg: "User has been deleted successfully.",
			});
		});
	});
};

module.exports = {
	getAllUsers,
	getUser,
	createUser,
	deleteUser,
	updateUser,
};
