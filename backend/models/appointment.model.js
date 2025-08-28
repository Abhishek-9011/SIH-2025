import mongoose from "mongoose";

const { Schema } = mongoose;

const appointmentSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  hospital: { type: Schema.Types.ObjectId, ref: "Hospital" },
  date: { type: Date, required: true },
  status: { type: String, enum: ["pending", "confirmed", "completed", "cancelled"], default: "pending" },
  reason: String
});

export const Appointment = mongoose.model("Appointment", appointmentSchema);
