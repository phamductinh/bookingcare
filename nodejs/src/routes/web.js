import express from "express";
import telemedicineController from "../controllers/telemedicineController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import doctorController from "../controllers/doctorController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import { verifyJWT } from "../middlewares/verifyJWT";

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);

	router.get("/api/users", verifyJWT, userController.getAllUsers);
	router.get("/api/get-user", verifyJWT, userController.getUser);
	router.post("/api/create-user", userController.createUser);
	router.put("/api/edit-user", verifyJWT, userController.updateUser);
	router.delete("/api/delete-user", verifyJWT, userController.deleteUser);

	router.get("/api/get-all-doctors", doctorController.getAllDoctors);
	router.get("/api/get-a-doctor", doctorController.getADoctor);
	router.post("/api/create-doctor", doctorController.createADoctor);
	router.put("/api/update-doctor", doctorController.updateADoctor);
	router.delete("/api/delete-doctor", doctorController.deleteDoctor);

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
		telemedicineController.createTelemedicine
	);
	router.delete(
		"/api/delete-telemedicine",
		telemedicineController.deleteTelemedicine
	);
	router.put(
		"/api/update-telemedicine",
		telemedicineController.updateTelemedicine
	);

	router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
	router.post("/api/create-specialty", specialtyController.createSpecialty);
	router.delete(
		"/api/delete-telemedicine",
		specialtyController.deleteSpecialty
	);
	router.put("/api/update-specialty", specialtyController.updateSpecialty);

	router.get("/api/get-all-clinics", clinicController.getAllClinics);

	router.post(
		"/api/booking-an-appointment",
		bookingController.bookingAnAppointment
	);
	router.get("/api/get-booking-by-date", bookingController.getBookingByDate);
	router.put("/api/confirm-booking", bookingController.confirmBooking);
	router.delete("/api/delete-booking", bookingController.deleteBooking);

	return app.use("/", router);
};

module.exports = initWebRoutes;
