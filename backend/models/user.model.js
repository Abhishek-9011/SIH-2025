import mongoose from "mongoose";

const { Schema } = mongoose;

const AddressSchema = new Schema({
  street: { type: String },
  city: { type: String },
  state: { type: String },
  postalCode: { type: String },
  country: { type: String, default: "India" },
});

const DoctorSchema = new Schema({
  hospital: { type: String, required: true },
  specialization: { type: String },
  roles: [{ type: String }],
});

const UserSchema = new Schema(
{
    name: { type: String, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["patient", "doctor", "pharmacyOwner", "admin"],
      default: "patient",
    },
    language: { type: String, default: "english" },
    address: AddressSchema,
    doctorInfo: DoctorSchema,  
    documents: [{ type: String }], 
    isVerified: { type: Boolean, default: false },
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
