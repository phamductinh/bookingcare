import db from "../configs/connectDB";

let getHomePage = (req, res) => {
	return res.send("hello");
};

module.exports = {
	getHomePage,
};
