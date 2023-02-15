import express from "express";
import homeController from "../controllers/homeController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.post("/login", homeController.login);
	router.post("/register", homeController.register);

	return app.use("/", router);
};

module.exports = initWebRoutes;
