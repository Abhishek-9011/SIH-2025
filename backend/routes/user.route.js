import express from "express";
import { getUser, updateUser } from "../controllers/user.controller.js";
import userMiddleware from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";
import {
  doctorSignup,
  pharmacySignup,
  signin,
  signup,
} from "../controllers/auth.controller.js";

const router = express.Router();

// ✅ Get user (only the user themselves or maybe admin later)

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/doctor/signup", doctorSignup);
router.post("/pharmacy/signup", pharmacySignup);
router.get(
  "/:id",
  userMiddleware,
  authorize(["patient", "doctor", "pharmacyOwner"]),
  getUser
);

// ✅ Update user
router.put(
  "/:id",
  userMiddleware,
  authorize(["patient", "doctor", "pharmacyOwner"]),
  updateUser
);

export default router;
