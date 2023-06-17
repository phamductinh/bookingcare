import bookingModel from "../models/bookingModel";


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

module.exports = {
	bookingAnAppointment,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
    getAllConfirmedBooking,
    finishBooking,
    getAllFinishedBooking
};
