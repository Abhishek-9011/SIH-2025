import express from "express";
import {
  createMedicalRecord,
  getMedicalRecords,
  getMedicalRecordById,
  updateMedicalRecord,
  deleteMedicalRecord,
  getRecordsByPatient,
  getRecordsByDoctor
} from "../controllers/medicalRecord.controller.js";

const router = express.Router();

router.post("/", createMedicalRecord);
router.get("/", getMedicalRecords);                // all records
router.get("/:id", getMedicalRecordById);         // single record by _id
router.put("/:id", updateMedicalRecord);
router.delete("/:id", deleteMedicalRecord);

router.get("/patient/:patientId", getRecordsByPatient);   // records by patient
router.get("/doctor/:doctorId", getRecordsByDoctor);      // records by doctor

export default router;
