import mongoose from "mongoose";

const { Schema } = mongoose;

const prescriptionSchema = new Schema({
  patient: { type: Schema.Types.ObjectId, ref: "User", required: true },
  doctor: { type: Schema.Types.ObjectId, ref: "User", required: true },
  medicines: [
    {
      medicine: { type: Schema.Types.ObjectId, ref: "Medicine" },
      quantity: { type: Number, required: true },
      dosage: { type: String },       // e.g., "2 tablets"
      frequency: { type: String },    // e.g., "3 times a day"
      duration: { type: String },     // e.g., "5 days"
      instructions: { type: String }, // extra notes
    },
  ],
  pharmacy: [{ type: Schema.Types.ObjectId, ref: "Pharmacy" }],
  status: {
    type: String,
    enum: ["Pending", "Dispensed", "Completed", "Cancelled"],
    default: "Pending",
  },
  attachments: [{ type: String }], // URLs of PDFs or images
  totalPrice: { type: Number },    // optional, can be calculated
  notes: { type: String },         // any additional information
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date },
});

export const Prescription = mongoose.model("Prescription", prescriptionSchema);
