import db from "../configs/connectDB";
import {
	findAllClinicsQuery,
} from "../database/queries";
import { errMsg } from "../utils/resMsg";

let getAllClinicsModel = (callback) => {
	db.query(findAllClinicsQuery, (error, results) => {
		if (error) {
			callback(error, null);
		} else {
			callback(null, results);
		}
	});
};

module.exports = {
	getAllClinicsModel,
	
};
