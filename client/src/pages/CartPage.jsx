import React from "react";
import { useCart } from "../context/cartContext";

const CartPage = () => {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();

  if (!cart || cart.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-gray-600">
        <h2 className="text-2xl font-semibold">🛒 Your Cart is Empty</h2>
      </div>
    );
  }

  const totalPrice = cart.items.reduce(
    (sum, item) => sum + item.medicine.price * item.quantity,
    0
  );

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">Your Cart</h1>
      <div className="bg-white shadow-lg rounded-2xl p-4 max-w-3xl mx-auto">
        {cart.items.map((item) => (
          <div
            key={item.medicine._id}
            className="flex items-center justify-between border-b py-3"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.medicine.image}
                alt={item.medicine.name}
                className="w-16 h-16 object-contain"
              />
              <div>
                <h2 className="font-semibold">{item.medicine.name}</h2>
                <p className="text-gray-600">₹{item.medicine.price}</p>
                <p className="text-sm text-gray-500">
                  Expiry:{" "}
                  {new Date(item.medicine.expiry).toLocaleDateString()}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() =>
                  updateQuantity(item.medicine._id, item.quantity - 1)
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >
                -
              </button>
              <span>{item.quantity}</span>
              <button
                onClick={() =>
                  updateQuantity(item.medicine._id, item.quantity + 1)
                }
                className="px-2 py-1 bg-gray-300 rounded"
              >
                +
              </button>
              <button
                onClick={() => removeFromCart(item.medicine._id)}
                className="ml-4 text-red-500 font-semibold"
              >
                Remove
              </button>
            </div>
          </div>
        ))}
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-xl font-bold">Total: ₹{totalPrice}</h2>
          <button
            onClick={clearCart}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
          >
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
