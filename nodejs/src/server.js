import express from "express";
const app = express();
import bodyParser, { text } from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import fileUpload from "express-fileupload";
const http = require("http");
const server = require("http").createServer(app);
const io = require("socket.io")(server);
// const { ExpressPeerServer } = require("peer");
require("dotenv").config();
import db from "./configs/connectDB";
import { getEmailPatientsQuery } from "./database/queries";
const schedule = require("node-schedule");
import emailService from "./services/emailService";
const moment = require("moment");

// const peerServer = ExpressPeerServer(server, {
// 	debug: true,
// });

// app.use("/peerjs", peerServer);

const users = {};
const socketToRoom = {};

const port = process.env.PORT || 9999;

app.use((req, res, next) => {
	res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000");
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"Authorization, Content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));
app.set("views", __dirname + "/views");
viewEngine(app);

initWebRoutes(app);

app.use(
	fileUpload({
		limits: { fileSize: 10 * 1024 * 1024 },
	})
);

app.use((req, res, next) => {
	const err = new Error("Not Found");
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	res.locals.error = err;
	const status = err.status || 500;
	res.status(status);
	res.render("error");
});

io.on("connection", (socket) => {
	console.log("user connect", socket.id);
	socket.on("join room", (roomID) => {
		if (users[roomID]) {
			const length = users[roomID].length;
			if (length === 2) {
				socket.emit("room full");
				return;
			}
			users[roomID].push(socket.id);
		} else {
			users[roomID] = [socket.id];
		}
		socketToRoom[socket.id] = roomID;

		const usersInThisRoom = users[roomID].filter((id) => id !== socket.id);

		socket.emit("all users", usersInThisRoom);

		socket.on("sendMessage", (data) => {
			socket.to(roomID).emit("receiveMessage", data);
			console.log(data);
		});
	});

	socket.on("sending signal", (payload) => {
		io.to(payload.userToSignal).emit("user joined", {
			signal: payload.signal,
			callerID: payload.callerID,
		});
	});

	socket.on("returning signal", (payload) => {
		io.to(payload.callerID).emit("receiving returned signal", {
			signal: payload.signal,
			id: socket.id,
		});
	});

	socket.on("disconnect", () => {
		const roomID = socketToRoom[socket.id];
		let room = users[roomID];
		if (room) {
			room = room.filter((id) => id !== socket.id);
			users[roomID] = room;
		}
		console.log("user disconnect", socket.id);
	});
});

sendRemindEmail();

async function sendRemindEmail() {
	await db.query(getEmailPatientsQuery, (err, results) => {
		if (err) {
			console.error("Lỗi khi truy vấn dữ liệu:", err);
			return;
		}
		console.log(results);
		results.forEach((patient) => {
			let patientId = patient.id;
			let fullName = patient.fullName;
			let receiverEmail = patient.patientEmail;
			let doctorName = patient.doctorName;
			let booking_time = patient.booking_time;
			let exam_time = patient.exam_time;
			let idRoom = patient.idRoom;
			let appointmentDate = new Date(parseInt(patient.booking_date));
			let reminderDate = new Date(
				appointmentDate.getTime() - 24 * 60 * 60 * 1000
			);
			// reminderDate.setUTCHours(17, 8);
			let day = appointmentDate.getDate();
			let month = appointmentDate.getMonth() + 1;
			let year = appointmentDate.getFullYear();

			let booking_date = `${day}/${month}/${year}`;

			console.log(reminderDate);

			(async () => {
				const reminderJob = schedule.scheduleJob(
					reminderDate,
					async () => {
						await emailService.sendReminderEmail({
							receiverEmail,
							fullName,
							booking_date,
							booking_time,
							exam_time,
							doctorName,
							idRoom,
						});
						reminderJob.cancel();
					}
				);
			})();
		});
	});
}

// const currentDate = new Date(); // Lấy thời gian hiện tại

// currentDate.setMinutes(currentDate.getMinutes() + 1);

// const receiverEmail = "phamductinh.t18@gmail.com";

// const reminderJob = schedule.scheduleJob(currentDate, () => {
// 	emailService.sendReminderEmail();
// 	reminderJob.cancel();
// });

server.listen(port, () => {
	console.log("Nodejs is running on port " + port);
});
