import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, Stethoscope, Shield } from "lucide-react";
import { registerUser } from "../utils/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const signupSchema = z
  .object({
    fullName: z.string().min(3, "Full name must be at least 2 characters"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .regex(/[A-Z]/, "Must include an uppercase letter")
      .regex(/[a-z]/, "Must include a lowercase letter")
      .regex(/\d/, "Must include a number"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

function Signup() {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signupSchema),
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/dashboard");
    }
  }, [isAuthenticated, navigate]);

  const onSubmit = (data) => {
    const userData = {
      name: data.fullName,
      email: data.email,
      password: data.password,
    };
    console.log(userData);
    dispatch(registerUser(userData));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-slate-50 to-teal-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-5xl shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
        {/* Left side - Branding and information */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-teal-700 text-white p-10 flex flex-col justify-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-white"></div>
            <div className="absolute bottom-20 right-10 w-16 h-16 rounded-full bg-white"></div>
            <div className="absolute top-1/2 left-1/4 w-12 h-12 rounded-full bg-white"></div>
          </div>
          
          <div className="relative z-10">
            <div className="flex items-center mb-8">
              <div className="bg-white/20 p-2 rounded-lg mr-3">
                <Stethoscope className="h-8 w-8" />
              </div>
              <h1 className="text-3xl font-bold">Jeevika</h1>
            </div>
            
            <h2 className="text-2xl font-semibold mb-6">Create Your Account</h2>
            <p className="mb-8 text-blue-100 leading-relaxed">
              Join thousands of patients who trust Jeevika for their healthcare needs. 
              Get started with secure, convenient telemedicine services.
            </p>
            
            <div className="space-y-5">
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <Shield className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">HIPAA Compliant</h3>
                  <p className="text-blue-100 text-sm mt-1">Your health information is protected and secure</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <User className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Easy Profile Setup</h3>
                  <p className="text-blue-100 text-sm mt-1">Quick registration to access care immediately</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-white/20 p-2 rounded-full mr-4 flex-shrink-0">
                  <Mail className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Instant Access</h3>
                  <p className="text-blue-100 text-sm mt-1">Start scheduling appointments right away</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right side - Signup form */}
        <div className="w-full md:w-3/5 p-10">
          <div className="max-w-md mx-auto">
            <div className="text-center mb-8">
              <h1 className="text-3xl font-bold text-slate-800 dark:text-white mb-2">Create Account</h1>
              <p className="text-slate-600 dark:text-slate-400">
                Join Jeevika to access personalized healthcare services
              </p>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Full Name */}
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-slate-700 dark:text-slate-300">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="fullName"
                    type="text"
                    {...register("fullName")}
                    autoComplete="name"
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 py-2 h-12"
                    placeholder="Enter your full name"
                  />
                </div>
                {errors.fullName && <p className="text-sm text-red-500 mt-1">{errors.fullName.message}</p>}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-700 dark:text-slate-300">Email Address</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    autoComplete="email"
                    className="pl-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 py-2 h-12"
                    placeholder="Enter your email address"
                  />
                </div>
                {errors.email && <p className="text-sm text-red-500 mt-1">{errors.email.message}</p>}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-700 dark:text-slate-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                    autoComplete="new-password"
                    className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 py-2 h-12"
                    placeholder="Create a secure password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              </div>

              {/* Confirm Password */}
              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-slate-700 dark:text-slate-300">Confirm Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? "text" : "password"}
                    {...register("confirmPassword")}
                    autoComplete="new-password"
                    className="pl-10 pr-10 transition-all duration-200 focus:ring-2 focus:ring-blue-500 py-2 h-12"
                    placeholder="Confirm your password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-sm text-red-500 mt-1">{errors.confirmPassword.message}</p>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 py-2 h-12 text-base font-medium"
              >
                {loading ? (
                  <div className="flex items-center justify-center">
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                    Creating Account...
                  </div>
                ) : (
                  <>
                    Create Account <ArrowRight className="ml-2 w-4 h-4" />
                  </>
                )}
              </Button>
            </form>

            {/* Separator */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <Separator className="w-full" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white dark:bg-slate-900 px-3 text-slate-500 text-sm">Already have an account?</span>
              </div>
            </div>

            {/* Login Link */}
            <div className="text-center">
              <Link to="/login">
                <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50 dark:hover:bg-slate-800 py-2 h-12">
                  Sign In to Your Account
                </Button>
              </Link>
            </div>

            {/* Privacy notice */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800 rounded-lg">
              <p className="text-xs text-blue-700 dark:text-blue-300 text-center">
                By creating an account, you agree to our Terms of Service and acknowledge our Privacy Policy. 
                Your health information is protected under HIPAA regulations.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Signup;