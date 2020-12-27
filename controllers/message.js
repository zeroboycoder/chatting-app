const moment = require("moment");
const message = require("../model/message");
const messageModel = require("../model/message");
const userModel = require("../model/user");
const roomModel = require("../model/room");
const io = require("../util/socket");

exports.loadMessage = async (req, res, next) => {
   const roomId = req.params.roomId;
   const messageObj = [];
   const messages = await messageModel
      .find({ roomId: roomId })
      .populate("sender");
   messages.forEach((message) => {
      messageObj.push({
         _id: message._id,
         roomId: message.roomId,
         sender: message.sender.name,
         senderAvatar: message.sender.avatar,
         message: message.message,
         time: message.time,
      });
   });
   const room = await roomModel.findById(roomId);
   const roomName = room.roomName;
   return res.status(200).json({ messages: messageObj, roomName });
};

exports.createMessage = async (req, res, next) => {
   const { roomId, senderId, message } = req.body;
   const time = moment().format("LT");
   const messageObj = new messageModel({
      roomId,
      sender: senderId,
      message,
      time,
   });
   try {
      const user = await userModel.findById(senderId);
      const newMsg = await messageObj.save();
      const returnMsg = {
         _id: newMsg._id,
         roomId,
         sender: user.name,
         senderAvatar: user.avatar,
         message,
         time,
      };
      io.getIO().emit("createMsg", { newMsg: returnMsg, roomId });
      return res.sendStatus(201);
   } catch (error) {
      throw new Error(error);
   }
};
