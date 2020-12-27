const express = require("express");
const app = express();
const path = require("path");
const config = require("config");
const mongoose = require("mongoose");
const server = require("http").createServer(app);
const io = require("./util/socket").init(server);
require("dotenv").config();

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Route
const room = require("./routes/room");
const message = require("./routes/message");
const auth = require("./routes/auth");
const member = require("./routes/member");
app.use("/", room);
app.use("/", message);
app.use("/", auth);
app.use("/", member);

// Socket.io
io.on("connection", (socket) => {
   console.log("Client connected");

   // socket.broadcast.emit("boradcast_msg", "New user join the chat room");
});

// Configure For Production
if (process.env.NODE_ENV === "production") {
   app.use(express.static("client/build"));
   app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
   });
}

// Running Server
const uri = config.get("MONGO_LOCAL_URI");
// const uri = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PW}@cluster0.uoyxp.mongodb.net/meet?retryWrites=true&w=majority`;

const options = {
   useNewUrlParser: true,
   useUnifiedTopology: true,
};
const port = process.env.PORT || 5000;
mongoose.connect(uri, options).then(() => {
   server.listen(port, () => console.log("Server is running at port", port));
});
