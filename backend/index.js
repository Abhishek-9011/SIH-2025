import express from "express";
import diseaseRouter from "./routes/disease.route.js";
import userRouter from "./routes/user.route.js";
import pharmacyRouter from "./routes/pharmacy.route.js";
import medicineRouter from "./routes/medicine.route.js";
import medicalRecordRouter from "./routes/medicalRecord.route.js";
import prescriptionRouter from "./routes/prescription.route.js";
import cartRouter from "./routes/cart.route.js";
import orderRouter from "./routes/order.route.js";
import adminRouter from "./routes/admin.route.js";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import videoSocket from "./sockets/videoSocket.js";
import { connect } from "mongoose";
import cors from "cors";
dotenv.config({});
const app = express();
const server = http.createServer(app);
app.use(express.json());
app.use(cors());
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});

videoSocket(io);
connect(process.env.MONGO_URL)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));


app.use("/api/v1/admin", adminRouter);
app.use("/api/v1", diseaseRouter);
app.use("/api/v1/user", userRouter);
app.use("/api/v1/pharmacy", pharmacyRouter);
app.use("/api/v1/medicine", medicineRouter);
app.use("/api/v1/medicalRecord", medicalRecordRouter);
app.use("/api/v1/prescription", prescriptionRouter);
app.use("/api/v1/cart", cartRouter);
app.use("/api/v1/order", orderRouter);

server.listen(3000, () => console.log(`Server running on port 3000`));
