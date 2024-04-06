// const mysql = require("mysql");
import mysql from "mysql";

// let connectDB = mysql.createConnection({
// 	host: "localhost",
// 	user: "pha64077_phamductinh",
// 	password: "HkD~90W+M@N.",
// 	database: "pha64077_bookingcare",
// });

let connectDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "bookingcare",
});

connectDB.connect(function (err) {
	if (err) throw err;
	console.log("Database is connected successfully !");
});

module.exports = connectDB;
