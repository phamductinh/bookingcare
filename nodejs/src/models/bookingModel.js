import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import {
	findBookedAppointmentQuery,
	bookingAnAppointmentQuery,
	getBookingByDateQuery,
	confirmBookingQuery,
	deleteBookingById,
	findAllConfirmedBookingQuery,
	finishBookingQuery,
	findAllFinishedBookingQuery,
	getTelemedicineBookingByDateQuery,
	getBookingByUserIdQuery,
} from "../database/queries";
import emailService from "../services/emailService";

let getAllConfirmedBookingModel = (callback) => {
	db.query(findAllConfirmedBookingQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let getBookingByUserIdModel = (userId, callback) => {
	db.query(getBookingByUserIdQuery, userId, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let getAllFinishedBookingModel = (callback) => {
	db.query(findAllFinishedBookingQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

let confirmBookingModel = async (bookingId, callback) => {
	db.query(confirmBookingQuery, bookingId, (error, results) => {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
};

let finishBookingModel = async (bookingId, callback) => {
	db.query(finishBookingQuery, bookingId, (error, results) => {
		if (error) {
			callback(error);
		} else {
			callback(null, results);
		}
	});
};

let bookingAnAppointmentModel = (data, callback) => {
	let {
		userId,
		doctorId,
		booking_date,
		booking_time,
		fullName,
		gender,
		phoneNumber,
		birthday,
		address,
		reason,
		status = "Pending",
		isTelemedicine,
		exam_time,
		idRoom,
	} = data;
	if (!userId || !doctorId || !booking_date || !booking_time || !fullName) {
		let error = new Error("Missing input!");
		error.statusCode = 400;
		return callback(error);
	}

	db.query(
		findBookedAppointmentQuery,
		[booking_date, booking_time],
		async (err, result) => {
			if (err) {
				return callback(err);
			}

			if (result.length) {
				let error = new Error(
					"Bác sĩ không rảnh vào thời gian này. Vui lòng chọn khoảng thời gian khác!"
				);
				error.statusCode = 409;
				return callback(error);
			}
			if (isTelemedicine == 1) {
				await emailService.sendTelemedicineEmail({
					receiverEmail: data.receiverEmail,
					fullName: data.fullName,
					booking_date: data.booking_date_formated,
					booking_time: data.booking_time,
					exam_time: data.exam_time,
					doctorName: data.doctorName,
					idRoom: data.idRoom,
				});
			} else {
				await emailService.sendSimpleEmail({
					receiverEmail: data.receiverEmail,
					fullName: data.fullName,
					booking_date: data.booking_date_formated,
					booking_time: data.booking_time,
					doctorName: data.doctorName,
				});
			}

			db.query(
				bookingAnAppointmentQuery,
				[
					userId,
					doctorId,
					booking_date,
					booking_time,
					fullName,
					gender,
					phoneNumber,
					birthday,
					address,
					reason,
					status,
					isTelemedicine,
					exam_time,
					idRoom,
				],
				(err, results) => {
					if (err) {
						return callback(err);
					}
					callback(null, results);
				}
			);
		}
	);
};

let getBookingByDateModel = (date, callback) => {
	db.query(getBookingByDateQuery, date, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};
let getTelemedicineBookingByDateModel = (date, callback) => {
	db.query(getTelemedicineBookingByDateQuery, date, (error, results) => {
		if (error) {
			return callback(error);
		}
		return callback(null, results);
	});
};

let deleteBookingModel = async (bookingId, callback) => {
	// await emailService.sendDeclineEmail({
	// 	receiverEmail: "phamductinh.t18@gmail.com",
	// 	fullName: "Pham Duc Tinh",
	// });
	return db.query(deleteBookingById, [bookingId], callback);
};

module.exports = {
	bookingAnAppointmentModel,
	getBookingByDateModel,
	confirmBookingModel,
	deleteBookingModel,
	getAllConfirmedBookingModel,
	finishBookingModel,
	getAllFinishedBookingModel,
	getTelemedicineBookingByDateModel,
	getBookingByUserIdModel,
};
