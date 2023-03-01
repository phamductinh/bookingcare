import db from "../configs/connectDB";

const getAllUsers = (callback) => {
	db.query("SELECT * FROM user", callback);
};

const getUserById = (userId, callback) => {
	db.query("SELECT * FROM user WHERE id = ?", userId, callback);
};

module.exports = {
	getUserById,
	getAllUsers,
};
