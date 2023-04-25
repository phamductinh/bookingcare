import db from "../configs/connectDB";
import specialtyModel from "../models/specialtyModel";

const getAllSpecialty = (req, res) => {
	specialtyModel.getAllSpecialtyModel((error, results) => {
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

let createSpecialty = (req, res) => {
	let data = req.body;
	let file = req.files.image;
	specialtyModel.createNewSpecialtyModel(data, file, (err, results) => {
		if (err) {
			return res.status(400).send({
				code: 400,
				msg: "Something wrong !",
			});
		}
		return res.status(200).send({
			code: 200,
			msg: "Create successfully !",
		});
	});
};

module.exports = {
	createSpecialty,
	getAllSpecialty,
};
