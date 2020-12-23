const cloudinary = require("cloudinary").v2;

cloudinary.config({
   cloud_name: "pyaesonekhant",
   api_key: "218558448777178",
   api_secret: "nN7bSMqUTKJ7senRQQ7ITCp5ibI",
});

module.exports = cloudinary;
