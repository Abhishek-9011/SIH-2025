import React from "react";
import { Mail, Building2, Stethoscope, Badge, User, Edit } from "lucide-react";
import DoctorSidebar from "@/components/DoctorSidebar";
const DoctorProfile = () => {
  const doctor = {
    name: "Dr. Sarah Johnson",
    hospital: "Apollo Medical Center",
    email: "sarah.johnson@apollomedical.com",
    role: "Senior Consultant",
    specialization: "Cardiologist",
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div>
        <DoctorSidebar />
      </div>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-6">
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-2xl">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="relative inline-block">
              <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-400 to-indigo-600 flex items-center justify-center shadow-xl">
                <div className="text-5xl">👩‍⚕️</div>
              </div>
              <button className="absolute bottom-2 right-2 bg-white rounded-full p-2 shadow-lg hover:shadow-xl transition-all hover:scale-110">
                <Edit className="w-4 h-4 text-gray-600" />
              </button>
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-2">
              {doctor.name}
            </h1>
            <div className="flex justify-center space-x-4">
              <span className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-semibold">
                {doctor.role}
              </span>
              <span className="bg-indigo-100 text-indigo-800 px-4 py-2 rounded-full text-sm font-semibold">
                {doctor.specialization}
              </span>
            </div>
          </div>

          {/* Doctor Information */}
          <div className="space-y-6">
            {/* Name */}
            <div className="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mr-4">
                <User className="w-6 h-6 text-blue-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Doctor Name
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {doctor.name}
                </p>
              </div>
            </div>

            {/* Hospital */}
            <div className="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mr-4">
                <Building2 className="w-6 h-6 text-green-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Hospital
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {doctor.hospital}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mr-4">
                <Mail className="w-6 h-6 text-purple-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Email
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {doctor.email}
                </p>
              </div>
            </div>

            {/* Role */}
            <div className="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mr-4">
                <Badge className="w-6 h-6 text-orange-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Role
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {doctor.role}
                </p>
              </div>
            </div>

            {/* Specialization */}
            <div className="flex items-center p-6 bg-gray-50 rounded-2xl hover:bg-gray-100 transition-colors">
              <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mr-4">
                <Stethoscope className="w-6 h-6 text-red-600" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-500 uppercase tracking-wide">
                  Specialization
                </p>
                <p className="text-xl font-semibold text-gray-800">
                  {doctor.specialization}
                </p>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="mt-8 text-center">
            <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-2xl font-semibold text-lg hover:shadow-lg hover:scale-105 transition-all duration-200">
              Contact Doctor
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
