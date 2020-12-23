const express = require("express");
const { connection } = require("mongoose");
const route = express.Router();
const authController = require("../controllers/auth");
const decodeMiddleware = require("../middleware/decodejwt");

// get user
route.get("/api/auth/user", decodeMiddleware.decodejwt, authController.getUser);

// signup
route.post("/api/auth/signup", authController.createUser);

// signin
route.post("/api/auth/signin", authController.verifyUser);

// signin with facebook
route.post("/api/auth/signinwithfb", authController.signinwithfb);

module.exports = route;
