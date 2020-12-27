const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
   roomId: {
      type: String,
      required: true,
   },
   sender: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
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
