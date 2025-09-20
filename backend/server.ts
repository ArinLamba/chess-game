import express from "express";
import { createServer } from "http";
import { Server } from "socket.io";

const app = express();
const server = createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app URL (Vite) or 3000 if CRA
    methods: ["GET", "POST"]
  }
});

io.on("connection", (socket) => {
  console.log("New client connected:", socket.id);

  socket.on("join", (roomId) => {
    socket.join(roomId);

    // tell everyone in the room that someone joined
    io.to(roomId).emit("message",`Player ${socket.id} joined room ${roomId}`); // broadcast to all
  });

  // when someone makes a move
  socket.on("move", ({ roomId, move }) => {
    // send this move to the *other* player
    socket.to(roomId).emit("opponentMove", move);
  });

  socket.on("disconnect", () => {
    console.log("Client disconnected:", socket.id);
  });
});

server.listen(4000, () => {
  console.log("Server listening on port 4000");
});
