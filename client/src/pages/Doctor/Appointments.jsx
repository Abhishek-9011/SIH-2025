import React, { useState } from "react";
import { Calendar, Clock, Check, RotateCcw, X } from "lucide-react";
import DoctorSidebar from "@/components/DoctorSidebar";

const AppointmentRequests = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      name: "Aman Verma",
      type: "Follow-up consultation",
      date: "2025-09-01",
      time: "10:30",
      initials: "AV",
    },
    {
      id: 2,
      name: "Riya Shah",
      type: "ECG review",
      date: "2025-09-02",
      time: "14:00",
      initials: "RS",
    },
    {
      id: 3,
      name: "Mohit Kumar",
      type: "New appointment",
      date: "2025-09-03",
      time: "09:00",
      initials: "MK",
    },
  ]);

  const [notification, setNotification] = useState({
    show: false,
    message: "",
    type: "",
  });

  const showNotification = (message, type) => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification({ show: false, message: "", type: "" });
    }, 3000);
  };

  const handleAction = (action, appointment) => {
    let message = "";
    let type = "success";

    switch (action) {
      case "approve":
        message = `Appointment approved for ${appointment.name}`;
        setAppointments((prev) =>
          prev.filter((app) => app.id !== appointment.id)
        );
        break;
      case "reschedule":
        message = `Reschedule request sent to ${appointment.name}`;
        break;
      case "reject":
        message = `Appointment rejected for ${appointment.name}`;
        type = "error";
        setAppointments((prev) =>
          prev.filter((app) => app.id !== appointment.id)
        );
        break;
    }

    showNotification(message, type);
  };

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-50">
      <div>
        <DoctorSidebar />
      </div>
      <div className="max-w-6xl mx-auto p-10 bg-gray-50 min-h-screen">
        {/* Header */}
        <h1 className="text-3xl font-semibold text-gray-900 mb-10">Requests</h1>

        {/* Appointments List */}
        <div className="space-y-4">
          {appointments.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-600 mb-2">
                No pending requests
              </h3>
              <p className="text-gray-500">
                All appointment requests have been processed.
              </p>
            </div>
          ) : (
            appointments.map((appointment) => (
              <div
                key={appointment.id}
                className="bg-white rounded-xl p-6 shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200"
              >
                <div className="flex items-center justify-between">
                  {/* Patient Info */}
                  <div className="flex items-center flex-1">
                    {/* Avatar */}
                    <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center text-gray-600 font-medium text-lg mr-4">
                      {appointment.initials}
                    </div>

                    {/* Patient Details */}
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 mb-1">
                        {appointment.name}
                      </h3>
                      <p className="text-gray-500 text-sm mb-2">
                        {appointment.type}
                      </p>
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{appointment.date}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{appointment.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex items-center space-x-3 ml-6">
                    <button
                      onClick={() => handleAction("approve", appointment)}
                      className="bg-green-600 hover:bg-green-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <Check className="w-4 h-4" />
                      <span>Approve</span>
                    </button>

                    <button
                      onClick={() => handleAction("reject", appointment)}
                      className="bg-red-600 hover:bg-red-700 text-white px-5 py-2.5 rounded-lg font-medium transition-colors duration-200 flex items-center space-x-1"
                    >
                      <X className="w-4 h-4" />
                      <span>Reject</span>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Notification */}
        {notification.show && (
          <div
            className={`fixed top-6 right-6 px-6 py-4 rounded-lg text-white font-medium shadow-lg transform transition-transform duration-300 z-50 ${
              notification.type === "success" ? "bg-green-600" : "bg-red-600"
            }`}
          >
            {notification.message}
          </div>
        )}
      </div>
    </div>
  );
};

export default AppointmentRequests;
