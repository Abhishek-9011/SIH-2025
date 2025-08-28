import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalRecordSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true }, // doctor who created the record
  recordType: {
    type: String,
    enum: ["Consultation", "Lab Report", "Surgery", "Vaccination", "Other"],
    default: "Consultation",
  },
  description: { type: String }, // general notes or summary
  prescriptions: [{ type: Schema.Types.ObjectId, ref: "Prescription" }], // link prescriptions
  attachments: [{ type: String }], // URLs to files or images
  vitalSigns: {
    temperature: { type: Number }, // in °C
    bloodPressure: { type: String }, // e.g., "120/80"
    pulse: { type: Number }, // beats per minute
    respiratoryRate: { type: Number },
    weight: { type: Number }, // in kg
    height: { type: Number }, // in cm
  },
  notes: { type: String }, // extra observations
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export const MedicalRecord = mongoose.model("MedicalRecord", medicalRecordSchema);
