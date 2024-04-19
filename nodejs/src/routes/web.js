import express from "express";
import telemedicineController from "../controllers/telemedicineController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import doctorController from "../controllers/doctorController";
import clinicController from "../controllers/clinicController";
import bookingController from "../controllers/bookingController";
import videoCallController from "../controllers/videoCallController";
import reviewController from "../controllers/reviewController";
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
	router.put("/api/change-password", authController.changePassword);

	router.get("/api/users", verifyJWT, userController.getAllUsers);
	router.get("/api/get-user", userController.getUser);
	router.get("/api/get-pagination-users", userController.getPaginationUsers);
	router.get(
		"/api/get-total-row-user",

		userController.getTotalRowUser
	);
	router.post("/api/create-user", userController.createUser);
	router.put("/api/edit-user", verifyJWT, userController.updateUser);
	router.put("/api/update-infor-user", userController.updateInforUser);
	router.delete("/api/delete-user", verifyJWT, userController.deleteUser);

	router.get("/api/get-all-doctors", doctorController.getAllDoctors);
	router.get(
		"/api/get-pagination-doctors",
		doctorController.getPaginationDoctors
	);
	router.get(
		"/api/get-total-row-doctor",

		doctorController.getTotalRowDoctor
	);
	router.get("/api/get-a-doctor", doctorController.getADoctor);
	router.get(
		"/api/get-doctor-by-keyword",
		doctorController.getDoctorByKeyword
	);
	router.get(
		"/api/get-doctor-is-telemedicine",
		doctorController.getDoctorIsTelemedicine
	);
	router.get(
		"/api/get-doctor-by-specialtyId",
		doctorController.getDoctorBySpecialtyId
	);
	router.post("/api/create-doctor", authApi, doctorController.createADoctor);
	router.put("/api/update-doctor", authApi, doctorController.updateADoctor);
	router.delete(
		"/api/delete-doctor",
		verifyJWT,
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
		verifyJWT,
		telemedicineController.deleteTelemedicine
	);
	router.put(
		"/api/update-telemedicine",
		authApi,
		telemedicineController.updateTelemedicine
	);
	router.get(
		"/api/get-pagination-telemedicine",

		telemedicineController.getPaginationTelemedicine
	);
	router.get(
		"/api/get-total-row-telemedicine",

		telemedicineController.getTotalRowTelemedicine
	);

	router.get("/api/get-all-specialty", specialtyController.getAllSpecialty);
	router.post(
		"/api/create-specialty",
		authApi,
		specialtyController.createSpecialty
	);
	router.delete(
		"/api/delete-specialty",
		verifyJWT,
		specialtyController.deleteSpecialty
	);
	router.put(
		"/api/update-specialty",
		authApi,
		specialtyController.updateSpecialty
	);
	router.get(
		"/api/get-pagination-specialty",

		specialtyController.getPaginationSpecialty
	);
	router.get(
		"/api/get-total-row-specialty",

		specialtyController.getTotalRowSpecialty
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
		"/api/get-booking-by-userId",
		bookingController.getBookingByUserId
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
		verifyJWT,
		bookingController.deleteBooking
	);
	router.delete("/api/cancel-booking", bookingController.deleteBooking);

	router.get(
		"/api/get-pagination-review",
		reviewController.getPaginationReviews
	);
	router.get("/api/get-total-row-review", reviewController.getTotalRowReview);
	router.delete(
		"/api/delete-review",
		verifyJWT,
		reviewController.deleteReview
	);

	router.get("/api/get-room", videoCallController.getRoom);
	router.post("/api/create-room", videoCallController.createRoom);

	return app.use("/", router);
};

module.exports = initWebRoutes;
