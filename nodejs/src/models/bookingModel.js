import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import {
	findBookedAppointmentQuery,
	bookingAnAppointmentQuery,
	getBookingByDateQuery,
	confirmBookingQuery,
	deleteBookingById,
} from "../database/queries";
import emailService from "../services/emailService";

let confirmBookingModel = async (bookingId, callback) => {
	await emailService.sendSimpleEmail({
		receiverEmail: "phamductinh.t18@gmail.com",
		fullName: "Pham Duc Tinh",
		booking_time: "7:00",
		doctorName: "Pham Duc Tinh",
	});
	db.query(confirmBookingQuery, bookingId, (error, results) => {
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
	} = data;
	if (!userId || !doctorId || !booking_date || !booking_time || !fullName) {
		let error = new Error("Missing input!");
		error.statusCode = 400;
		return callback(error);
	}

	db.query(
		findBookedAppointmentQuery,
		[booking_date, booking_time],
		(err, result) => {
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

let deleteBookingModel = async (bookingId, callback) => {
	await emailService.sendDeclineEmail({
		receiverEmail: "phamductinh.t18@gmail.com",
		fullName: "Pham Duc Tinh",
	});
	return db.query(deleteBookingById, [bookingId], callback);
};

module.exports = {
	bookingAnAppointmentModel,
	getBookingByDateModel,
	confirmBookingModel,
	deleteBookingModel,
};
