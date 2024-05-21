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

const getOutDoctors = (req, res) => {
	doctorModel.getOutDoctorsModel((error, results) => {
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

const getTotalRowDoctor = (req, res) => {
	doctorModel.getTotalRowDoctorModel((error, results) => {
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

const getPaginationDoctors = (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let limit = 4;
	let start = (page - 1) * limit;
	doctorModel.getPaginationDoctorsModel(start, limit, (error, results) => {
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

let getDoctorByKeyword = (req, res) => {
	const keyword = req.query.keyword;
	const specialtyId = parseInt(req.query.specialtyId);
	let findDoctorByKeyword = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name as specialty, clinic.name as clinic FROM doctor JOIN clinic ON clinic.id = doctor.clinicId JOIN specialty ON specialty.id = doctor.specialtyId `;

	if (keyword) {
		findDoctorByKeyword += ` AND doctor.name LIKE '%${keyword}%'`;
	}
	if (!isNaN(specialtyId)) {
		findDoctorByKeyword += ` AND doctor.specialtyId = '${specialtyId}'`;
	}
	db.query(findDoctorByKeyword, (error, results) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: results,
		});
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

let getDoctorIsTelemedicine = (req, res) => {
	let telemId = req.query.id;
	if (!telemId) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	doctorModel.getDoctorIsTelemedicineModel(telemId, (error, doctor) => {
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
			console.log(err);
			return res.status(400).send({
				code: 400,
				msg: "Something wrong!",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Create doctor successfully!",
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

let getDoctorBySpecialtyId = (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	doctorModel.getDoctorBySpecialtyIdModel(id, (error, doctor) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: doctor,
		});
	});
};

let getDoctorByServiceId = (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	doctorModel.getDoctorByServiceIdModel(id, (error, doctor) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: doctor,
		});
	});
};

module.exports = {
	getAllDoctors,
	getADoctor,
	createADoctor,
	deleteDoctor,
	updateADoctor,
	getDoctorIsTelemedicine,
	getDoctorByKeyword,
	getTotalRowDoctor,
	getPaginationDoctors,
	getDoctorBySpecialtyId,
	getDoctorByServiceId,
	getOutDoctors,
};
