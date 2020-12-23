const route = require("express").Router();
const messageController = require("../controllers/message");

// Load all messages
route.get("/api/loadMessages/:roomId", messageController.loadMessage);

// Sent MEssage
route.post("/api/sentMessage", messageController.createMessage);

module.exports = route;
