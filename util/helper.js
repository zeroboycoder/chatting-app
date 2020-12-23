const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const moment = require("moment");

const day = moment().format("ll").split(" ").join("_").split(",").join("");
const time = moment().format("LT").split(" ").join("_");

const storage = new CloudinaryStorage({
   cloudinary: cloudinary,
   params: {
      public_id: (req, file) =>
         "chatting_app/room_avatar/" +
         req.body.roomName +
         "_" +
         day +
         "_" +
         time, // roomName_Dec_20_2020_10:36_PM.png
   },
});

exports.uploader = multer({ storage: storage });
