import express from "express";
import bodyParser from "body-parser";
import viewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import cors from "cors";
require("dotenv").config();

let app = express();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

let port = process.env.PORT || 9999;
app.listen(port, () => {
	console.log("Nodejs is runing on the port" + port);
});
