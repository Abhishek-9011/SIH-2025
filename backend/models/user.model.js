import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new mongoose.Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String, default: "India" },
});

const DoctorSchema = new mongoose.Schema({
  hospital: { type: String, required: true },
  specialization: { type: String },
  roles: [{ type: String }],
});

const userSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: {
    type: String,
    enum: ["patient", "doctor", "pharmacyOwner"],
    default: "patient",
  },
  language: { type: String, required: true },

  address: AddressSchema,

  doctorInfo: DoctorSchema,

  createdAt: { type: Date, default: Date.now },
});

export const User = mongoose.model("User", userSchema);
