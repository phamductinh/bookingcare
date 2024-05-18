import db from "../configs/connectDB";
import serviceModel from "../models/serviceModel";

const getAllService = (req, res) => {
	serviceModel.getAllServiceModel((error, results) => {
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

let getServiceById = (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(400).send({ code: 400, msg: errMsg.missing_input });
	}
	serviceModel.getServiceByIdModel(id, (error, doctor) => {
		if (error) {
			throw error;
		}
		return res.send({
			code: 200,
			data: doctor[0],
		});
	});
};

const getTotalRowService = (req, res) => {
	serviceModel.getTotalRowServiceModel((error, results) => {
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

const getPaginationService = (req, res) => {
	let page = req.query.page ? req.query.page : 1;
	let limit = 4;
	let start = (page - 1) * limit;
	serviceModel.getPaginationServiceModel(start, limit, (error, results) => {
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

let createService = (req, res) => {
	let data = req.body;
	serviceModel.createNewServiceModel(data, (err, results) => {
		if (err) {
			console.log(err);
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

let updateService = (req, res) => {
	let { name, description, descriptionHTML, price, id } = req.body;
	if (!id) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}
	serviceModel.updateServiceModel(
		[name, description, descriptionHTML, price, id],
		(error, results, fields) => {
			if (error) throw error;
			console.log(error);
			return res.send({
				code: 200,
				msg: "Update successfully!",
			});
		}
	);
};

let deleteService = (req, res) => {
	let id = req.query.id;
	if (!id) {
		return res.status(400).send({ code: 400, msg: "Missing id!" });
	}
	serviceModel.deleteServiceModel(id, (error, results, fields) => {
		if (error) throw error;
		return res.send({
			code: 200,
			msg: "Delete successfully!",
		});
	});
};

module.exports = {
	createService,
	getAllService,
	deleteService,
	updateService,
	getTotalRowService,
	getPaginationService,
	getServiceById,
};
