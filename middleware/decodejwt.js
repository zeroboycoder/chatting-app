const config = require("config");
const jwt = require("jsonwebtoken");

exports.decodejwt = async (req, res, next) => {
   const [name, token] = req.header("chat_auth").split(",");
   try {
      if (name === "zeroboy") {
         const decodeToken = jwt.decode(token);
         req.user = { _id: decodeToken._id };
         next();
      } else {
         return res.sendStatus(401);
      }
   } catch (error) {
      // console.log(error);
   }
};
