import express from "express";
import {
  createPharmacy,
  getPharmacies,
  getPharmacyById,
  updatePharmacy,
  deletePharmacy,
} from "../controllers/pharmacy.controller.js";

import userMiddleware from "../middlewares/authenticate.js";
import { authorize } from "../middlewares/authorize.js";

const router = express.Router();

router.post("/", userMiddleware, authorize(["pharmacyOwner"]), createPharmacy);
// router.get("/", userMiddleware, getPharmacies);
router.get(
  "/:id",
  userMiddleware,
  authorize(["pharmacyOwner"]),
  getPharmacyById
);
router.put(
  "/:id",
  userMiddleware,
  authorize(["pharmacyOwner"]),
  updatePharmacy
);
// router.delete(
//   "/:id",
//   userMiddleware,
//   authorize(["pharmacyOwner"]),
//   deletePharmacy
// );

export default router;
