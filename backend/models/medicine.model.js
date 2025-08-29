import mongoose from "mongoose";
import crypto from "crypto"; // for generating random batch number

const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  pharmacy: { type: Schema.Types.ObjectId, ref: "Pharmacy", required: true },
  image: String,
  expiry: { type: Date, required: true },
  batchNo: {
    type: String,
    default: () => crypto.randomBytes(8).toString("hex"), // generates a random 16-character hex string
    unique: true
  }
});

export const Medicine = mongoose.model("Medicine", medicineSchema);
