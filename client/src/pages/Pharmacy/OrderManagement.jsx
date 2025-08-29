import React, { useState } from "react";
import { Eye, X, CreditCard, Banknote } from "lucide-react";
import Sidebar from "@/components/Sidebar";

const OrderManagement = () => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const orders = [
    {
      id: "ORD-68966E3",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [
        { name: "iPhone 16 pro", qty: 1, price: 119900.0 },
        { name: "Samsung Galaxy S24 Ultra", qty: 1, price: 129990.0 },
        { name: "OnePlus 12 Pro", qty: 1, price: 74999.0 },
      ],
      orderDate: "Aug 11, 2025",
      deliveryAddress: "mathura, Uttar Pradesh, N/A, India",
      status: "Pending",
      payment: "Credit Card",
      amount: 324889.0,
      paymentDate: "Aug 11, 2025",
    },
    {
      id: "ORD-68935AE",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [
        { name: "iPhone 16 pro", qty: 2, price: 119900.0 },
        { name: "Levi's 511 Slim Fit Jeans", qty: 1, price: 2999.0 },
      ],
      orderDate: "Aug 6, 2025",
      deliveryAddress: "mathura, Uttar Pradesh, N/A, India",
      status: "Pending",
      payment: "Credit Card",
      amount: 242799.0,
      paymentDate: "Aug 6, 2025",
    },
    {
      id: "ORD-68DFF71",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [{ name: "Samsung Galaxy S24 Ultra", qty: 1, price: 129990.0 }],
      orderDate: "Aug 2, 2025",
      deliveryAddress: "mathura, Uttar Pradesh, N/A, India",
      status: "Pending",
      payment: "Credit Card",
      amount: 129990.0,
      paymentDate: "Aug 2, 2025",
    },
    {
      id: "ORD-68DFC37",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [
        { name: "iPhone 16 pro", qty: 1, price: 119900.0 },
        { name: "Samsung Galaxy S24 Ultra", qty: 1, price: 129990.0 },
      ],
      orderDate: "Aug 2, 2025",
      deliveryAddress: "mathura, Uttar Pradesh, N/A, India",
      status: "Pending",
      payment: "Credit Card",
      amount: 249890.0,
      paymentDate: "Aug 2, 2025",
    },
    {
      id: "ORD-68D8C7",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [
        { name: "Zara Linen Blend Shirt", qty: 1, price: 3999.0 },
        { name: "Puma Track Pants", qty: 1, price: 2999.0 },
        { name: "Fossil Gen 6 Smartwatch", qty: 1, price: 22999.0 },
      ],
      orderDate: "Aug 2, 2025",
      deliveryAddress: "mathura, Uttar Pradesh, N/A, India",
      status: "Pending",
      payment: "Bank Transfer",
      amount: 29997.0,
      paymentDate: "Aug 2, 2025",
    },
    {
      id: "ORD-68B9FD",
      customer: {
        name: "TestUser",
        email: "user@gmail.com",
      },
      products: [
        { name: "Titan Neo Classic", qty: 1, price: 4999.0 },
        { name: "iPhone 16 pro", qty: 1, price: 119900.0 },
        { name: "Levi's 511 Slim Fit Jeans", qty: 1, price: 2999.0 },
        { name: "Jack & Jones Chinos", qty: 1, price: 1999.0 },
      ],
      orderDate: "Jul 31, 2025",
      deliveryAddress: "Mathura, UP, N/A, India",
      status: "Pending",
      payment: "Credit Card",
      amount: 129897.0,
      paymentDate: "Jul 31, 2025",
    },
  ];

  const totalRevenue = orders.reduce((sum, order) => sum + order.amount, 0);

  const handleDetailsClick = (order) => {
    setSelectedOrder(order);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOrder(null);
  };

  const formatAmount = (amount) => {
    return new Intl.NumberFormat("en-IN", {
      style: "currency",
      currency: "INR",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  const getProductImages = () => {
    const images = {
      "iPhone 16 pro": "📱",
      "Samsung Galaxy S24 Ultra": "📱",
      "OnePlus 12 Pro": "📱",
      "Levi's 511 Slim Fit Jeans": "👖",
      "Zara Linen Blend Shirt": "👔",
      "Puma Track Pants": "👖",
      "Fossil Gen 6 Smartwatch": "⌚",
      "Titan Neo Classic": "⌚",
      "Jack & Jones Chinos": "👖",
    };
    return images;
  };

  const productImages = getProductImages();

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div>
        <Sidebar />
      </div>
      <div className="p-6 bg-gray-50 min-h-screen">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-800">
              Customer Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Customer
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Products
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Order Date
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Delivery Address
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Payment
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Amount
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {orders.map((order) => (
                  <tr key={order.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {order.id}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {order.customer.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.customer.email}
                      </div>
                      <div className="text-xs text-gray-400 bg-gray-100 px-2 py-1 rounded mt-1 inline-block">
                        user
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 space-y-1">
                        {order.products.map((product, index) => (
                          <div key={index}>
                            {product.qty} × {product.name}
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {order.orderDate}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {order.deliveryAddress}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {order.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {order.payment === "Credit Card" ? (
                          <CreditCard className="w-4 h-4 mr-1" />
                        ) : (
                          <Banknote className="w-4 h-4 mr-1" />
                        )}
                        <span className="text-sm text-gray-900">
                          {order.payment}
                        </span>
                      </div>
                      <div className="text-xs text-green-600 font-medium">
                        paid
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {formatAmount(order.amount)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <button
                        onClick={() => handleDetailsClick(order)}
                        className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm font-medium transition-colors"
                      >
                        Details
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
            <div className="flex justify-between items-center">
              <div className="text-lg font-semibold text-gray-900">
                Total Revenue: {formatAmount(totalRevenue)}
              </div>
              <div className="text-sm text-gray-500">
                {orders.length} orders
              </div>
            </div>
          </div>
        </div>

        {/* Modal */}
        {isModalOpen && selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900">
                  Order Details - {selectedOrder.id}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="p-4 space-y-6">
                {/* Customer Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Customer Information
                  </h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-500">Name:</span>
                      <div className="font-medium">
                        {selectedOrder.customer.name}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Email:</span>
                      <div className="font-medium">
                        {selectedOrder.customer.email}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Order Summary */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-3">
                    Order Summary
                  </h4>
                  <div className="overflow-hidden border border-gray-200 rounded">
                    <table className="w-full text-sm">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left font-medium text-gray-700">
                            Product
                          </th>
                          <th className="px-3 py-2 text-center font-medium text-gray-700">
                            Qty
                          </th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">
                            Price
                          </th>
                          <th className="px-3 py-2 text-right font-medium text-gray-700">
                            Subtotal
                          </th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-gray-200">
                        {selectedOrder.products.map((product, index) => (
                          <tr key={index}>
                            <td className="px-3 py-2">
                              <div className="flex items-center space-x-2">
                                <span className="text-lg">
                                  {productImages[product.name] || "📦"}
                                </span>
                                <span>{product.name}</span>
                              </div>
                            </td>
                            <td className="px-3 py-2 text-center">
                              {product.qty}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatAmount(product.price)}
                            </td>
                            <td className="px-3 py-2 text-right">
                              {formatAmount(product.price * product.qty)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  <div className="mt-3 space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Subtotal:</span>
                      <span className="font-medium">
                        {formatAmount(selectedOrder.amount)}
                      </span>
                    </div>
                    <div className="flex justify-between font-semibold text-base border-t pt-2">
                      <span>Total:</span>
                      <span>{formatAmount(selectedOrder.amount)}</span>
                    </div>
                  </div>
                </div>

                {/* Shipping Information */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Shipping Information
                  </h4>
                  <div className="text-sm space-y-2">
                    <div>
                      <span className="text-gray-500">Delivery Address:</span>
                      <div className="font-medium">
                        {selectedOrder.deliveryAddress}
                      </div>
                    </div>
                    <div>
                      <span className="text-gray-500">Status:</span>
                      <span className="ml-2 inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
                        {selectedOrder.status}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Payment Method */}
                <div>
                  <h4 className="font-medium text-gray-900 mb-2">
                    Payment Method
                  </h4>
                  <div className="text-sm">
                    <div className="flex items-center mb-1">
                      {selectedOrder.payment === "Credit Card" ? (
                        <CreditCard className="w-4 h-4 mr-2" />
                      ) : (
                        <Banknote className="w-4 h-4 mr-2" />
                      )}
                      <span className="font-medium">
                        {selectedOrder.payment}
                      </span>
                    </div>
                    <div className="text-gray-500">
                      Paid on: {selectedOrder.paymentDate}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderManagement;
