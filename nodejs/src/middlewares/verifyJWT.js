import jwt from "jsonwebtoken";
require("dotenv").config();
const secretKey = process.env.SECRET_TOKEN_KEY;

const verifyJWT = (req, res, next) => {
	let authHeader = req.headers.authorization;
	if (authHeader) {
		let token = authHeader.split(" ")[1];
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

module.exports = {
	verifyJWT,
};
