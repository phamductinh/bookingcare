import express from "express";
import homeController from "../controllers/homeController";
import authController from "../controllers/authController";
import userController from "../controllers/userController";
import { verifyJWT } from "../middlewares/verifyJWT";

let router = express.Router();

let initWebRoutes = (app) => {
	router.get("/", homeController.getHomePage);
	router.post("/api/login", authController.login);
	router.post("/api/register", authController.register);

	router.get("/api/users", verifyJWT, userController.getAllUsers);
	router.get("/api/get-user", verifyJWT, userController.getUser);
	router.post("/api/create-user", verifyJWT, userController.createUser);
	router.put("/api/edit-user", verifyJWT, userController.updateUser);
	router.delete("/api/delete-user", verifyJWT, userController.deleteUser);

	return app.use("/", router);
};

module.exports = initWebRoutes;
