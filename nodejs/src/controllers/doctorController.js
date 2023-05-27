import db from "../configs/connectDB";
import doctorModel from "../models/doctorModel";
import { errMsg, successMsg } from "../utils/resMsg";

const getAllDoctors = (req, res) => {
	doctorModel.getAllDoctorsModel((error, results) => {
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

let getADoctor = (req, res) => {
	let doctorId = req.query.id;
	if (!doctorId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}

	doctorModel.getDoctorByIdModel(doctorId, (error, doctor) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: doctor,
		});
	});
};

let createADoctor = (req, res) => {
	let doctorData = req.body;
	doctorModel.createDoctorModel(doctorData, (err, results) => {
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

let updateADoctor = (req, res) => {
	let doctorData = req.body;
	doctorModel.updateADoctorModel(doctorData, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: successMsg.update_user_succeed,
		});
	});
};

let deleteDoctor = (req, res) => {
	let doctorId = req.query.id;
	if (!doctorId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	doctorModel.getDoctorByIdModel(doctorId, (error, doctor) => {
		if (!doctor) {
			return res.status(400).send({ code: 400, msg: errMsg.not_exist });
		}
		doctorModel.deleteADoctorModel(doctorId, (error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: 200,
				msg: successMsg.dalete_user_succeed,
			});
		});
	});
};

module.exports = {
	getAllDoctors,
	getADoctor,
	createADoctor,
	deleteDoctor,
	updateADoctor,
};
