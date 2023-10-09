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

export {
	bookingAnAppointmentService,
	getBookingByDate,
	confirmBooking,
	deleteBooking,
	getAllConfirmedBooking,
	finishBooking,
	getAllFinishedBooking,
	getTelemedicineBookingByDate,
};
