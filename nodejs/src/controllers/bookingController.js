import bookingModel from "../models/bookingModel";

let bookingAnAppointment = (req, res) => {
	let data = req.body;
	bookingModel.bookingAnAppointmentModel(data, (err, results) => {
		if (err) {
			return res.status(500).send({
				code: 500,
				msg: err.message,
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Successfully !",
		});
	});
};


module.exports = {
	bookingAnAppointment,
}
