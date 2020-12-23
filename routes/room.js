const route = require("express").Router();
const roomController = require("../controllers/room");
const decodeMiddleware = require("../middleware/decodejwt");
const { uploader } = require("../util/helper");

// Load Rooms
route.get(
   "/api/rooms/loadrooms",
   decodeMiddleware.decodejwt,
   roomController.loadRooms
);

// Join Room
route.post(
   "/api/rooms/joinroom",
   decodeMiddleware.decodejwt,
   roomController.joinRoom
);

// Create Room
route.post(
   "/api/rooms/createroom",
   decodeMiddleware.decodejwt,
   uploader.single("roomAvatar"),
   roomController.createRoom
);

module.exports = route;
