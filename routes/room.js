const route = require("express").Router();
const roomController = require("../controllers/room");
const decodeMiddleware = require("../middleware/decodejwt");
const { roomImageUploader } = require("../util/helper");

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
   roomImageUploader.single("roomAvatar"),
   roomController.createRoom
);

// Delete Room
route.delete(
   "/api/rooms/delete/:roomId",
   decodeMiddleware.decodejwt,
   roomController.deleteRoom
);

module.exports = route;
