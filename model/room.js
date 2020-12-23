const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema({
   roomName: {
      type: String,
      required: true,
   },
   roomAvatarUrl: {
      type: String,
   },
   ownerId: {
      type: String,
      required: true,
   },
   members: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "user",
      },
   ],
});

module.exports = mongoose.model("room", roomSchema);
