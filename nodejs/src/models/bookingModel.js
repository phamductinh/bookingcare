import db from "../configs/connectDB";
import bcrypt from "bcryptjs";
import {
	findBookedAppointmentQuery,
	bookingAnAppointmentQuery,
} from "../database/queries";

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

module.exports = {
	bookingAnAppointmentModel,
};
