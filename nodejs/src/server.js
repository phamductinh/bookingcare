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

// const peerServer = ExpressPeerServer(server, {
// 	debug: true,
// });

// app.use("/peerjs", peerServer);

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

const rooms = {};

io.on("connection", (socket) => {
	console.log("user connect", socket.id);
	socket.on("join room", (roomID) => {
		socket.join(roomID);
		console.log("room", roomID);
		socket.to(roomID).emit("join-success");

		socket.on("send-video", (roomID, data) => {
			socket.to(roomID).emit("receive-video", data);
		});

		socket.on("signal", (data) => {
			io.to(data.roomID).emit("signal", data.data);
		});

		socket.on("sendMessage", (data) => {
			socket.to(data.room).emit("receive-message", data);
		});

		socket.on("disconnect", () => {
			socket.to(roomID).emit("user left", socket.id);
		});
	});
});

server.listen(port, () => {
	console.log("Nodejs is running on port " + port);
});
