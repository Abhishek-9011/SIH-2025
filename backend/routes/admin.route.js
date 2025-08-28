import express from "express";
import { getPendingRequests, updateUserStatus } from "../controllers/admin.controller.js";

const router = express.Router();

// ✅ GET all pending requests
router.get("/pending-requests", getPendingRequests);

// ✅ UPDATE user status (approve/reject)
router.put("/update-status/:userId", updateUserStatus);

export default router;
