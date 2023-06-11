require("dotenv").config();
import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
	let transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 587,
		secure: false, // true for 465, false for other ports
		auth: {
			user: process.env.EMAIL_APP, // generated ethereal user
			pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
		},
	});

	// send mail with defined transport object
	let info = await transporter.sendMail({
		from: '"Phạm Đức Tịnh 👻" <phamductinh.t18@gmail.com>', // sender address
		to: dataSend.receiverEmail, // list of receivers
		subject: "Thông tin đặt lịch khám bệnh", // Subject line
		html: getBodyHTMLEmail(dataSend),
	});
};

let getBodyHTMLEmail = (dataSend) => {
	let result = `
        <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên Bookingcare.vn</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Thời gian: ${dataSend.booking_time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <div>Xin chân thành cảm ơn !</div>
    `; // html body
	return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
	let result = `
            <h3>Xin chào ${dataSend.fullName} !</h3>
            <p>Lời đầu tiên, cảm ơn bạn vì đã đặt lịch khám bệnh online trên Bookingcare.vn</p>
            <p>Chúng tôi rất tiếc phải thông báo rằng vì một số lý do nên lịch hẹn của bạn đã bị hủy. Bạn vui lòng đặt lại vào khoảng thời gian khác.</p>
            <div>Xin chân thành cảm ơn !</div>
        `;
	return result;
};

let sendDeclineEmail = async (dataSend) => {
	return new Promise(async (resolve, reject) => {
		try {
			let transporter = nodemailer.createTransport({
				host: "smtp.gmail.com",
				port: 587,
				secure: false, // true for 465, false for other ports
				auth: {
					user: process.env.EMAIL_APP, // generated ethereal user
					pass: process.env.EMAIL_APP_PASSWORD, // generated ethereal password
				},
			});

			let info = await transporter.sendMail({
				from: '"Phạm Đức Tịnh 👻" <phamductinh.t18@gmail.com>', // sender address
				to: dataSend.receiverEmail, // list of receivers
				subject: "Kết quả đặt lịch khám bệnh", // Subject line
				html: getBodyHTMLEmailRemedy(dataSend),
			});
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
};

module.exports = {
	sendSimpleEmail,
	sendDeclineEmail,
};
