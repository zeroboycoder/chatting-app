let io;

module.exports = {
   init: (server) => {
      io = require("socket.io")(server, {
         cors: {
            origin: "*",
         },
      });
      return io;
   },
   getIO: () => {
      if (!io) {
         console.log("Doesn't have IO");
         return;
      }
      return io;
   },
};
