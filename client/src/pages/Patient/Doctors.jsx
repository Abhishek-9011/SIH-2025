import React, { useState, useEffect } from 'react';
import { Search, MapPin, Clock, Star, Calendar, Phone, Mail, CheckCircle, Filter } from 'lucide-react';

const DoctorsListingPage = () => {
  // Sample data matching your API response structure
  const [doctorsData] = useState({
    "success": true,
    "count": 4,
    "doctors": [
      {
        "_id": "68b148384540bc8a59ceee2c",
        "name": "Dr. John Smith",
        "email": "john@example.com",
        "role": "doctor",
        "language": "english",
        "doctorInfo": {
          "hospital": "Apollo Hospital",
          "specialization": "Cardiologist",
          "roles": ["Consultant"],
          "_id": "68b148384540bc8a59ceee2d"
        },
        "documents": ["https://res.cloudinary.com/de6ajjs9w/image/upload/v1756448824/wng7uwpwfrjyz23w4ubx.jpg"],
        "isVerified": true,
        "status": "approved",
        "createdAt": "2025-08-29T06:27:04.394Z",
        "updatedAt": "2025-08-29T16:33:28.916Z",
        "__v": 0,
        "rating": 4.8,
        "experience": "15+ years",
        "nextAvailable": "Today 2:00 PM"
      },
      {
        "_id": "68b148384540bc8a59ceee2d",
        "name": "Dr. Sarah Johnson",
        "email": "sarah@example.com",
        "role": "doctor",
        "language": "english",
        "doctorInfo": {
          "hospital": "Max Healthcare",
          "specialization": "Dermatologist",
          "roles": ["Senior Consultant"],
          "_id": "68b148384540bc8a59ceee2e"
        },
        "documents": ["https://via.placeholder.com/150"],
        "isVerified": true,
        "status": "approved",
        "createdAt": "2025-08-29T06:27:04.394Z",
        "updatedAt": "2025-08-29T16:33:28.916Z",
        "__v": 0,
        "rating": 4.9,
        "experience": "12+ years",
        "nextAvailable": "Tomorrow 10:00 AM"
      },
      {
        "_id": "68b148384540bc8a59ceee2f",
        "name": "Dr. Michael Chen",
        "email": "michael@example.com",
        "role": "doctor",
        "language": "english",
        "doctorInfo": {
          "hospital": "Fortis Hospital",
          "specialization": "Orthopedic Surgeon",
          "roles": ["Head of Department"],
          "_id": "68b148384540bc8a59ceee2g"
        },
        "documents": ["https://via.placeholder.com/150"],
        "isVerified": true,
        "status": "approved",
        "createdAt": "2025-08-29T06:27:04.394Z",
        "updatedAt": "2025-08-29T16:33:28.916Z",
        "__v": 0,
        "rating": 4.7,
        "experience": "20+ years",
        "nextAvailable": "Today 4:30 PM"
      },
      {
        "_id": "68b148384540bc8a59ceee2h",
        "name": "Dr. Emily Rodriguez",
        "email": "emily@example.com",
        "role": "doctor",
        "language": "english",
        "doctorInfo": {
          "hospital": "AIIMS Delhi",
          "specialization": "Pediatrician",
          "roles": ["Consultant"],
          "_id": "68b148384540bc8a59ceee2i"
        },
        "documents": ["https://via.placeholder.com/150"],
        "isVerified": true,
        "status": "approved",
        "createdAt": "2025-08-29T06:27:04.394Z",
        "updatedAt": "2025-08-29T16:33:28.916Z",
        "__v": 0,
        "rating": 4.9,
        "experience": "8+ years",
        "nextAvailable": "Today 6:00 PM"
      }
    ]
  });

  const [searchTerm, setSearchTerm] = useState('');
  const [filterSpecialization, setFilterSpecialization] = useState('');
  const [filteredDoctors, setFilteredDoctors] = useState(doctorsData.doctors);

  // Get unique specializations for filter
  const specializations = [...new Set(doctorsData.doctors.map(doctor => doctor.doctorInfo.specialization))];

  useEffect(() => {
    let filtered = doctorsData.doctors;

    if (searchTerm) {
      filtered = filtered.filter(doctor => 
        doctor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.doctorInfo.specialization.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.doctorInfo.hospital.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (filterSpecialization) {
      filtered = filtered.filter(doctor => 
        doctor.doctorInfo.specialization === filterSpecialization
      );
    }

    setFilteredDoctors(filtered);
  }, [searchTerm, filterSpecialization, doctorsData.doctors]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const DoctorCard = ({ doctor }) => (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden">
      <div className="p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center overflow-hidden">
              {doctor.documents && doctor.documents[0] ? (
                <img 
                  src={doctor.documents[0]} 
                  alt={doctor.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div className="w-full h-full flex items-center justify-center text-white text-xl font-semibold">
                {doctor.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
          </div>
          
          <div className="flex-grow">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
                {doctor.isVerified && (
                  <CheckCircle className="w-5 h-5 text-green-500" />
                )}
              </div>
              <div className="flex items-center space-x-1 bg-yellow-50 px-2 py-1 rounded-full">
                <Star className="w-4 h-4 text-yellow-400 fill-current" />
                <span className="text-sm font-medium text-yellow-700">{doctor.rating}</span>
              </div>
            </div>
            
            <div className="space-y-2 mb-4">
              <p className="text-blue-600 font-semibold">{doctor.doctorInfo.specialization}</p>
              <div className="flex items-center space-x-1 text-gray-600">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">{doctor.doctorInfo.hospital}</span>
              </div>
              <div className="flex items-center space-x-1 text-gray-600">
                <Clock className="w-4 h-4" />
                <span className="text-sm">{doctor.experience} experience</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mb-4">
              {doctor.doctorInfo.roles.map((role, index) => (
                <span 
                  key={index}
                  className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-medium rounded-full"
                >
                  {role}
                </span>
              ))}
              <span className="px-3 py-1 bg-green-100 text-green-700 text-xs font-medium rounded-full capitalize">
                {doctor.language}
              </span>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="text-sm">
                <span className="text-gray-500">Next available:</span>
                <div className="text-green-600 font-medium">{doctor.nextAvailable}</div>
              </div>
              <div className="space-x-2">
                <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors text-sm font-medium">
                  View Profile
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Find Your Doctor</h1>
              <p className="text-gray-600 mt-1">Choose from our verified healthcare professionals</p>
            </div>
            <div className="mt-4 md:mt-0">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                {doctorsData.count} doctors available
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search and Filters */}
        <div className="mb-8 space-y-4 md:space-y-0 md:flex md:items-center md:space-x-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search by name, specialization, or hospital..."
              className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="relative">
            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <select
              value={filterSpecialization}
              onChange={(e) => setFilterSpecialization(e.target.value)}
              className="pl-10 pr-8 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white min-w-48"
            >
              <option value="">All Specializations</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Results Summary */}
        <div className="mb-6">
          <p className="text-gray-600">
            Showing {filteredDoctors.length} of {doctorsData.count} doctors
          </p>
        </div>

        {/* Doctors Grid */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2">
          {filteredDoctors.map(doctor => (
            <DoctorCard key={doctor._id} doctor={doctor} />
          ))}
        </div>

        {filteredDoctors.length === 0 && (
          <div className="text-center py-12">
        <div className="w-24 h-24 mx-auto bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No doctors found</h3>
            <p className="text-gray-600">Try adjusting your search criteria or filters</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DoctorsListingPage;