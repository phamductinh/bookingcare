import axios from "../axios";

const bookingAnAppointmentService = (data) => {
	return axios.post("/api/booking-an-appointment", data);
};

const getAllConfirmedBooking = () => {
	return axios.get(`/api/get-all-confirmed-booking`);
};

const getAllConfirmedTelemedicineBooking = () => {
	return axios.get(`/api/get-all-confirmed-telemedicine-booking`);
};

const getAllPendingBooking = () => {
	return axios.get(`/api/get-all-pending-booking`);
};

const getAllFinishedBooking = () => {
	return axios.get(`/api/get-all-finished-booking`);
};

const getBookingByDate = (date) => {
	return axios.get(`/api/get-booking-by-date?booking_date=${date}`);
};
const getBookingByBookId = (bookId) => {
	return axios.get(`/api/get-booking-by-bookId?bookId=${bookId}`);
};
const getBookingByDateAndTime = (date, time) => {
	return axios.get(
		`/api/get-booking-by-date-and-time?booking_date=${date}&booking_time=${time}`
	);
};

const getTelemedicineBookingByDate = (date) => {
	return axios.get(
		`/api/get-telemedicine-booking-by-date?booking_date=${date}`
	);
};

const confirmBooking = (bookingId) => {
	return axios.put(`/api/confirm-booking?id=${bookingId}`);
};

const confirmBookingByBookId = (bookId) => {
	return axios.put(`/api/confirm-booking-by-bookId?bookId=${bookId}`);
};

const finishBooking = (bookingId) => {
	return axios.put(`/api/finish-booking?id=${bookingId}`);
};

const deleteBooking = (bookingId) => {
	return axios.delete(`/api/delete-booking?id=${bookingId}`);
};

const cancelBooking = (bookingId) => {
	return axios.delete(`/api/cancel-booking?id=${bookingId}`);
};

const deleteBookingByBookId = (bookId) => {
	return axios.delete(`/api/delete-booking-by-bookId?bookId=${bookId}`);
};

const getBookingByUserId = (userId) => {
	return axios.get(`/api/get-booking-by-userId?userId=${userId}`);
};

const sendSuccessBookingEmail = (bookId) => {
	return axios.post(`/api/send-success-booking-email?bookId=${bookId}`);
};

const sendFailBookingEmail = (bookId) => {
	return axios.post(`/api/send-fail-booking-email?bookId=${bookId}`);
};

const checkoutBooking = (body) => {
	return axios.post("/api/payment", body);
};

export {
	bookingAnAppointmentService,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
	getAllConfirmedBooking,
	finishBooking,
	getAllFinishedBooking,
	getTelemedicineBookingByDate,
	cancelBooking,
	getBookingByUserId,
	checkoutBooking,
	getBookingByDateAndTime,
	confirmBookingByBookId,
	deleteBookingByBookId,
	getBookingByBookId,
	sendSuccessBookingEmail,
	sendFailBookingEmail,
	getAllPendingBooking,
    getAllConfirmedTelemedicineBooking
};
