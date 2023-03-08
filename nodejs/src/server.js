import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

let app = express();

app.use(function (req, res, next) {
	res.setHeader("Access-Control-Allow-Origin", process.env.REACT_URL);
	res.setHeader(
		"Access-Control-Allow-Methods",
		"GET, POST, OPTIONS, PUT, PATCH, DELETE"
	);
	res.setHeader(
		"Access-Control-Allow-Headers",
		"X-Requested-With,content-type"
	);
	res.setHeader("Access-Control-Allow-Credentials", true);
	next();
});

app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 9999;
app.listen(port, () => {
	console.log("Nodejs is runing on the port" + port);
});
