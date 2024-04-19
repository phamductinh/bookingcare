import db from "../configs/connectDB";
import {
	findAllDoctorsQuery,
	findDoctorById,
	createADoctorQuery,
	updateDoctorQuery,
	deleteDoctorById,
	findDoctorIsTelemedicine,
	totalRowDoctor,
	findDoctorBySpecialty,
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

let getTotalRowDoctorModel = (callback) => {
	db.query(totalRowDoctor, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getPaginationDoctorsModel = (start, limit, callback) => {
	let sql = `SELECT * FROM doctor ORDER BY id ASC LIMIT ${start} , ${limit}`;
	db.query(sql, (error, results) => {
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

let getDoctorIsTelemedicineModel = (telemId, callback) => {
	db.query(findDoctorIsTelemedicine, telemId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
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
		image,
		isTelemedicine,
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
			image,
			isTelemedicine,
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

let getDoctorBySpecialtyIdModel = (id, callback) => {
	db.query(findDoctorBySpecialty, id, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

module.exports = {
	getDoctorByIdModel,
	getAllDoctorsModel,
	createDoctorModel,
	updateADoctorModel,
	deleteADoctorModel,
	getDoctorIsTelemedicineModel,
	getTotalRowDoctorModel,
	getPaginationDoctorsModel,
	getDoctorBySpecialtyIdModel,
};
