const userModel = require("../model/user");
const config = require("config");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { has } = require("config");

// Get User
exports.getUser = async (req, res, next) => {
   const userId = req.user._id;
   try {
      const user = await userModel.findById(userId).select("-password");
      return res.status(200).json({ user });
   } catch (error) {
      console.log(error);
   }
};

// Create User
exports.createUser = (req, res, next) => {
   const { name, email, password } = req.body;
   bcrypt.genSalt(12, async (err, salt) => {
      try {
         const hashPassword = await bcrypt.hash(password, salt);
         const user = {
            name,
            email,
            password: hashPassword,
         };
         const newUser = await new userModel(user).save();
         const token = jwt.sign({ _id: newUser._id }, config.get("JWT_SECRET"));
         const userObj = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
         };
         return res.status(200).json({ token, userObj });
      } catch (error) {
         console.log(error);
      }
   });
};

// Verify User
exports.verifyUser = async (req, res, next) => {
   const { email, password } = req.body;
   try {
      const user = await userModel.findOne({ email: email });
      if (!user) {
         return res.status(400).json({ msg: "Email is'nt exit" });
      }
      bcrypt.compare(password, user.password, async (err, success) => {
         if (err) {
            console.log(err);
            return res.status(400).json({ msg: "Password isn't matched" });
         }
         const token = jwt.sign({ _id: user._id }, config.get("JWT_SECRET"));
         const userObj = {
            _id: user._id,
            name: user.name,
            email: user.email,
         };
         return res.status(200).json({ token, userObj });
      });
   } catch (err) {
      console.log(err);
   }
};

// Signin with facebook
exports.signinwithfb = async (req, res, next) => {
   const { fid, name, email, userAvatar } = req.body;
   try {
      const hasUser = await userModel.findOne({ fid: fid });
      // if already have user
      if (hasUser) {
         const token = jwt.sign({ _id: hasUser._id }, config.get("JWT_SECRET"));
         const userObj = {
            _id: hasUser._id,
            name: hasUser.name,
            email: hasUser.email,
         };
         return res.status(201).json({ token, userObj });
      } else {
         // if new user
         const user = new userModel({
            fid,
            name,
            email,
            avatar: userAvatar,
         });
         const newUser = await user.save();
         const token = jwt.sign({ _id: newUser._id }, config.get("JWT_SECRET"));
         const userObj = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
         };
         return res.status(201).json({ token, userObj });
      }
   } catch (error) {
      console.log(error);
   }
};
