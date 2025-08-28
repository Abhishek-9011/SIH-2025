import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String, required: true },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String, default: "India" },
});

const pharmacySchema = new Schema({
  name: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: "User", required: true },
  address: AddressSchema,
  phone: String,
  medicines: [{ type: Schema.Types.ObjectId, ref: "Medicine" }],
  createdAt: { type: Date, default: Date.now },
});

export const Pharmacy = mongoose.model("Pharmacy", pharmacySchema);
