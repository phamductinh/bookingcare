import axios from "../axios";

const bookingAnAppointmentService = (data) => {
	return axios.post("/api/booking-an-appointment", data);
};

const getAllConfirmedBooking = () => {
	return axios.get(`/api/get-all-confirmed-booking`);
};

const getAllFinishedBooking = () => {
	return axios.get(`/api/get-all-finished-booking`);
};

const getBookingByDate = (date) => {
	return axios.get(`/api/get-booking-by-date?booking_date=${date}`);
};

const confirmBooking = (bookingId) => {
	return axios.put(`/api/confirm-booking?id=${bookingId}`);
};

const finishBooking = (bookingId) => {
	return axios.put(`/api/finish-booking?id=${bookingId}`);
};

const deleteBooking = (bookingId) => {
	return axios.delete(`/api/delete-booking?id=${bookingId}`);
};

export {
	bookingAnAppointmentService,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
	getAllConfirmedBooking,
	finishBooking,
	getAllFinishedBooking,
};
