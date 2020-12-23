const room = require("../model/room");
const roomModel = require("../model/room");

// Load Room
exports.loadRooms = async (req, res, next) => {
   const userId = req.user._id;
   try {
      const roomArr = [];
      const rooms = await roomModel.find().populate("members");
      rooms.forEach((room) => {
         room.members.forEach((member) => {
            String(member._id) === userId ? roomArr.push(room) : null;
         });
      });
      return res.status(200).json({ rooms: roomArr });
   } catch (err) {
      return res.status(500).json({ msg: "Internal Server Error" });
      console.log(err);
   }
};

// Join Room
exports.joinRoom = async (req, res, next) => {
   const { roomId } = req.body;
   const userId = req.user._id;
   try {
      const room = await roomModel.findById(roomId);
      if (!room) {
         return res.status(400).json({ msg: "Room ID is wrong" });
      }
      room.members.push(userId);
      await room.save();
      return res.sendStatus(201);
   } catch (error) {
      return res.status(400).json({ msg: "Room not found" });
   }
};

// Create Room
exports.createRoom = async (req, res, next) => {
   const userId = req.user._id;
   const roomName = req.body.roomName;
   const imageUrl = req.file.path;
   try {
      const room = new roomModel({
         roomName,
         roomAvatarUrl: imageUrl,
         ownerId: userId,
         members: [{ _id: userId }],
      });
      await room.save();
      return res.sendStatus(201);
   } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Fail to upload" });
   }
};
