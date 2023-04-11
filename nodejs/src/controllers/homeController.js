import db from "../configs/connectDB";
import homeModel from "../models/homeModel";

let getHomePage = (req, res) => {
	return res.send("hello");
};

let createTelemedicine = (req, res) => {
	let data = req.body;
	homeModel.createTelemedicine(data, (err, results) => {
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
	getHomePage,
	createTelemedicine,
};
