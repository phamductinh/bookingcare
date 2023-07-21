import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import fileUpload from "express-fileupload";
import http from "http";
import { Server } from "socket.io";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
require("dotenv").config();

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
	socket.on("join room", (roomID) => {
		socket.join(roomID);
		socket.to(roomID).emit("user joined", socket.id);

		socket.on("signal", (data) => {
			io.to(data.room).emit("signal", {
				signal: data.signal,
				callerID: data.callerID,
			});
		});

		socket.on("sendMessage", (message) => {
			io.emit("message", { user: "User", text: message });
		});

		socket.on("disconnect", () => {
			socket.to(roomID).emit("user left", socket.id);
		});
	});
});

server.listen(port, () => {
	console.log("Nodejs is running on port " + port);
});
