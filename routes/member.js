const route = require("express").Router();
const memberController = require("../controllers/member");

// Load all messages
route.post("/api/addMember", memberController.addMember);

module.exports = route;
