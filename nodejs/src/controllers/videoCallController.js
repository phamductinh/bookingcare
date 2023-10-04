import db from "../configs/connectDB";
import videoCallModel from "../models/videoCallModel";
import { errMsg, successMsg } from "../utils/resMsg";

let getRoom = (req, res) => {
	let code = req.query.code;
	if (!code) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}

	videoCallModel.getRoomModel(code, (error, room) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: room,
		});
	});
};

let createRoom = (req, res) => {
	let roomData = req.body;
	videoCallModel.createRoomModel(roomData, (err, results) => {
		if (err) {
			return res.status(err.statusCode).send({
				code: err.statusCode,
				msg: err.message,
			});
		}
		return res.status(201).send({
			code: 200,
			msg: successMsg.create_user_succeed,
		});
	});
};


module.exports = {
	getRoom,
	createRoom,
};
