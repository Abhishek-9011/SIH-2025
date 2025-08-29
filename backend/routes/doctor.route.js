import express from "express";
import { getAllDoctors } from "../controllers/doctor.controller.js";

const router = express.Router();

// ✅ Route to get all doctors
router.get("/", getAllDoctors);

export default router;
