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

let sendReminderEmail = async (dataSend) => {
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
		subject: "Nhắc hẹn", // Subject line
		html: getBodyReminderEmail(dataSend),
	});
};

let getBodyReminderEmail = (dataSend) => {
	let result = `
        <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn có một lịch khám bệnh online vào ngày mai, đừng quên tham gia đúng giờ nhé!</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Ngày khám: ${dataSend.booking_date}</b></div>
        <div><b>Thời gian: ${dataSend.booking_time}</b></div>
        <div><b>Thời lượng khám: ${dataSend.exam_time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Bạn vui lòng tham gia cuộc gọi đúng thời gian bằng cách click vào link dưới đây.</p>
        <div>
        <a href=http://localhost:3000/room/${dataSend.idRoom} target="_blank">Click here</a>
        </div>
        <br />
        <div>Xin chân thành cảm ơn !</div>
    `; // html body
	return result;
};

let sendTelemedicineEmail = async (dataSend) => {
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
		html: getBodyTelemedicineEmail(dataSend),
	});
};

let getBodyHTMLEmail = (dataSend) => {
	let result = `
        <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh online trên DANA Hospital</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Ngày khám: ${dataSend.booking_date}</b></div>
        <div><b>Thời gian: ${dataSend.booking_time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <br />
        <div>Xin chân thành cảm ơn !</div>
    `; // html body
	return result;
};

let getBodyTelemedicineEmail = (dataSend) => {
	let result = `
        <h3>Xin chào ${dataSend.fullName}!</h3>
        <p>Bạn nhận được email này vì bạn đã đặt lịch khám bệnh từ xa trên DANA Hospital</p>
        <p>Thông tin đặt lịch khám bệnh:</p>
        <div><b>Ngày khám: ${dataSend.booking_date}</b></div>
        <div><b>Thời gian: ${dataSend.booking_time}</b></div>
        <div><b>Thời lượng khám: ${dataSend.exam_time}</b></div>
        <div><b>Bác sĩ: ${dataSend.doctorName}</b></div>
        <p>Bạn vui lòng tham gia cuộc gọi đúng thời gian bằng cách click vào link dưới đây.</p>
        <div>
        <a href=http://localhost:3000/room/${dataSend.idRoom} target="_blank">Click here</a>
        </div>
        <br />
        <div>Xin chân thành cảm ơn !</div>
    `; // html body
	return result;
};

let getBodyHTMLEmailRemedy = (dataSend) => {
	let result = `
            <h3>Xin chào ${dataSend.fullName}!</h3>
            <p>Chúng tôi rất tiếc phải thông báo rằng vì bạn không thanh toán thành công nên lịch hẹn của bạn đã bị hủy. Bạn vui lòng đặt lại và và thực hiện thanh toán.</p>
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

let sendEmailResetPassword = async (dataSend) => {
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
				subject: "Yêu cầu đặt lại mật khẩu", // Subject line
				html: getBodyHTMLEmailResetPassword(dataSend),
			});
			resolve(true);
		} catch (error) {
			reject(error);
		}
	});
};

let getBodyHTMLEmailResetPassword = (dataSend) => {
	let result = `
            <html xmlns="http://www.w3.org/1999/xhtml">
            <head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta name="x-apple-disable-message-reformatting" />
                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
                <meta name="color-scheme" content="light dark" />
                <meta name="supported-color-schemes" content="light dark" />
                <title></title>
                <style type="text/css" rel="stylesheet" media="all">
                
                @import url("https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap");
                body {
                width: 100% !important;
                height: 100%;
                margin: 0;
                -webkit-text-size-adjust: none;
                }
                
                a {
                color: #3869D4;
                }
                
                a img {
                border: none;
                }
                
                td {
                word-break: break-word;
                }
                
                .preheader {
                display: none !important;
                visibility: hidden;
                mso-hide: all;
                font-size: 1px;
                line-height: 1px;
                max-height: 0;
                max-width: 0;
                opacity: 0;
                overflow: hidden;
                }
                
                body,
                td,
                th {
                font-family: "Nunito Sans", Helvetica, Arial, sans-serif;
                }
                
                h1 {
                margin-top: 0;
                color: #333333;
                font-size: 22px;
                font-weight: bold;
                text-align: left;
                }
                
                h2 {
                margin-top: 0;
                color: #333333;
                font-size: 16px;
                font-weight: bold;
                text-align: left;
                }
                
                h3 {
                margin-top: 0;
                color: #333333;
                font-size: 14px;
                font-weight: bold;
                text-align: left;
                }
                
                td,
                th {
                font-size: 16px;
                }
                
                p,
                ul,
                ol,
                blockquote {
                margin: .4em 0 1.1875em;
                font-size: 16px;
                line-height: 1.625;
                }
                
                p.sub {
                font-size: 13px;
                }
                
                .align-right {
                text-align: right;
                }
                
                .align-left {
                text-align: left;
                }
                
                .align-center {
                text-align: center;
                }
                
                .u-margin-bottom-none {
                margin-bottom: 0;
                }
                
                .button {
                background-color: #3869D4;
                border-top: 10px solid #3869D4;
                border-right: 18px solid #3869D4;
                border-bottom: 10px solid #3869D4;
                border-left: 18px solid #3869D4;
                display: inline-block;
                color: #FFF;
                text-decoration: none;
                border-radius: 3px;
                box-shadow: 0 2px 3px rgba(0, 0, 0, 0.16);
                -webkit-text-size-adjust: none;
                box-sizing: border-box;
                }
                
                .button--green {
                background-color: #22BC66;
                border-top: 10px solid #22BC66;
                border-right: 18px solid #22BC66;
                border-bottom: 10px solid #22BC66;
                border-left: 18px solid #22BC66;
                }
                
                .button--red {
                background-color: #FF6136;
                border-top: 10px solid #FF6136;
                border-right: 18px solid #FF6136;
                border-bottom: 10px solid #FF6136;
                border-left: 18px solid #FF6136;
                }
                
                @media only screen and (max-width: 500px) {
                .button {
                    width: 100% !important;
                    text-align: center !important;
                }
                }
                
                .attributes {
                margin: 0 0 21px;
                }
                
                .attributes_content {
                background-color: #F4F4F7;
                padding: 16px;
                }
                
                .attributes_item {
                padding: 0;
                }
                
                .related {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                }
                
                .related_item {
                padding: 10px 0;
                color: #CBCCCF;
                font-size: 15px;
                line-height: 18px;
                }
                
                .related_item-title {
                display: block;
                margin: .5em 0 0;
                }
                
                .related_item-thumb {
                display: block;
                padding-bottom: 10px;
                }
                
                .related_heading {
                border-top: 1px solid #CBCCCF;
                text-align: center;
                padding: 25px 0 10px;
                }
                
                .discount {
                width: 100%;
                margin: 0;
                padding: 24px;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #F4F4F7;
                border: 2px dashed #CBCCCF;
                }
                
                .discount_heading {
                text-align: center;
                }
                
                .discount_body {
                text-align: center;
                font-size: 15px;
                }
                
                .social {
                width: auto;
                }
                
                .social td {
                padding: 0;
                width: auto;
                }
                
                .social_icon {
                height: 20px;
                margin: 0 8px 10px 8px;
                padding: 0;
                }
                
                .purchase {
                width: 100%;
                margin: 0;
                padding: 35px 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                }
                
                .purchase_content {
                width: 100%;
                margin: 0;
                padding: 25px 0 0 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                }
                
                .purchase_item {
                padding: 10px 0;
                color: #51545E;
                font-size: 15px;
                line-height: 18px;
                }
                
                .purchase_heading {
                padding-bottom: 8px;
                border-bottom: 1px solid #EAEAEC;
                }
                
                .purchase_heading p {
                margin: 0;
                color: #85878E;
                font-size: 12px;
                }
                
                .purchase_footer {
                padding-top: 15px;
                border-top: 1px solid #EAEAEC;
                }
                
                .purchase_total {
                margin: 0;
                text-align: right;
                font-weight: bold;
                color: #333333;
                }
                
                .purchase_total--label {
                padding: 0 15px 0 0;
                }
                
                body {
                background-color: #F2F4F6;
                color: #51545E;
                }
                
                p {
                color: #51545E;
                }
                
                .email-wrapper {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #F2F4F6;
                }
                
                .email-content {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                }
                /* Masthead ----------------------- */
                
                .email-masthead {
                padding: 25px 0;
                text-align: center;
                }
                
                .email-masthead_logo {
                width: 94px;
                }
                
                .email-masthead_name {
                font-size: 16px;
                font-weight: bold;
                color: #A8AAAF;
                text-decoration: none;
                text-shadow: 0 1px 0 white;
                }
                
                .email-body {
                width: 100%;
                margin: 0;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                }
                
                .email-body_inner {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                background-color: #FFFFFF;
                }
                
                .email-footer {
                width: 570px;
                margin: 0 auto;
                padding: 0;
                -premailer-width: 570px;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
                }
                
                .email-footer p {
                color: #A8AAAF;
                }
                
                .body-action {
                width: 100%;
                margin: 30px auto;
                padding: 0;
                -premailer-width: 100%;
                -premailer-cellpadding: 0;
                -premailer-cellspacing: 0;
                text-align: center;
                }
                
                .body-sub {
                margin-top: 25px;
                padding-top: 25px;
                border-top: 1px solid #EAEAEC;
                }
                
                .content-cell {
                padding: 45px;
                }
                /*Media Queries ------------------------------ */
                
                @media only screen and (max-width: 600px) {
                .email-body_inner,
                .email-footer {
                    width: 100% !important;
                }
                }
                
                @media (prefers-color-scheme: dark) {
                body,
                .email-body,
                .email-body_inner,
                .email-content,
                .email-wrapper,
                .email-masthead,
                .email-footer {
                    background-color: #333333 !important;
                    color: #FFF !important;
                }
                p,
                ul,
                ol,
                blockquote,
                h1,
                h2,
                h3,
                span,
                .purchase_item {
                    color: #FFF !important;
                }
                .attributes_content,
                .discount {
                    background-color: #222 !important;
                }
                .email-masthead_name {
                    text-shadow: none !important;
                }
                }
                
                :root {
                color-scheme: light dark;
                supported-color-schemes: light dark;
                }
                </style>
                <!--[if mso]>
                <style type="text/css">
                .f-fallback  {
                    font-family: Arial, sans-serif;
                }
                </style>
            <![endif]-->
            </head>
            <body>
                <span class="preheader">Use this link to reset your password. The link is only valid for 24 hours.</span>
                <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                <tr>
                    <td align="center">
                    <table class="email-content" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                        <tr>
                        <td class="email-masthead">
                            <a href="http://localhost:3000/home" class="f-fallback email-masthead_name">
                            [DANA Hospital]
                        </a>
                        </td>
                        </tr>
                        <!-- Email Body -->
                        <tr>
                        <td class="email-body" width="570" cellpadding="0" cellspacing="0">
                            <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <!-- Body content -->
                            <tr>
                                <td class="content-cell">
                                <div class="f-fallback">
                                    <h1>Xin chào ${dataSend.fullName},</h1>
                                    <p>Bạn đã yêu cầu đặt lại mật khẩu cho tài khoản DANA Hospital của mình. Bấm vào nút bên dưới để đi tới trang thay đổi mật khẩu.</p>
                                    <!-- Action -->
                                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0" role="presentation">
                                    <tr>
                                        <td align="center">
                                        <table width="100%" border="0" cellspacing="0" cellpadding="0" role="presentation">
                                            <tr>
                                            <td align="center">
                                                <a href="http://localhost:3000/reset-password" class="f-fallback button button--green" target="_blank">Reset your password</a>
                                            </td>
                                            </tr>
                                        </table>
                                        </td>
                                    </tr>
                                    </table>
                                    <p>Nếu bạn không yêu cầu đặt lại mật khẩu, vui lòng bỏ qua email này.</p>
                                    <p>Cảm ơn,
                                    <br>DANA Hospital</p>
                                    <!-- Sub copy -->
                                    <table class="body-sub" role="presentation">
                                    <tr>
                                        
                                    </tr>
                                    </table>
                                </div>
                                </td>
                            </tr>
                            </table>
                        </td>
                        </tr>
                        <tr>
                        <td>
                            <table class="email-footer" align="center" width="570" cellpadding="0" cellspacing="0" role="presentation">
                            <tr>
                               
                            </tr>
                            </table>
                        </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </table>
            </body>
            </html>
        `;
	return result;
};

module.exports = {
	sendSimpleEmail,
	sendDeclineEmail,
	sendTelemedicineEmail,
	sendReminderEmail,
	sendEmailResetPassword,
};
