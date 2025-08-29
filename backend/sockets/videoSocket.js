const onlineUsers = new Map(); // userId -> socketId(s)

export default function presenceSocket(io) {
  io.on("connection", (socket) => {
    console.log("New socket connected:", socket.id);

    // Assume userId is sent from frontend after connection
    socket.on("register", (userId) => {
      if (!onlineUsers.has(userId)) {
        onlineUsers.set(userId, new Set());
      }
      onlineUsers.get(userId).add(socket.id);

      // Broadcast updated online list
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });

    // Handle disconnection
    socket.on("disconnect", () => {
      for (let [userId, sockets] of onlineUsers.entries()) {
      sockets.delete(socket.id);
        if (sockets.size === 0) {
          onlineUsers.delete(userId);
        }
      }

      // Broadcast updated online list
      io.emit("online-users", Array.from(onlineUsers.keys()));
    });
  });
}
