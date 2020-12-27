const cloudinary = require("./cloudinary");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");
const moment = require("moment");

const day = moment().format("ll").split(" ").join("_").split(",").join("");
const time = moment().format("LT").split(" ").join("_");

const storage = (path) => {
   return new CloudinaryStorage({
      cloudinary: cloudinary,
      params: {
         public_id: (req, file) => {
            let name;
            if (req.body.roomName) {
               name = path + req.body.roomName + "_" + day + "_" + time; // roomName_Dec_20_2020_10:36_PM.png
            }
            if (req.body.username) {
               name = path + req.body.username + "_" + day + "_" + time; // username_Dec_20_2020_10:36_PM.png
            }
            return name;
         },
      },
   });
};

exports.roomImageUploader = multer({
   storage: storage("chatting_app/room_avatar/"),
});

exports.editUpserAvatarUploader = multer({
   storage: storage("chatting_app/user_avatar/"),
});
