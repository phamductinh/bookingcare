let findAllUsers = `SELECT * FROM user`;

let findUserById = `SELECT * FROM user WHERE id = ?`;

let findByEmail = `SELECT * FROM user WHERE LOWER(email) = LOWER(?)`;

let createAUser = `INSERT INTO user (email, password, fullName, address, gender, role, phoneNumber) VALUES (?,?,?,?,?,?,?)`;

let updateUserQuery = `UPDATE user SET fullName = ?, address = ?, gender = ?, role = ?, phoneNumber = ? WHERE id = ?`;

let updateInforQuery = `UPDATE user SET fullName = ?, address = ?, phoneNumber = ? WHERE id = ?`;

let deleteUserById = `DELETE FROM user WHERE id = ?`;

//doctor
let findAllDoctorsQuery = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image,doctor.specialtyId, specialty.name as specialty, clinic.name as clinic FROM doctor JOIN clinic ON clinic.id = doctor.clinicId JOIN specialty ON specialty.id = doctor.specialtyId`;

let findOutDoctorsQuery = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image,doctor.specialtyId, specialty.name as specialty, clinic.name as clinic, COUNT(booking.id) AS booking_count
FROM doctor JOIN clinic ON clinic.id = doctor.clinicId 
JOIN specialty ON specialty.id = doctor.specialtyId 
LEFT JOIN booking ON doctor.id = booking.doctorId
GROUP BY doctor.id, doctor.name
ORDER BY booking_count DESC
LIMIT 6`;

let findDoctorById = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name as specialty, clinic.name as clinic FROM doctor JOIN clinic ON clinic.id = doctor.clinicId JOIN specialty ON specialty.id = doctor.specialtyId WHERE doctor.id = ?`;

let findDoctorBySpecialty = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name AS specialty, clinic.name AS clinic
FROM doctor
JOIN clinic ON clinic.id = doctor.clinicId
JOIN specialty ON doctor.specialtyId = specialty.id
JOIN doctor_specialty ON doctor_specialty.doctorId = doctor.id
WHERE doctor_specialty.specialtyId = ?`;

let findDoctorIsTelemedicine = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name as specialty, clinic.name as clinic
FROM doctor
JOIN clinic ON clinic.id = doctor.clinicId
JOIN specialty ON specialty.id = doctor.specialtyId
JOIN doctor_telemedicine ON doctor_telemedicine.doctorId = doctor.id
WHERE doctor_telemedicine.telemId = ?`;

let findDoctorByServiceId = `SELECT doctor.id, doctor.name, doctor.introduction, doctor.description, doctor.address, doctor.price, doctor.image, specialty.name AS specialty, clinic.name AS clinic
FROM doctor
JOIN clinic ON clinic.id = doctor.clinicId
JOIN specialty ON doctor.specialtyId = specialty.id
JOIN doctor_service ON doctor_service.doctorId = doctor.id
WHERE doctor_service.serviceId = ?`;

let createADoctorQuery = `INSERT INTO doctor (name, introduction, clinicId, specialtyId, description, address, price, image, telemId) VALUES (?,?,?,?,?,?,?,?,?)`;

let updateDoctorQuery = `UPDATE doctor SET name = ?, introduction = ?, clinicId = ?, specialtyId = ?, description = ?, address = ?, price = ?, image = ?, telemId = ? WHERE id = ?`;

let deleteDoctorById = `DELETE FROM doctor WHERE id = ?`;

let createAFeedbackQuery = `INSERT INTO review (doctorId, comment, userId) VALUES (?,?,?)`;

let getFeedbackByDoctorIdQuery = `SELECT review.*, user.fullName FROM review JOIN user ON user.id = review.userId WHERE doctorId = ?`;

let updateFeedbackQuery = `UPDATE review SET comment = ? WHERE id = ?`;

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

let findSpecialtyById = `SELECT * FROM specialty WHERE id = ?`;

//Service
let findAllServiceQuery = "SELECT * FROM service";

let findServiceById = `SELECT * FROM service WHERE id = ?`;

let createNewServiceQuery = `INSERT INTO service (name, description, descriptionHTML, price) VALUES (?,?,?,?)`;

let updateServiceQuery =
	"UPDATE service SET name = ?, description = ?, descriptionHTML = ?, price = ? WHERE id = ?";

let deleteServiceById = `DELETE FROM service WHERE id = ?`;

let findBookedAppointmentQuery =
	"SELECT * from booking WHERE booking_date = ? AND booking_time = ?";

let bookingAnAppointmentQuery = `INSERT INTO booking (userId, doctorId, booking_date, booking_time,fullName, gender, phoneNumber, birthday, address, reason, status, isTelemedicine, exam_time, idRoom, bookId) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)`;

let getBookingByDateQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
FROM booking
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE status = 'Pending' AND booking_date = ?`;

let getBookingByDateAndTimeQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
FROM booking
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE booking_date = ? AND booking_time = ?`;

let getBookingByUserIdQuery = `SELECT booking.*, user.email as patientEmail
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE user.id = ?`;

let getBookingByBookIdQuery = `SELECT booking.*, user.email as patientEmail
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE bookId = ?`;

let getEmailPatientsQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
FROM booking
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE status = 'Confirmed' AND isTelemedicine = 1`;

let getTelemedicineBookingByDateQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE isTelemedicine = 1 AND status = 'Confirmed' AND booking_date = ?`;

let findAllConfirmedBookingQuery = `SELECT * FROM booking WHERE isTelemedicine <> 1 AND status = 'Confirmed'`;

let findAllConfirmedTelemedicineBookingQuery = `SELECT booking.*, user.email as patientEmail, doctor.name as doctorName 
FROM booking 
JOIN user ON user.id = booking.userId
JOIN doctor ON doctor.id = booking.doctorId
WHERE isTelemedicine = 1 AND status = 'Confirmed'`;

let findAllPendingBookingQuery = `SELECT * FROM booking WHERE isTelemedicine <> 1 AND status = 'Pending'`;

let findAllFinishedBookingQuery = `SELECT * FROM booking WHERE status = 'Done'`;

let confirmBookingQuery = `UPDATE booking SET status = 'Confirmed' WHERE id = ?`;

let confirmBookingByBookIdQuery = `UPDATE booking SET status = 'Confirmed' WHERE bookId = ?`;

let finishBookingQuery = `UPDATE booking SET status = 'Done' WHERE id = ?`;

let deleteBookingById = `DELETE FROM booking WHERE id = ?`;

let deleteBookingByBookId = `DELETE FROM booking WHERE bookId = ?`;

let createRoomQuery = `INSERT INTO room (code, status) VALUES (?,?)`;

let findRoomByCode = `SELECT * FROM room WHERE code = ?`;

let deleteReviewById = `DELETE FROM review WHERE id = ?`;

let totalRowUser = `SELECT COUNT(*) as totalRow FROM user`;
let totalRowDoctor = `SELECT COUNT(*) as totalRow FROM doctor`;
let totalRowSpecialty = `SELECT COUNT(*) as totalRow FROM specialty`;
let totalRowTelemedicine = `SELECT COUNT(*) as totalRow FROM telemedicine`;
let totalRowReview = `SELECT COUNT(*) as totalRow FROM review`;
let totalRowService = `SELECT COUNT(*) as totalRow FROM service`;

module.exports = {
	findAllConfirmedTelemedicineBookingQuery,
	findAllPendingBookingQuery,
	getBookingByDateAndTimeQuery,
	findServiceById,
	findAllServiceQuery,
	createNewServiceQuery,
	updateServiceQuery,
	deleteServiceById,
	totalRowService,
	updateInforQuery,
	getBookingByUserIdQuery,
	deleteReviewById,
	totalRowReview,
	findDoctorBySpecialty,
	totalRowTelemedicine,
	totalRowSpecialty,
	totalRowDoctor,
	totalRowUser,
	getEmailPatientsQuery,
	getTelemedicineBookingByDateQuery,
	findDoctorIsTelemedicine,
	findRoomByCode,
	createRoomQuery,
	findAllFinishedBookingQuery,
	finishBookingQuery,
	findAllConfirmedBookingQuery,
	deleteBookingById,
	confirmBookingQuery,
	getBookingByDateQuery,
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
	findBookedAppointmentQuery,
	bookingAnAppointmentQuery,
	findDoctorByServiceId,
	createAFeedbackQuery,
	getFeedbackByDoctorIdQuery,
	updateFeedbackQuery,
	confirmBookingByBookIdQuery,
	deleteBookingByBookId,
	findSpecialtyById,
	getBookingByBookIdQuery,
	findOutDoctorsQuery,
};
