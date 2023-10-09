import express from "express";
import telemedicineController from "../controllers/telemedicineController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import doctorController from "../controllers/doctorController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import videoCallController from "../controllers/videoCallController";
import {
	verifyJWT,
	authApi,
	authApiDoctor,
	authApiOwner,
} from "../middlewares/verifyJWT";

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);

	router.get("/api/users", verifyJWT, userController.getAllUsers);
	router.get("/api/get-user", verifyJWT, userController.getUser);
	router.get(
		"/api/get-pagination-users",

		userController.getPaginationUsers
	);
	router.get(
		"/api/get-total-row-user",

		userController.getTotalRowUser
	);
	router.post("/api/create-user", userController.createUser);
	router.put("/api/edit-user", verifyJWT, userController.updateUser);
	router.delete("/api/delete-user", authApiOwner, userController.deleteUser);

	router.get("/api/get-all-doctors", doctorController.getAllDoctors);
	router.get("/api/get-a-doctor", doctorController.getADoctor);
	router.get(
		"/api/get-doctor-by-keyword",
		doctorController.getDoctorByKeyword
	);
	router.get(
		"/api/get-doctor-is-telemedicine",
		doctorController.getDoctorIsTelemedicine
	);
	router.post("/api/create-doctor", authApi, doctorController.createADoctor);
	router.put("/api/update-doctor", authApi, doctorController.updateADoctor);
	router.delete(
		"/api/delete-doctor",
		authApiOwner,
		doctorController.deleteDoctor
	);

	router.get(
		"/api/get-all-telemedicine",
		telemedicineController.getAllTelemedicine
	);
	router.get(
		"/api/get-telemedicine",
		telemedicineController.getTelemedicineById
	);
	router.post(
		"/api/create-telemedicine",
		authApi,
		telemedicineController.createTelemedicine
	);
	router.delete(
		"/api/delete-telemedicine",
		authApiOwner,
		telemedicineController.deleteTelemedicine
	);
	router.put(
		"/api/update-telemedicine",
		authApi,
		telemedicineController.updateTelemedicine
	);

	router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
	router.post(
		"/api/create-specialty",
		authApi,
		specialtyController.createSpecialty
	);
	router.delete(
		"/api/delete-telemedicine",
		authApiOwner,
		specialtyController.deleteSpecialty
	);
	router.put(
		"/api/update-specialty",
		authApi,
		specialtyController.updateSpecialty
	);

	router.get("/api/get-all-clinics", clinicController.getAllClinics);

	router.post(
		"/api/booking-an-appointment",
		bookingController.bookingAnAppointment
	);
	router.get("/api/get-booking-by-date", bookingController.getBookingByDate);
	router.get(
		"/api/get-telemedicine-booking-by-date",
		bookingController.getTelemedicineBookingByDate
	);
	router.get(
		"/api/get-all-confirmed-booking",
		bookingController.getAllConfirmedBooking
	);
	router.get(
		"/api/get-all-finished-booking",
		bookingController.getAllFinishedBooking
	);
	router.put(
		"/api/confirm-booking",
		authApiDoctor,
		bookingController.confirmBooking
	);
	router.put(
		"/api/finish-booking",
		authApiDoctor,
		bookingController.finishBooking
	);
	router.delete(
		"/api/delete-booking",
		authApiOwner,
		bookingController.deleteBooking
	);

	router.get("/api/get-room", videoCallController.getRoom);
	router.post("/api/create-room", videoCallController.createRoom);

	return app.use("/", router);
};

module.exports = initWebRoutes;
