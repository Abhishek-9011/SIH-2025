import React from "react"
import { Stethoscope, Heart, Phone, Mail, MapPin, Clock } from "lucide-react"
import { Link } from "react-router-dom"

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand and Description */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <div className="bg-blue-600 p-2 rounded-lg">
                <Stethoscope className="h-6 w-6 text-white" />
              </div>
              <span className="text-lg font-bold">Jeevika</span>
            </div>
            <p className="text-slate-300 mb-4 leading-relaxed">
              Providing quality healthcare through secure telemedicine services. 
              Connect with certified doctors from the comfort of your home.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Phone className="h-4 w-4" />
                </div>
                <span className="sr-only">Call</span>
              </a>
              <a
                href="#"
                className="text-slate-300 hover:text-white transition-all duration-300 hover:scale-110"
              >
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <Mail className="h-4 w-4" />
                </div>
                <span className="sr-only">Email</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/doctors" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Heart className="h-4 w-4 mr-2" />
                  Find a Doctor
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Stethoscope className="h-4 w-4 mr-2" />
                  Our Services
                </Link>
              </li>
              <li>
                <Link to="/appointment" className="hover:text-white transition-all duration-300 hover:translate-x-1 flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link to="/emergency" className=" transition-all duration-300 hover:translate-x-1 flex items-center text-red-300 hover:text-red-100">
                  <Phone className="h-4 w-4 mr-2" />
                  Emergency Care
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Information */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact Info</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start">
                <Phone className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Emergency Line</p>
                  <p className="text-red-300">1-800-JEEVIKA</p>
                </div>
              </li>
              <li className="flex items-start">
                <Mail className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Email Us</p>
                  <p>support@jeevika.com</p>
                </div>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Location</p>
                  <p>123 Health Ave, Medical District</p>
                </div>
              </li>
              <li className="flex items-start">
                <Clock className="h-4 w-4 mr-2 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">24/7 Service</p>
                  <p>Always available for emergencies</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Policies and Resources */}
          <div>
            <h3 className="font-semibold text-lg mb-4">Policies & Resources</h3>
            <ul className="space-y-3 text-slate-300">
              <li>
                <Link to="/privacy" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/hipaa" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  HIPAA Compliance
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  FAQ & Help Center
                </Link>
              </li>
              <li>
                <Link to="/insurance" className="hover:text-white transition-all duration-300 hover:translate-x-1">
                  Insurance Information
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Emergency Notice and Copyright */}
        <div className="border-t border-slate-700 mt-8 pt-8 text-center">
          <div className="bg-red-900/30 p-3 rounded-lg mb-4">
            <p className="text-red-100 text-sm font-medium">
              <span className="font-bold">Emergency Notice:</span> If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately.
            </p>
          </div>
          <p className="text-slate-400">
            &copy; {new Date().getFullYear()} Jeevika Telemedicine. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}