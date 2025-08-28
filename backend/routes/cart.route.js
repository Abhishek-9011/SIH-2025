import express from "express";
import {
  getCart,
  addItemToCart,
  updateItemQuantity,
  removeItemFromCart,
  clearCart,
} from "../controllers/cart.controller.js";

const router = express.Router();

router.get("/:userId", getCart);
router.post("/:userId", addItemToCart);
router.put("/:userId/:medicineId", updateItemQuantity);
router.delete("/:userId/:medicineId", removeItemFromCart);
router.delete("/:userId", clearCart);

export default router;
