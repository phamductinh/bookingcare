let findAllUsers = `SELECT * FROM user`;

let findUserById = `SELECT * FROM user WHERE id = ?`;

let findByEmail = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`;

let createAUser = `INSERT INTO user (email, password, fullName, address, gender, role, phoneNumber) VALUES (?,?,?,?,?,?,?)`;

let updateUserQuery = `UPDATE user SET fullName = ?, address = ?, gender = ?, role = ?, phoneNumber = ? WHERE id = ?`;

let deleteUserById = `DELETE FROM user WHERE id = ?`;

//Telemedicine
let findAllTelemedicine = "SELECT * FROM telemedicine";

let createTelemedicineQuery = `INSERT INTO telemedicine (name, description, descriptionHTML, image) VALUES (?,?,?,?)`;

let deleteTelemedicineById = `DELETE FROM telemedicine WHERE id = ?`;

//Specialty
let findAllSpecialtyQuery = "SELECT * FROM specialty";

let createNewSpecialtyQuery = `INSERT INTO specialty (name, description, descriptionHTML, image) VALUES (?,?,?,?)`;

let deleteSpecialtyById = `DELETE FROM specialty WHERE id = ?`;

module.exports = {
	findAllUsers,
	findUserById,
	findByEmail,
	createAUser,
	updateUserQuery,
	deleteUserById,
	createTelemedicineQuery,
	findAllTelemedicine,
	findAllSpecialtyQuery,
	createNewSpecialtyQuery,
	deleteSpecialtyById,
	deleteTelemedicineById,
};
