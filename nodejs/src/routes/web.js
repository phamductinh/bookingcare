import express from "express";
import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import { verifyJWT } from "../middlewares/verifyJWT";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.post("/login", authController.login);
	router.post("/register", authController.register);

	router.get("/users", verifyJWT, userController.getAllUsers);
	router.get("/get-user", verifyJWT, userController.getUser);
	router.post("/create-user", verifyJWT, userController.createUser);
	router.put("/edit-user", verifyJWT, userController.updateUser);
	router.delete("/delete-user", verifyJWT, userController.deleteUser);

	return app.use("/", router);
};

module.exports = initWebRoutes;
