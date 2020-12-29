const userModel = require("../model/user");
const roomModel = require("../model/room");
const io = require("../util/socket");

exports.addMember = async (req, res, next) => {
   const { members, roomId } = req.body;
   members.forEach(async (member) => {
      // Add room id in user database
      const user = await userModel.findOne({ email: members });
      // if user not found
      if (!user) {
         return res.status(400).json({ msg: "User not found" });
      }
      // check user is already member or not
      if (user.rooms.includes(roomId)) {
         return res.status(400).json({ msg: "This user is already member" });
      }

      // Add Room ID to user rooms array
      user.rooms.push({ _id: roomId });
      user.save();

      // Add user ID in room database
      const room = await roomModel.findById(roomId);
      room.members.push({ _id: user._id });
      room.save();
      return res.sendStatus(201);
   });
};
