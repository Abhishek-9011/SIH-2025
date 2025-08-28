import express from "express";
import {
  createPrescription,
  getAllPrescriptions,
  getPrescriptionById,
  updatePrescription,
  deletePrescription,
  getPrescriptionsByPatient,
  getPrescriptionsByDoctor,
} from "../controllers/prescription.controller.js";

const router = express.Router();

// ✅ Create a new prescription
router.post("/", createPrescription);

// ✅ Get all prescriptions
router.get("/", getAllPrescriptions);

// ✅ Get a single prescription by ID
router.get("/:id", getPrescriptionById);

// ✅ Update a prescription by ID
router.put("/:id", updatePrescription);

// ✅ Delete a prescription by ID
router.delete("/:id", deletePrescription);

// ✅ Get all prescriptions for a specific patient
router.get("/patient/:patientId", getPrescriptionsByPatient);

// ✅ Get all prescriptions for a specific doctor
router.get("/doctor/:doctorId", getPrescriptionsByDoctor);

export default router;
