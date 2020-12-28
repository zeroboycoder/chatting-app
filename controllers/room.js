const room = require("../model/room");
const roomModel = require("../model/room");
const userModel = require("../model/user");
const messageModel = require("../model/message");

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
      // Create new room
      const room = new roomModel({
         roomName,
         roomAvatarUrl: imageUrl,
         ownerId: userId,
         members: [{ _id: userId }],
      });
      const newRoom = await room.save();
      // Add Room ID to user rooms array
      const user = await userModel.findById(userId);
      user.rooms.push(newRoom._id);
      user.save();
      return res.sendStatus(201);
   } catch (error) {
      console.log(error);
      return res.status(400).json({ msg: "Fail to upload" });
   }
};

// Delete Room
exports.deleteRoom = async (req, res, next) => {
   const userId = req.user._id;
   const { roomId } = req.params;
   try {
      // Delete room by roomId
      await roomModel.findByIdAndDelete(roomId);

      // Delete room in user account by roomId
      const user = await userModel.findById(userId);
      const filterRoom = user.rooms.filter(
         (room) => String(room) !== String(roomId)
      );
      user.rooms = filterRoom;
      await user.save();

      // Delete the room's messages by roomId
      await messageModel.deleteMany({ roomId: roomId });

      return res.sendStatus(200);
   } catch (error) {
      console.log(error);
      return res.status(500).json({ msg: "Internal server error" });
   }
};
