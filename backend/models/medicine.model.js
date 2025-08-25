import mongoose from "mongoose";

const { Schema } = mongoose;

const medicineSchema = new Schema({
  name: { type: String, required: true },
  manufacturer: String,
  price: { type: Number, required: true },
  stock: { type: Number, required: true },
  pharmacy: { type: Schema.Types.ObjectId, ref: "Pharmacy", required: true },
});


export const Medicine = mongoose.model("Medicine", medicineSchema);
