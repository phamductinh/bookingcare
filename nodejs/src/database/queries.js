let findAllUsers = `SELECT * FROM user`;

let findUserById = `SELECT * FROM user WHERE id = ?`;

let findByEmail = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`;

let createAUser = `INSERT INTO user (email, password, fullName, address, gender, role, phoneNumber) VALUES (?,?,?,?,?,?,?)`;

let updateUserQuery = `UPDATE user SET fullName = ?, address = ?, gender = ?, role = ?, phoneNumber = ? WHERE id = ?`;

let deleteUserById = `DELETE FROM user WHERE id = ?`;

//doctor
let findAllDoctorsQuery = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image,doctor.specialtyId, specialty.name as specialty, clinic.name as clinic FROM doctor JOIN clinic ON clinic.id = doctor.clinicId JOIN specialty ON specialty.id = doctor.specialtyId`;

let findDoctorById = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name as specialty, clinic.name as clinic FROM doctor JOIN clinic ON clinic.id = doctor.clinicId JOIN specialty ON specialty.id = doctor.specialtyId WHERE doctor.id = ?`;

let createADoctorQuery = `INSERT INTO doctor (name, introduction, clinicId, specialtyId, description, address, price, image) VALUES (?,?,?,?,?,?,?,?)`;

let updateDoctorQuery = `UPDATE doctor SET name = ?, introduction = ?, clinicId = ?, specialtyId = ?, description = ?, address = ?, price = ? WHERE id = ?`;

let deleteDoctorById = `DELETE FROM doctor WHERE id = ?`;

//Telemedicine
let findAllTelemedicine = "SELECT * FROM telemedicine";

let findTelemedicineById = `SELECT * FROM telemedicine WHERE id = ?`;

let createTelemedicineQuery = `INSERT INTO telemedicine (name, description, descriptionHTML, image) VALUES (?,?,?,?)`;

let updateTelemedicineQuery =
	"UPDATE telemedicine SET name = ?, description = ?, descriptionHTML = ?, image = ? WHERE id = ?";

let deleteTelemedicineById = `DELETE FROM telemedicine WHERE id = ?`;

//Specialty
let findAllSpecialtyQuery = "SELECT * FROM specialty";

let createNewSpecialtyQuery = `INSERT INTO specialty (name, description, descriptionHTML, image) VALUES (?,?,?,?)`;

let updateSpecialtyQuery =
	"UPDATE specialty SET name = ?, description = ?, descriptionHTML = ?, image = ? WHERE id = ?";

let deleteSpecialtyById = `DELETE FROM specialty WHERE id = ?`;

let findAllClinicsQuery = "SELECT * FROM clinic";

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
	updateTelemedicineQuery,
	updateSpecialtyQuery,
	findTelemedicineById,
	findAllDoctorsQuery,
	findDoctorById,
	createADoctorQuery,
	updateDoctorQuery,
	deleteDoctorById,
	findAllClinicsQuery,
};
