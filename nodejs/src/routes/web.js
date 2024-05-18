import express from "express";
import telemedicineController from "../controllers/telemedicineController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import specialtyController from "../controllers/specialtyController";
import serviceController from "../controllers/serviceController";
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
import PaymentController from "../controllers/paymentController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);
	router.put("/api/change-password", authController.changePassword);
	router.put("/api/reset-password", authController.resetPassword);
	router.post(
		"/api/send-email-reset-password",
		authController.sendResetPasswordEmail
	);

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
	router.get(
		"/api/get-doctor-by-serviceId",
		doctorController.getDoctorByServiceId
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
	router.get(
		"/api/get-specialty-by-id",
		specialtyController.getSpecialtyById
	);
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

	router.get("/api/get-all-service", serviceController.getAllService);
	router.get("/api/get-service-by-id", serviceController.getServiceById);
	router.post("/api/create-service", serviceController.createService);
	router.delete("/api/delete-service", serviceController.deleteService);
	router.put("/api/update-service", serviceController.updateService);
	router.get(
		"/api/get-pagination-service",
		serviceController.getPaginationService
	);
	router.get(
		"/api/get-total-row-service",
		serviceController.getTotalRowService
	);

	router.get("/api/get-all-clinics", clinicController.getAllClinics);

	router.post(
		"/api/booking-an-appointment",
		bookingController.bookingAnAppointment
	);
	router.get("/api/get-booking-by-date", bookingController.getBookingByDate);
	router.get(
		"/api/get-booking-by-date-and-time",
		bookingController.getBookingByDateAndTime
	);
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
		"/api/confirm-booking-by-bookId",
		bookingController.confirmBookingByBookId
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
	router.delete(
		"/api/delete-booking-by-bookId",
		bookingController.deleteBookingByBookId
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
	router.delete("/api/delete-feedback", reviewController.deleteReview);
	router.get(
		"/api/get-feedback-by-doctorId",
		reviewController.getFeedbackByDoctorId
	);
	router.post("/api/create-feedback", reviewController.createAFeedback);
	router.put("/api/update-feedback", reviewController.updateFeedback);

	router.get("/api/get-room", videoCallController.getRoom);
	router.post("/api/create-room", videoCallController.createRoom);
	router.post("/api/payment", PaymentController.getUrlPay);

	return app.use("/", router);
};

module.exports = initWebRoutes;
