import mongoose from "mongoose";

const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  medicines: [
    {
      medicine: { type: Schema.Types.ObjectId, ref: "Medicine" },
      quantity: Number,
    },
  ],
  pharmacy: [{ type: Schema.Types.ObjectId, ref: "Pharmacy" }],
  createdAt: { type: Date, default: Date.now },
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
