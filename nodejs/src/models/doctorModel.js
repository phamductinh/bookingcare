import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import {
	findAllDoctorsQuery,
	findDoctorById,
	createADoctorQuery,
	updateDoctorQuery,
	deleteDoctorById,
} from "../database/queries";
import { errMsg } from "../utils/resMsg";

let getAllDoctorsModel = (callback) => {
	db.query(findAllDoctorsQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getDoctorByIdModel = (doctorId, callback) => {
	db.query(findDoctorById, doctorId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results[0]);
	});
};

let createDoctorModel = (doctorData, callback) => {
	let {
		name,
		introduction,
		clinicId,
		specialtyId,
		description,
		address,
		price,
	} = doctorData;

	db.query(
		createADoctorQuery,
		[
			name,
			introduction,
			clinicId,
			specialtyId,
			description,
			address,
			price,
		],
		(err, results) => {
			if (err) {
				return callback(err);
			}
			callback(null, results);
		}
	);
};

let updateADoctorModel = (doctorData, callback) => {
	let values = [
		doctorData.name,
		doctorData.introduction,
		doctorData.clinicId,
		doctorData.specialtyId,
		doctorData.description,
		doctorData.address,
		doctorData.price,
		doctorData.id,
	];
	if (!doctorData.id) {
		let error = new Error(errMsg.missing_input);
		error.statusCode = 400;
		return callback(error);
	}
	db.query(updateDoctorQuery, values, callback);
};

let deleteADoctorModel = (doctorId, callback) => {
	return db.query(deleteDoctorById, doctorId, callback);
};

module.exports = {
	getDoctorByIdModel,
	getAllDoctorsModel,
	createDoctorModel,
	updateADoctorModel,
	deleteADoctorModel,
};
