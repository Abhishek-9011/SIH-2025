import mongoose from "mongoose";

const { Schema } = mongoose;

const cartSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      medicine: { type: Schema.Types.ObjectId, ref: "Medicine", required: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  updatedAt: { type: Date, default: Date.now },
});

export const Cart = mongoose.model("Cart", cartSchema);
