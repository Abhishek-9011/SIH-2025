import mongoose from "mongoose";

const { Schema } = mongoose;

const medicalRecordSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  description: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: Date,
});

export const MedicalRecord = mongoose.model(
  "MedicalRecord",
  medicalRecordSchema
);
