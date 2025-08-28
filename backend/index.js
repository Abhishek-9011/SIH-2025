import express from "express";
import diseaseRouter from "./routes/disease.route.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import videoSocket from "./sockets/videoSocket.js";
dotenv.config({});
const app = express();
const server = http.createServer(app);

app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: "*",
  },
});


videoSocket(io);

app.use("/api/v1", diseaseRouter);

server.listen(3000, () => console.log(`Server running on port 3000`));
