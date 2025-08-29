import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/Theme/theme-toggle"
import { Stethoscope, Users, Shield, Heart, Clock, Calendar, ArrowRight, CheckCircle, Star, Menu, X } from "lucide-react"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import Header from "@/Component/Common/Header"
import Footer from "@/Component/Common/Footer"
import Chatbot from "@/components/Chatbot"

export default function LandingPage() {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <Header/>
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 bg-gradient-to-br from-blue-50 via-background to-teal-50 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-200 rounded-full blur-3xl opacity-20 animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div
            className={`max-w-4xl mx-auto text-center transition-all duration-1000 ${isVisible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"}`}
          >
            <Badge variant="secondary" className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
              Trusted by 50,000+ patients
            </Badge>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Quality Healthcare{" "}
              <span className="text-blue-600 bg-gradient-to-r from-blue-600 to-teal-600 bg-clip-text ">
                From Home
              </span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto leading-relaxed">
              Connect with certified doctors instantly through our secure telemedicine platform. 
              Get personalized medical care without leaving your home.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/signup">
                <Button
                  size="lg"
                  className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Book an Appointment
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link to="/login"> 
                <Button
                  variant="outline"
                  size="lg"
                  className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all duration-300 border-2 border-blue-300 hover:bg-blue-50 text-blue-600"
                >
                  Patient Login
                </Button>
              </Link>
            </div>
            <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>HIPAA Compliant</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>24/7 Availability</span>
              </div>
              <div className="flex items-center space-x-2 hover:scale-105 transition-transform duration-200">
                <CheckCircle className="h-4 w-4 text-blue-600" />
                <span>Board-Certified Doctors</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Comprehensive Telemedicine Services</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We provide a wide range of healthcare services to meet all your medical needs
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Stethoscope className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Virtual Consultations</CardTitle>
                <CardDescription>
                  Connect with doctors via secure video calls for diagnosis, treatment plans, and medical advice
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Easy Scheduling</CardTitle>
                <CardDescription>
                  Book appointments at your convenience with our easy-to-use scheduling system
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Shield className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Secure Health Records</CardTitle>
                <CardDescription>
                  Access your medical history, prescriptions, and test results in one secure place
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Chronic Care Management</CardTitle>
                <CardDescription>
                  Ongoing support and monitoring for chronic conditions like diabetes, hypertension, and more
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Clock className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>24/7 Urgent Care</CardTitle>
                <CardDescription>
                  Get immediate medical attention for urgent health concerns, anytime day or night
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-2 group">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Users className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle>Specialist Referrals</CardTitle>
                <CardDescription>
                  Get connected with specialists for specific health conditions when needed
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">How Jeevika Works</h2>
            <p className="text-xl text-muted-foreground">
              Getting quality healthcare has never been easier
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create an Account</h3>
              <p className="text-muted-foreground">
                Sign up and complete your medical profile in minutes
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book an Appointment</h3>
              <p className="text-muted-foreground">
                Choose a doctor and select a convenient time slot
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-2xl font-bold text-blue-600">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Connect with a Doctor</h3>
              <p className="text-muted-foreground">
                Have your consultation via secure video call and receive treatment
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">Patient Success Stories</h2>
            <p className="text-xl text-muted-foreground">
              Hear from our patients about their experiences with Jeevika
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Jeevika saved me a trip to the ER during a severe migraine. The doctor was able to prescribe medication that my husband could pick up. Amazing service!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">PJ</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Priya Joshi</p>
                    <p className="text-sm text-muted-foreground">Patient for 2 years</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "As someone with diabetes, having regular check-ins with my doctor through Jeevika has helped me manage my condition much better."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">RS</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Robert Smith</p>
                    <p className="text-sm text-muted-foreground">Patient for 1 year</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:shadow-lg transition-all duration-300 hover:scale-105 group">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 fill-yellow-500 text-yellow-500 group-hover:scale-110 transition-transform duration-200"
                      style={{ transitionDelay: `${i * 50}ms` }}
                    />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "I live in a rural area with limited access to specialists. Jeevika has connected me with top doctors without the long travel times."
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                    <span className="text-blue-600 font-semibold">MG</span>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">Maria Gonzalez</p>
                    <p className="text-sm text-muted-foreground">Patient for 6 months</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-teal-600"></div>
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Ready to Experience Modern Healthcare?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of patients who trust Jeevika for their healthcare needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/signup">
              <Button
                size="lg"
                className="text-lg px-8 py-6 hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl bg-white text-blue-600 hover:bg-blue-50"
              >
                Sign Up Now
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/login">
              <Button
                variant="outline"
                size="lg"
                className="text-lg px-8 py-6 bg-transparent hover:scale-105 transition-all duration-300 border-2 border-white text-white hover:bg-white/10"
              >
                Patient Login
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Emergency Notice */}
      <div className="bg-red-600 text-white py-4 text-center">
        <div className="container mx-auto px-4">
          <p className="font-medium">
            <span className="font-bold">Emergency Notice:</span> If you are experiencing a medical emergency, please call 911 or go to the nearest emergency room immediately.
          </p>
        </div>
      </div>

      {/* Footer */}
      <Footer/>
      <Chatbot/>

    </div>
  )
}