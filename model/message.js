const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   roomId: {
      type: String,
      required: true,
   },
   sender: {
      type: String,
      required: true,
   },
   senderAvatar: {
      type: String,
   },
   message: {
      type: String,
      required: true,
   },
   time: {
      type: String,
      required: true,
   },
});

module.exports = mongoose.model("message", messageSchema);
