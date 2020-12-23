const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
   name: {
      type: String,
      required: true,
   },
   email: {
      type: String,
      required: true,
   },
   avatar: {
      type: String,
   },
   fid: {
      type: String,
   },
   password: {
      type: String,
   },
   rooms: [
      {
         type: mongoose.Schema.Types.ObjectId,
         ref: "room",
      },
   ],
});

module.exports = mongoose.model("user", userSchema);
