import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  Clock,
  Video,
  Phone,
  MessageCircle,
  FileText,
  Pill,
  User,
  Settings,
  Bell,
  Heart,
  Stethoscope,
  TrendingUp,
  MapPin,
  ChevronRight,
  Search,
  Filter,
  Plus,
} from "lucide-react";

export default function HomePage() {
  const [activeTab, setActiveTab] = useState("upcoming");

  // Mock patient data
  const patient = {
    name: "Rahul Sharma",
    age: 42,
    bloodType: "B+",
    lastCheckup: "2023-10-15",
    primaryDoctor: "Dr. Priya Mehta",
  };

  // Mock appointments
  const appointments = [
    {
      id: 1,
      doctor: "Dr. Priya Mehta",
      specialty: "Cardiologist",
      date: "2023-11-20",
      time: "10:30 AM",
      type: "Video Consultation",
      status: "upcoming",
      avatar:
        "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 2,
      doctor: "Dr. Amit Patel",
      specialty: "Dermatologist",
      date: "2023-11-18",
      time: "2:00 PM",
      type: "Voice Call",
      status: "completed",
      avatar:
        "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
    {
      id: 3,
      doctor: "Dr. Sunita Desai",
      specialty: "Gynecologist",
      date: "2023-11-25",
      time: "11:15 AM",
      type: "Chat Consultation",
      status: "upcoming",
      avatar:
        "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=200&q=80",
    },
  ];

  // Mock health data
  const healthStats = [
    { title: "Heart Rate", value: "72 bpm", icon: Heart, trend: "normal" },
    {
      title: "Blood Pressure",
      value: "120/80 mmHg",
      icon: TrendingUp,
      trend: "normal",
    },
    {
      title: "Last Consultation",
      value: "15 days ago",
      icon: Calendar,
      trend: "good",
    },
    { title: "Medications", value: "2 Active", icon: Pill, trend: "normal" },
  ];

  // Mock prescriptions
  const prescriptions = [
    {
      name: "Atorvastatin",
      dosage: "10mg",
      frequency: "Once daily",
      refills: 2,
    },
    {
      name: "Metformin",
      dosage: "500mg",
      frequency: "Twice daily",
      refills: 1,
    },
  ];

  const filteredAppointments = appointments.filter((apt) =>
    activeTab === "all" ? true : apt.status === activeTab
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-xl font-bold text-gray-800">Jeevika</span>
            </div>

            <div className="flex items-center space-x-4">
              <button className="relative p-2 text-gray-500 hover:text-gray-700">
                <Bell className="h-5 w-5" />
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              </button>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-4 w-4 text-blue-600" />
                </div>
                <span className="text-sm font-medium">Rahul Sharma</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex items-center space-x-4 mb-6">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <User className="h-8 w-8 text-blue-600" />
                </div>
                <div>
                  <h2 className="font-bold text-gray-800">{patient.name}</h2>
                  <p className="text-sm text-gray-600">
                    {patient.age} years • {patient.bloodType}
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Last Checkup</span>
                  <span className="font-medium">{patient.lastCheckup}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Primary Doctor</span>
                  <span className="font-medium">{patient.primaryDoctor}</span>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100">
                <Link
                  to="/profile"
                  className="flex items-center justify-between text-sm text-blue-600 hover:text-blue-800"
                >
                  <span>View Complete Profile</span>
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>

            {/* Navigation */}
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-700 mb-3">Menu</h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    to="/appointments"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <Calendar className="h-5 w-5" />
                    <span>Appointments</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/prescriptions"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <Pill className="h-5 w-5" />
                    <span>Prescriptions</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/medical-records"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <FileText className="h-5 w-5" />
                    <span>Medical Records</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/patient/doctors"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <User className="h-5 w-5" />
                    <span>All Doctors</span>
                  </Link>
                </li>
                <li>
                  <Link
                    to="/settings"
                    className="flex items-center space-x-3 p-2 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-md"
                  >
                    <Settings className="h-5 w-5" />
                    <span>Settings</span>
                  </Link>
                </li>
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            {/* Welcome Section */}
            <div className="bg-gradient-to-r from-blue-600 to-teal-600 rounded-lg shadow-sm p-6 text-white mb-6">
              <h1 className="text-2xl font-bold mb-2">Welcome back, Rahul!</h1>
              <p className="mb-4">
                How are you feeling today? Would you like to schedule a
                consultation?
              </p>
              <Link to="/book-appointment">
                <button className="bg-white text-blue-600 font-semibold py-2 px-4 rounded-lg hover:bg-blue-50 transition-all duration-300 flex items-center">
                  Book New Appointment <Plus className="ml-2 h-4 w-4" />
                </button>
              </Link>
            </div>

            {/* Health Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {healthStats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={index}
                    className="bg-white rounded-lg shadow-sm p-4"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <Icon className="h-5 w-5 text-blue-600" />
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          stat.trend === "good"
                            ? "bg-green-100 text-green-800"
                            : stat.trend === "normal"
                            ? "bg-blue-100 text-blue-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {stat.trend}
                      </span>
                    </div>
                    <h3 className="text-sm text-gray-600">{stat.title}</h3>
                    <p className="font-semibold text-gray-800">{stat.value}</p>
                  </div>
                );
              })}
            </div>

            {/* Appointments Section */}
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4 sm:mb-0">
                  My Appointments
                </h2>
                <div className="flex space-x-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search appointments..."
                      className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <button className="p-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                    <Filter className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Appointment Tabs */}
              <div className="flex border-b border-gray-200 mb-6">
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "upcoming"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("upcoming")}
                >
                  Upcoming
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "completed"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("completed")}
                >
                  Completed
                </button>
                <button
                  className={`px-4 py-2 font-medium text-sm ${
                    activeTab === "all"
                      ? "text-blue-600 border-b-2 border-blue-600"
                      : "text-gray-500 hover:text-gray-700"
                  }`}
                  onClick={() => setActiveTab("all")}
                >
                  All Appointments
                </button>
              </div>

              {/* Appointments List */}
              <div className="space-y-4">
                {filteredAppointments.map((appointment) => (
                  <div
                    key={appointment.id}
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-4">
                        <img
                          src={appointment.avatar}
                          alt={appointment.doctor}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h3 className="font-semibold text-gray-800">
                            {appointment.doctor}
                          </h3>
                          <p className="text-sm text-gray-600">
                            {appointment.specialty}
                          </p>
                          <div className="flex items-center space-x-4 mt-2">
                            <div className="flex items-center text-sm text-gray-500">
                              <Calendar className="h-4 w-4 mr-1" />
                              {appointment.date}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              <Clock className="h-4 w-4 mr-1" />
                              {appointment.time}
                            </div>
                            <div className="flex items-center text-sm text-gray-500">
                              {appointment.type === "Video Consultation" && (
                                <Video className="h-4 w-4 mr-1" />
                              )}
                              {appointment.type === "Voice Call" && (
                                <Phone className="h-4 w-4 mr-1" />
                              )}
                              {appointment.type === "Chat Consultation" && (
                                <MessageCircle className="h-4 w-4 mr-1" />
                              )}
                              {appointment.type}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col items-end">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            appointment.status === "upcoming"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-green-100 text-green-800"
                          }`}
                        >
                          {appointment.status === "upcoming"
                            ? "Upcoming"
                            : "Completed"}
                        </span>
                        {appointment.status === "upcoming" && (
                          <button className="mt-2 text-blue-600 text-sm font-medium hover:text-blue-800">
                            Join Now
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {filteredAppointments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No appointments found</p>
                    <Link
                      to="/book-appointment"
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      Book your first appointment
                    </Link>
                  </div>
                )}
              </div>
            </div>

            {/* Prescriptions Section */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-800">
                  Current Prescriptions
                </h2>
                <Link
                  to="/prescriptions"
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                >
                  View all <ChevronRight className="h-4 w-4" />
                </Link>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {prescriptions.map((prescription, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-lg p-4"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-800">
                          {prescription.name}
                        </h3>
                        <p className="text-sm text-gray-600">
                          {prescription.dosage} • {prescription.frequency}
                        </p>
                      </div>
                      <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                        {prescription.refills} refill
                        {prescription.refills !== 1 ? "s" : ""} left
                      </span>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-100 flex justify-between">
                      <button className="text-blue-600 text-sm font-medium hover:text-blue-800">
                        Order Refill
                      </button>
                      <button className="text-gray-500 text-sm font-medium hover:text-gray-700">
                        View Details
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {prescriptions.length === 0 && (
                <div className="text-center py-8">
                  <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No active prescriptions</p>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}
