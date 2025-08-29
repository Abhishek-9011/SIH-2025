import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  User,
  Shield,
  Stethoscope,
  Pill,
  Search,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const AdminPanel = () => {
  const [pendingRequests, setPendingRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchPendingRequests = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "http://localhost:3000/api/v1/admin/pending-requests"
        );
        setPendingRequests(response.data.data);
        setError(null);
      } catch (err) {
        console.error("Error fetching requests:", err);
        setError("Failed to load pending requests. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchPendingRequests();
  }, []);

  const handleStatusUpdate = async (userId, status) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/v1/admin/update-status/${userId}`,
        { status }
      );

      if (response.data.success) {
        setPendingRequests((prevRequests) =>
          prevRequests.filter((request) => request._id !== userId)
        );
      }
    } catch (err) {
      console.error("Error updating status:", err);
      alert("Failed to update status. Please try again.");
    }
  };

  const filteredRequests = pendingRequests.filter((request) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "doctors" && request.role === "doctor") ||
      (filter === "pharmacies" && request.role === "pharmacyOwner");

    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const matchesSearch =
      searchTerm === "" ||
      request.name.toLowerCase().includes(lowercasedSearchTerm) ||
      request.email.toLowerCase().includes(lowercasedSearchTerm) ||
      (request.doctorInfo?.license &&
        request.doctorInfo.license
          .toLowerCase()
          .includes(lowercasedSearchTerm));

    return matchesFilter && matchesSearch;
  });

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading requests...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex justify-center items-center">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
          <p className="mt-4 text-red-600 text-lg">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 sm:px-6 lg:px-8 flex justify-between items-center">
          <div className="flex items-center">
            <div className="bg-blue-600 p-2 rounded-lg mr-3">
              <Shield className="h-6 w-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-800">
              Jeevika Admin Portal
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Dashboard Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-blue-100 p-3 rounded-full mr-4">
                <Clock className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pending Requests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pendingRequests.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-green-100 p-3 rounded-full mr-4">
                <Stethoscope className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Doctor Requests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {pendingRequests.filter((req) => req.role === "doctor").length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center">
              <div className="bg-purple-100 p-3 rounded-full mr-4">
                <Pill className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Pharmacy Requests</p>
                <p className="text-2xl font-bold text-gray-800">
                  {
                    pendingRequests.filter(
                      (req) => req.role === "pharmacyOwner"
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="bg-white shadow rounded-lg overflow-hidden">
          <div className="px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-800">
              Manage Registration Requests
            </h2>
            <p className="mt-1 text-sm text-gray-600">
              Review and approve or reject registration requests from doctors
              and pharmacy owners.
            </p>
          </div>

          {/* Filters and Search */}
          <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <span className="text-sm font-medium text-gray-700">
                  Filter by:
                </span>
                <div className="flex flex-wrap gap-2">
                  {["all", "doctors", "pharmacies"].map((f) => (
                    <button
                      key={f}
                      onClick={() => setFilter(f)}
                      className={`px-3 py-1.5 rounded-md text-sm font-medium flex items-center ${
                        filter === f
                          ? "bg-blue-100 text-blue-700"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      {f === "doctors" && (
                        <Stethoscope className="h-4 w-4 mr-1" />
                      )}
                      {f === "pharmacies" && <Pill className="h-4 w-4 mr-1" />}
                      {f.charAt(0).toUpperCase() + f.slice(1)}
                    </button>
                  ))}
                </div>
              </div>

              <div className="relative w-full sm:w-64">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Search name, email, license..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Requests Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  {[
                    "Name",
                    "Contact",
                    "Role",
                    "License",
                    "Submitted",
                    "Actions",
                  ].map((header) => (
                    <th
                      key={header}
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {pendingRequests.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Shield className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg">
                          No registration requests
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          Currently, there are no doctors or pharmacy owners
                          awaiting approval.
                        </p>
                      </div>
                    </td>
                  </tr>
                ) : filteredRequests.length > 0 ? (
                  filteredRequests.map((request) => (
                    <tr key={request._id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-10 w-10 flex-shrink-0 bg-blue-100 rounded-full flex items-center justify-center">
                            <User className="h-5 w-5 text-blue-600" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">
                              {request.name}
                            </div>
                            <div className="text-sm text-gray-500 flex items-center">
                              <Mail className="h-4 w-4 mr-1" />
                              {request.email}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 flex items-center">
                          <Phone className="h-4 w-4 mr-1 text-gray-500" />
                          {request.phone || "Not provided"}
                        </div>
                        {request.address && (
                          <div className="text-sm text-gray-500 flex items-center mt-1">
                            <MapPin className="h-4 w-4 mr-1" />
                            {request.address.city}, {request.address.state}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2.5 py-0.5 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            request.role === "doctor"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-purple-100 text-purple-800"
                          }`}
                        >
                          {request.role === "pharmacyOwner"
                            ? "Pharmacy Owner"
                            : request.role}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {request.doctorInfo?.license ||
                          (request.role === "pharmacyOwner"
                            ? "PHARM-LICENSE"
                            : "MED-LICENSE")}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {formatDate(request.createdAt)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() =>
                              handleStatusUpdate(request._id, "approved")
                            }
                            className="bg-green-100 text-green-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-green-200 flex items-center"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </button>
                          <button
                            onClick={() =>
                              handleStatusUpdate(request._id, "rejected")
                            }
                            className="bg-red-100 text-red-700 px-3 py-1.5 rounded-md text-sm font-medium hover:bg-red-200 flex items-center"
                          >
                            <XCircle className="h-4 w-4 mr-1" />
                            Reject
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-8 text-center">
                      <div className="flex flex-col items-center justify-center">
                        <Shield className="h-12 w-12 text-gray-400 mb-4" />
                        <p className="text-gray-500 text-lg">
                          No pending requests found
                        </p>
                        <p className="text-gray-400 text-sm mt-1">
                          {searchTerm || filter !== "all"
                            ? "Try adjusting your search or filter criteria"
                            : "All registration requests have been processed"}
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <footer className="mt-8 py-6 bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-500">
              © 2023 Jeevika Telemedicine. All rights reserved.
            </p>
            <div className="flex items-center space-x-6 mt-4 md:mt-0">
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Privacy Policy
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Terms of Service
              </a>
              <a href="#" className="text-sm text-gray-500 hover:text-gray-700">
                Support
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default AdminPanel;
