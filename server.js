const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "*",
    },
});

app.use(cors());

io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Send a random anonymous name
    const anonymousName = "User" + Math.floor(Math.random() * 1000);
    socket.emit("username", anonymousName);

    // Handle messages
    socket.on("message", (data) => {
        io.emit("message", data); // Broadcast to all users
    });

    socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
    });
});

server.listen(4004, () => {
    console.log("Server running on http://localhost:4004");
});