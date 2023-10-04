import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey = process.env.SECRET_TOKEN_KEY;

const verifyJWT = (req, res, next) => {
	let authHeader = req.headers.authorization;
	if (authHeader) {
		let token = authHeader.split(" ")[1];
		console.log(token);
		jwt.verify(token, secretKey, (err, result) => {
			if (err) {
				return res.sendStatus(403);
			}
			req.result = result;
			next();
		});
	} else {
		res.status(401).send({
			code: "401",
			msg: "Unauthorized !",
		});
	}
};

const authApi = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Chưa xác thực" });
	}
	let token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, secretKey);

		req.user = decoded;

		if (decoded.role === "Admin") {
			return next();
		} else {
			return res.status(403).json({ message: "Không có quyền truy cập" });
		}
	} catch (error) {
		return res.status(401).json({ message: "Token không hợp lệ" });
	}
};

const authApiDoctor = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).json({ message: "Chưa xác thực" });
	}
	let token = authHeader.split(" ")[1];

	try {
		const decoded = jwt.verify(token, secretKey);

		req.user = decoded;

		if (decoded.role === "Doctor") {
			return next();
		} else {
			return res.status(403).json({ message: "Không có quyền truy cập" });
		}
	} catch (error) {
		return res.status(401).json({ message: "Token không hợp lệ" });
	}
};

module.exports = {
	verifyJWT,
	authApi,
	authApiDoctor,
};
