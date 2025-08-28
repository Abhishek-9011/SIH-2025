import mongoose from "mongoose";

const { Schema } = mongoose;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  pharmacy: { type: Schema.Types.ObjectId, ref: "Pharmacy", required: true },
  items: [
    {
      medicine: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  prescription: { type: Schema.Types.ObjectId, ref: "Prescription" }, // optional
  totalPrice: { type: Number, required: true },
  status: {
    type: String,
    enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
    default: "pending",
  },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }

});

export const Order = mongoose.model("Order", orderSchema);
