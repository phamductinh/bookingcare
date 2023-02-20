import express from "express";
import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.post("/login", authController.login);
	router.post("/register", authController.register);

	router.get("/users", userController.getAllUsers);
	router.get("/get-user", userController.getUser);
	router.post("/create-user", userController.createUser);
	router.put("/edit-user", userController.updateUser);
	router.delete("/delete-user", userController.deleteUser);

	return app.use("/", router);
};

module.exports = initWebRoutes;
