const express = require("express");
const route = express.Router();
const authController = require("../controllers/auth");
const decodeMiddleware = require("../middleware/decodejwt");
const { editUpserAvatarUploader } = require("../util/helper");

// get user
route.get("/api/auth/user", decodeMiddleware.decodejwt, authController.getUser);

// signup
route.post("/api/auth/signup", authController.createUser);

// signin
route.post("/api/auth/signin", authController.verifyUser);

// signin with facebook
route.post("/api/auth/signinwithfb", authController.signinwithfb);

// Edit User Avatar
route.patch(
   "/api/auth/edit",
   editUpserAvatarUploader.single("userAvatar"),
   authController.editUserAvatar
);

module.exports = route;
