import React, { useState } from "react";
import { Plus, Edit, Trash2, Search, Filter } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const PharmacyProductsTable = () => {
  const [searchTerm, setSearchTerm] = useState("");

  // Sample medicine data
  const medicines = [
    {
      id: 1,
      name: "Paracetamol 500mg",
      category: "Analgesic",
      status: "In Stock",
      stock: 150,
      price: "₹25.00",
      expiry: "2025-08-15",
    },
    {
      id: 2,
      name: "Amoxicillin 250mg",
      category: "Antibiotic",
      status: "Low Stock",
      stock: 8,
      price: "₹145.00",
      expiry: "2025-06-20",
    },
    {
      id: 3,
      name: "Omeprazole 20mg",
      category: "Antacid",
      status: "In Stock",
      stock: 95,
      price: "₹85.00",
      expiry: "2025-10-12",
    },
    {
      id: 4,
      name: "Metformin 500mg",
      category: "Antidiabetic",
      status: "In Stock",
      stock: 120,
      price: "₹65.00",
      expiry: "2025-09-08",
    },
    {
      id: 5,
      name: "Lisinopril 10mg",
      category: "Antihypertensive",
      status: "Low Stock",
      stock: 12,
      price: "₹95.00",
      expiry: "2025-07-25",
    },
    {
      id: 6,
      name: "Aspirin 75mg",
      category: "Antiplatelet",
      status: "In Stock",
      stock: 200,
      price: "₹15.00",
      expiry: "2025-11-30",
    },
    {
      id: 7,
      name: "Cetirizine 10mg",
      category: "Antihistamine",
      status: "Low Stock",
      stock: 18,
      price: "₹35.00",
      expiry: "2025-05-14",
    },
    {
      id: 8,
      name: "Ibuprofen 400mg",
      category: "Anti-inflammatory",
      status: "In Stock",
      stock: 85,
      price: "₹45.00",
      expiry: "2025-12-10",
    },
    {
      id: 9,
      name: "Losartan 50mg",
      category: "Antihypertensive",
      status: "Out of Stock",
      stock: 0,
      price: "₹125.00",
      expiry: "2025-08-03",
    },
    {
      id: 10,
      name: "Simvastatin 20mg",
      category: "Statin",
      status: "In Stock",
      stock: 65,
      price: "₹155.00",
      expiry: "2025-09-22",
    },
    {
      id: 11,
      name: "Azithromycin 500mg",
      category: "Antibiotic",
      status: "Low Stock",
      stock: 14,
      price: "₹185.00",
      expiry: "2025-06-18",
    },
    {
      id: 12,
      name: "Salbutamol Inhaler",
      category: "Bronchodilator",
      status: "In Stock",
      stock: 45,
      price: "₹275.00",
      expiry: "2025-10-05",
    },
    {
      id: 13,
      name: "Diclofenac 50mg",
      category: "NSAID",
      status: "In Stock",
      stock: 110,
      price: "₹55.00",
      expiry: "2025-11-15",
    },
    {
      id: 14,
      name: "Pantoprazole 40mg",
      category: "PPI",
      status: "Low Stock",
      stock: 22,
      price: "₹95.00",
      expiry: "2025-07-08",
    },
    {
      id: 15,
      name: "Multivitamin Tablets",
      category: "Supplement",
      status: "In Stock",
      stock: 180,
      price: "₹125.00",
      expiry: "2025-12-25",
    },
    {
      id: 16,
      name: "Insulin Glargine",
      category: "Antidiabetic",
      status: "In Stock",
      stock: 25,
      price: "₹1250.00",
      expiry: "2025-04-30",
    },
    {
      id: 17,
      name: "Warfarin 5mg",
      category: "Anticoagulant",
      status: "Low Stock",
      stock: 16,
      price: "₹85.00",
      expiry: "2025-08-12",
    },
    {
      id: 18,
      name: "Prednisone 10mg",
      category: "Corticosteroid",
      status: "In Stock",
      stock: 75,
      price: "₹65.00",
      expiry: "2025-09-18",
    },
    {
      id: 19,
      name: "Tramadol 50mg",
      category: "Opioid Analgesic",
      status: "In Stock",
      stock: 35,
      price: "₹145.00",
      expiry: "2025-06-22",
    },
    {
      id: 20,
      name: "Calcium Carbonate",
      category: "Supplement",
      status: "In Stock",
      stock: 90,
      price: "₹75.00",
      expiry: "2025-10-28",
    },
  ];

  const getStatusColor = (status, stock) => {
    if (status === "Out of Stock" || stock === 0)
      return "bg-red-100 text-red-800";
    if (status === "Low Stock" || stock < 20)
      return "bg-yellow-100 text-yellow-800";
    return "bg-green-100 text-green-800";
  };

  const getExpiryStatus = (expiry) => {
    const expiryDate = new Date(expiry);
    const today = new Date();
    const diffTime = expiryDate - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays < 0) return "text-red-600 font-semibold";
    if (diffDays < 30) return "text-orange-600 font-medium";
    if (diffDays < 90) return "text-yellow-600";
    return "text-gray-600";
  };

  const filteredMedicines = medicines.filter(
    (medicine) =>
      medicine.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      medicine.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalValue = medicines.reduce((sum, medicine) => {
    return (
      sum +
      parseInt(medicine.price.replace("₹", "").replace(".00", "")) *
        medicine.stock
    );
  }, 0);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div>
            <Sidebar/>
        </div>
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Your Medicines
              </h1>
              <p className="text-gray-600 mt-1">
                Manage your pharmacy inventory
              </p>
            </div>
            <button className="bg-gray-900 text-white px-6 py-3 rounded-lg flex items-center hover:bg-gray-800 transition-colors">
              <Plus className="w-5 h-5 mr-2" />
              Add Medicine
            </button>
          </div>

          {/* Search and Filter */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 mb-6 p-4">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search medicines..."
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <button className="px-4 py-2 border border-gray-300 rounded-lg flex items-center hover:bg-gray-50 transition-colors">
                <Filter className="w-5 h-5 mr-2 text-gray-500" />
                Filter
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      ID
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Medicine
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Category
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Status
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Stock
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Price
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Expiry Date
                    </th>
                    <th className="text-left py-4 px-6 text-sm font-semibold text-gray-900">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {filteredMedicines.map((medicine) => (
                    <tr
                      key={medicine.id}
                      className="hover:bg-gray-50 transition-colors"
                    >
                      <td className="py-4 px-6 text-sm text-gray-900">
                        {medicine.id}
                      </td>
                      <td className="py-4 px-6">
                        <div className="text-sm font-medium text-gray-900">
                          {medicine.name}
                        </div>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-600">
                        {medicine.category}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`inline-flex px-3 py-1 text-xs font-medium rounded-full ${getStatusColor(
                            medicine.status,
                            medicine.stock
                          )}`}
                        >
                          {medicine.stock === 0
                            ? "Out of Stock"
                            : medicine.stock < 20
                            ? "Low Stock"
                            : "In Stock"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-sm text-gray-900 font-medium">
                        {medicine.stock}
                      </td>
                      <td className="py-4 px-6 text-sm text-green-600 font-semibold">
                        {medicine.price}
                      </td>
                      <td
                        className={`py-4 px-6 text-sm ${getExpiryStatus(
                          medicine.expiry
                        )}`}
                      >
                        {new Date(medicine.expiry).toLocaleDateString("en-IN")}
                      </td>
                      <td className="py-4 px-6">
                        <div className="flex space-x-2">
                          <button className="bg-gray-900 text-white px-3 py-1 rounded text-xs hover:bg-gray-800 transition-colors flex items-center">
                            <Edit className="w-3 h-3 mr-1" />
                            Edit
                          </button>
                          <button className="bg-red-600 text-white px-3 py-1 rounded text-xs hover:bg-red-700 transition-colors flex items-center">
                            <Trash2 className="w-3 h-3 mr-1" />
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Footer */}
            <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
              <div className="flex justify-between items-center text-sm">
                <div className="text-gray-600">
                  Total Inventory Value:{" "}
                  <span className="font-semibold text-gray-900">
                    ₹{totalValue.toLocaleString()}
                  </span>
                </div>
                <div className="text-gray-600">
                  <span className="font-semibold">{medicines.length}</span>{" "}
                  Items
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PharmacyProductsTable;
