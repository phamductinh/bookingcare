import mysql from "mysql";

let connectDB = mysql.createConnection({
	host: "localhost",
	user: "root",
	password: "",
	database: "danahospital",
});

connectDB.connect(function (err) {
	if (err) throw err;
	console.log("Database is connected successfully !");
});

module.exports = connectDB;
