import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import userModel from "../models/userModel";
import { errMsg, successMsg } from "../utils/resMsg";

const getAllUsers = (req, res) => {
	userModel.getAllUsers((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: errMsg.failed,
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

const getTotalRowUser = (req, res) => {
	userModel.getTotalRowUserModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: errMsg.failed,
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results[0],
			});
		}
	});
};

const getPaginationUsers = (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let limit = 5;
	let start = (page - 1) * limit;
	userModel.getPaginationUsersModel(start, limit, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let getUser = (req, res) => {
	let userId = req.query.id;
	if (!userId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}

	userModel.getUserById(userId, (error, user) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: user,
		});
	});
};

let createUser = (req, res) => {
	let userData = req.body;
	userModel.createUser(userData, (err, results) => {
		if (err) {
			return res.status(400).send({
				code: 400,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: successMsg.create_user_succeed,
		});
	});
};

// let updateUser = (req, res) => {
// 	let userData = req.body;
// 	userModel.updateAUser,
// 		userData,
// 		(error, results, fields) => {
// 			if (error) throw error;
// 			return res.send({
// 				code: 200,
// 				msg: "User has been updated successfully.",
// 			});
// 		};
// };

let updateUser = (req, res) => {
	let userData = req.body;
	userModel.updateAUser(userData, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: successMsg.update_user_succeed,
		});
	});
};

let deleteUser = (req, res) => {
	let userId = req.query.id;
	if (!userId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	userModel.getUserById(userId, (error, user) => {
		if (!user) {
			return res.status(400).send({ code: 400, msg: errMsg.not_exist });
		}
		userModel.deleteAUser(userId, (error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: 200,
				msg: successMsg.dalete_user_succeed,
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
	getPaginationUsers,
	getTotalRowUser,
};
