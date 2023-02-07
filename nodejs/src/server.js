import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
require("dotenv").config();

let app = express();
let mysql = require("mysql");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 9999;
app.listen(port, () => {
	console.log("Nodejs is runing on the port" + port);
});

var connectDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bookingcare",
});

app.get("/test", function (req, res) {
	var sql = "SELECT * FROM user";
	connectDB.query(sql, function (err, results) {
		if (err) throw err;
		res.send(results);
	});
});
