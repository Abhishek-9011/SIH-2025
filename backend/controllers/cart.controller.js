// controllers/cartController.js
import { Cart } from "../models/cart.model.js";

// 📌 Get Cart by User
export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.params.userId }).populate("items.medicine");
    if (!cart) return res.status(404).json({ message: "Cart not found" });
    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Add Item to Cart
export const addItemToCart = async (req, res) => {
  const { userId } = req.params;
  const { medicineId, quantity } = req.body;

  try {
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({ user: userId, items: [] });
    }

    const existingItem = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );

    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ medicine: medicineId, quantity });
    }

    cart.updatedAt = Date.now();
    await cart.save();
    res.status(201).json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Update Item Quantity
export const updateItemQuantity = async (req, res) => {
  const { userId, medicineId } = req.params;
  const { quantity } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    const item = cart.items.find(
      (item) => item.medicine.toString() === medicineId
    );

    if (!item) return res.status(404).json({ message: "Item not found" });

    item.quantity = quantity;
    cart.updatedAt = Date.now();
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Remove Item from Cart
export const removeItemFromCart = async (req, res) => {
  const { userId, medicineId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = cart.items.filter(
      (item) => item.medicine.toString() !== medicineId
    );

    cart.updatedAt = Date.now();
    await cart.save();

    res.json(cart);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// 📌 Clear Cart
export const clearCart = async (req, res) => {
  const { userId } = req.params;

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) return res.status(404).json({ message: "Cart not found" });

    cart.items = [];
    cart.updatedAt = Date.now();
    await cart.save();

    res.json({ message: "Cart cleared", cart });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
