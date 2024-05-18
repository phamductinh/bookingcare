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

const confirmBooking = (token, bookingId) => {
	return axios.put(`/api/confirm-booking?id=${bookingId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const confirmBookingByBookId = (bookId) => {
	return axios.put(`/api/confirm-booking-by-bookId?bookId=${bookId}`);
};

const finishBooking = (token, bookingId) => {
	return axios.put(`/api/finish-booking?id=${bookingId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
};

const deleteBooking = (token, bookingId) => {
	return axios.delete(`/api/delete-booking?id=${bookingId}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
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
};
