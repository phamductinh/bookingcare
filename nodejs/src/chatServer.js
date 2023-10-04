const express = require("express");
const dotenv = require("dotenv");
const path = require("path");
const { createServer } = require("http");

dotenv.config();

class ChatServer {
	constructor() {
		this.createApp();
		this.config();
		this.createServer();
		this.listen();
	}

	createApp() {
		this.app = express();
		this.app.use(express.static(path.join(__dirname, "../public")));
	}

	config() {
		this.port = process.env.PORT;
		this.app.set("port", this.port);
	}

	listen() {
		this.server.listen(this.port);
	}

	createServer() {
		this.server = createServer(this.app);
	}

	getApp() {
		return this.app;
	}
}

module.exports = { ChatServer };
