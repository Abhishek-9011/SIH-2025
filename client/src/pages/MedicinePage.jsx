import React, { useEffect, useState } from "react";
import axios from "axios";
import { useCart } from "../context/cartContext";

const MedicinePage = () => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchMedicines = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/medicine/"
        );
        setMedicines(response.data);
      } catch (error) {
        console.error("Error fetching medicines:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMedicines();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen text-lg font-semibold">
        Loading Medicines...
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-center mb-6">
        Available Medicines
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {medicines.map((medicine) => (
          <div
            key={medicine._id}
            className="bg-white shadow-lg rounded-2xl p-4 flex flex-col items-center hover:shadow-xl transition"
          >
            <img
              src={medicine.image}
              alt={medicine.name}
              className="w-32 h-32 object-contain mb-4"
            />
            <h2 className="text-lg font-semibold">{medicine.name}</h2>
            <p className="text-gray-600">₹{medicine.price}</p>
            <p className="text-sm text-gray-500">
              Expiry: {new Date(medicine.expiry).toLocaleDateString()}
            </p>
            <button
              onClick={() => addToCart(medicine._id, 1)}
              className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MedicinePage;
