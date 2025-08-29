// context/CartContext.jsx
import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const CartContext = createContext();

export const CartProvider = ({ children, userId }) => {
  const [cart, setCart] = useState(null);
  const baseURL = "http://localhost:3000/api/v1/cart"; // adjust if needed

  // 📌 Fetch cart on mount
  useEffect(() => {
    if (userId) fetchCart();
  }, [userId]);

  const fetchCart = async () => {
    try {
      const res = await axios.get(`${baseURL}/68b0b821d4a3317e0e2f972e`);
      setCart(res.data);
    } catch (err) {
      if (err.response?.status === 404) {
        setCart({ user: userId, items: [] }); // new user, empty cart
      } else {
        console.error("Error fetching cart:", err.message);
      }
    }
  };

  // 📌 Add item
  const addToCart = async (medicineId, quantity = 1) => {
    try {
      const res = await axios.post(`${baseURL}/68b0b821d4a3317e0e2f972e`, {
        medicineId,
        quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.error("Error adding to cart:", err.message);
    }
  };

  // 📌 Update quantity
  const updateQuantity = async (medicineId, quantity) => {
    try {
      const res = await axios.put(`${baseURL}/68b0b821d4a3317e0e2f972e/${medicineId}`, {
        quantity,
      });
      setCart(res.data);
    } catch (err) {
      console.error("Error updating quantity:", err.message);
    }
  };

  // 📌 Remove item
  const removeFromCart = async (medicineId) => {
    try {
      const res = await axios.delete(`${baseURL}/68b0b821d4a3317e0e2f972e/${medicineId}`);
      setCart(res.data);
    } catch (err) {
      console.error("Error removing item:", err.message);
    }
  };

  // 📌 Clear cart
  const clearCart = async () => {
    try {
      const res = await axios.delete(`${baseURL}/68b0b821d4a3317e0e2f972e`);
      setCart(res.data.cart); // since controller sends `{ message, cart }`
    } catch (err) {
      console.error("Error clearing cart:", err.message);
    }
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, updateQuantity, removeFromCart, clearCart, fetchCart }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
