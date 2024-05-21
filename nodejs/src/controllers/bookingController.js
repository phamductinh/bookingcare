import bookingModel from "../models/bookingModel";
import db from "../configs/connectDB";
import emailService from "../services/emailService";
import moment from "moment";

const getAllConfirmedBooking = (req, res) => {
	bookingModel.getAllConfirmedBookingModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Error fetch data !",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

const getAllConfirmedTelemedicineBooking = (req, res) => {
	bookingModel.getAllConfirmedTelemedicineBookingModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Error fetch data !",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

const getAllPendingBooking = (req, res) => {
	bookingModel.getAllPendingBookingModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Error fetch data !",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

let getBookingByUserId = (req, res) => {
	let userId = req.query.userId;
	if (!userId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	bookingModel.getBookingByUserIdModel(userId, (error, results) => {
		if (error) {
			return res
				.status(500)
				.send({ code: 500, msg: "Internal server error" });
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let getBookingByBookId = (req, res) => {
	let bookId = req.query.bookId;
	if (!bookId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	bookingModel.getBookingByBookIdModel(bookId, (error, results) => {
		if (error) {
			return res
				.status(500)
				.send({ code: 500, msg: "Internal server error" });
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

const getAllFinishedBooking = (req, res) => {
	bookingModel.getAllFinishedBookingModel((error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Error fetch data !",
			});
		} else {
			return res.status(200).send({
				code: 200,
				data: results,
			});
		}
	});
};

const confirmBooking = (req, res) => {
	let bookingId = req.query.id;
	if (!bookingId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}
	bookingModel.confirmBookingModel(bookingId, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Confirm failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				msg: "Successfully!",
			});
		}
	});
};

const confirmBookingByBookId = (req, res) => {
	let bookId = req.query.bookId;
	if (!bookId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}
	bookingModel.confirmBookingByBookIdModel(bookId, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Confirm failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				msg: "Successfully!",
			});
		}
	});
};

const finishBooking = (req, res) => {
	let bookingId = req.query.id;
	if (!bookingId) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}
	bookingModel.finishBookingModel(bookingId, (error, results) => {
		if (error) {
			return res.status(500).send({
				code: 500,
				msg: "Update failed!",
			});
		} else {
			return res.status(200).send({
				code: 200,
				msg: "Successfully!",
			});
		}
	});
};

let bookingAnAppointment = (req, res) => {
	let data = req.body;
	bookingModel.bookingAnAppointmentModel(data, (err, results) => {
		if (err) {
			console.log(err);
			return res.status(500).send({
				code: 500,
				msg: "Bác sĩ không rảnh vào thời gian này. Vui lòng chọn khoảng thời gian khác!",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Successfully !",
		});
	});
};

let getBookingByDate = (req, res) => {
	let date = req.query.booking_date;
	if (!date) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	bookingModel.getBookingByDateModel(date, (error, results) => {
		if (error) {
			console.log(error);
			return res
				.status(500)
				.send({ code: 500, msg: "Internal server error" });
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let getBookingByDateAndTime = (req, res) => {
	let date = req.query.booking_date;
	let time = req.query.booking_time;
	if (!date || !time) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	let getBookingByDateAndTimeQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
                                        FROM booking
                                        JOIN user ON user.id = booking.userId
                                        JOIN doctor ON doctor.id = booking.doctorId
                                        WHERE booking_date = '${date}' AND booking_time = '${time}'`;

	db.query(getBookingByDateAndTimeQuery, (error, results) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let getTelemedicineBookingByDate = (req, res) => {
	let date = req.query.booking_date;
	if (!date) {
		return res.status(400).send({ code: 400, msg: "Missing input!" });
	}

	bookingModel.getTelemedicineBookingByDateModel(date, (error, results) => {
		if (error) {
			console.log(error);
			return res
				.status(500)
				.send({ code: 500, msg: "Internal server error" });
		}
		return res.send({
			code: 200,
			data: results,
		});
	});
};

let deleteBooking = (req, res) => {
	let bookingId = req.query.id;
	if (!bookingId) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}

	bookingModel.deleteBookingModel(bookingId, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: "Delete successfully!",
		});
	});
};

let deleteBookingByBookId = (req, res) => {
	let bookId = req.query.bookId;
	if (!bookId) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}

	bookingModel.deleteBookingByBookIdModel(
		bookId,
		(error, results, fields) => {
			if (error) throw error;
			return res.send({
				code: 200,
				msg: "Delete successfully!",
			});
		}
	);
};

let sendSuccessBookingEmail = async (req, res) => {
	let bookId = req.query.bookId;
	if (!bookId) {
		return res.status(500).send({
			code: 500,
			msg: "Missing bookId!",
		});
	}
	db.query(
		`SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
        FROM booking 
        JOIN user ON user.id = booking.userId
        JOIN doctor ON doctor.id = booking.doctorId
        WHERE bookId = "${bookId}"`,
		async (err, result) => {
			if (err) {
				throw err;
			}
			const date = moment(result[0].booking_date / 1).format(
				"YYYY-MM-DD"
			);
			if (result[0].isTelemedicine === 1) {
				await emailService.sendTelemedicineEmail({
					receiverEmail: result[0].patientEmail,
					fullName: result[0].fullName,
					booking_date: date,
					booking_time: result[0].booking_time,
					exam_time: result[0].exam_time,
					doctorName: result[0].doctorName,
					idRoom: result[0].idRoom,
				});
			} else {
				await emailService.sendSimpleEmail({
					receiverEmail: result[0].patientEmail,
					fullName: result[0].fullName,
					booking_date: date,
					booking_time: result[0].booking_time,
					doctorName: result[0].doctorName,
				});
			}
			return res.status(200).send({
				code: 200,
				msg: "Gửi email xác nhận thành công!",
			});
		}
	);
};

let sendFailBookingEmail = async (req, res) => {
	let bookId = req.query.bookId;
	if (!bookId) {
		return res.status(500).send({
			code: 500,
			msg: "Missing bookId!",
		});
	}
	db.query(
		`SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
        FROM booking 
        JOIN user ON user.id = booking.userId
        JOIN doctor ON doctor.id = booking.doctorId
        WHERE bookId = "${bookId}"`,
		async (err, result) => {
			if (err) {
				throw err;
			}
			await emailService.sendDeclineEmail({
				receiverEmail: result[0].patientEmail,
				fullName: result[0].fullName,
			});
			return res.status(200).send({
				code: 200,
				msg: "Gửi email xác nhận thành công!",
			});
		}
	);
};

module.exports = {
	bookingAnAppointment,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
	getAllConfirmedBooking,
	finishBooking,
	getAllFinishedBooking,
	getTelemedicineBookingByDate,
	getBookingByUserId,
	getBookingByDateAndTime,
	confirmBookingByBookId,
	deleteBookingByBookId,
	getBookingByBookId,
	sendSuccessBookingEmail,
	sendFailBookingEmail,
	getAllPendingBooking,
	getAllConfirmedTelemedicineBooking,
};
