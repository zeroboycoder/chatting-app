const moment = require("moment");
const message = require("../model/message");
const messageModel = require("../model/message");
const roomModel = require("../model/room");
const io = require("../util/socket");

exports.loadMessage = async (req, res, next) => {
   const roomId = req.params.roomId;
   const messages = await messageModel.find({ roomId: roomId });
   const room = await roomModel.findById(roomId);
   const roomName = room.roomName;
   return res.status(200).json({ messages, roomName });
};

exports.createMessage = async (req, res, next) => {
   const { roomId, sender, message } = req.body;
   const time = moment().format("LT");
   const messageObj = new messageModel({
      roomId,
      sender,
      message,
      time,
   });
   try {
      io.getIO().emit("createMsg", { newMsg: messageObj, roomId });
      const newMsg = await messageObj.save();
      return res.sendStatus(201);
   } catch (error) {
      throw new Error(error);
   }
};
