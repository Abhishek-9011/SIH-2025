import { useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Stethoscope, Shield, Heart } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../utils/authSlice";

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
  rememberMe: z.boolean().optional(),
});

export default function Login() {
  const { isAuthenticated, error } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    control,
    setError,
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      rememberMe: false,
    },
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/");
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    if (error) {
      setError("root", { 
        type: "manual", 
        message: error 
      });
    }
  }, [error, setError]);

  const onSubmit = async (data) => {
    const loginData = {
      email: data.email,
      password: data.password,
    };

    try {
      await dispatch(loginUser(loginData));
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-teal-50 dark:from-gray-950 dark:via-gray-900 dark:to-gray-950 p-4">
      <div className="flex flex-col md:flex-row w-full max-w-4xl shadow-xl rounded-2xl overflow-hidden bg-white dark:bg-gray-900">
        {/* Left side - Branding and information */}
        <div className="w-full md:w-2/5 bg-gradient-to-br from-blue-600 to-teal-600 text-white p-8 flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <Stethoscope className="h-8 w-8 mr-2" />
            <h1 className="text-2xl font-bold">Jeevika Telemedicine</h1>
          </div>
          <h2 className="text-2xl font-semibold mb-4">Your Health, Our Priority</h2>
          <p className="mb-6 opacity-90">
            Access quality healthcare from the comfort of your home. Connect with certified doctors instantly.
          </p>
          <div className="space-y-4">
            <div className="flex items-center">
              <Shield className="h-5 w-5 mr-2 text-blue-200" />
              <span>Secure & HIPAA Compliant</span>
            </div>
            <div className="flex items-center">
              <Heart className="h-5 w-5 mr-2 text-blue-200" />
              <span>24/7 Access to Healthcare Professionals</span>
            </div>
          </div>
        </div>

        {/* Right side - Login form */}
        <div className="w-full md:w-3/5 p-8">
          <Card className="border-0 shadow-none">
            <CardHeader className="space-y-1 text-center">
              <CardTitle className="text-2xl font-bold text-blue-600">
                Welcome to Jeevika
              </CardTitle>
              <CardDescription className="text-gray-600 dark:text-gray-400">
                Sign in to access your medical dashboard
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.root && (
                <div className="bg-red-50 text-red-700 p-3 rounded-md text-sm">
                  {errors.root.message}
                </div>
              )}
              
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Email Input */}
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    {...register("email")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500"
                  />
                  {errors.email && <p className="text-sm text-red-500">{errors.email.message}</p>}
                </div>

                {/* Password Input with Eye */}
                <div className="space-y-2 relative">
                  <Label htmlFor="password" className="text-gray-700">Password</Label>
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    {...register("password")}
                    className="transition-all duration-200 focus:ring-2 focus:ring-blue-500 pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-3 top-7 flex items-center text-slate-400"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                  {errors.password && (
                    <p className="text-sm text-red-500">{errors.password.message}</p>
                  )}
                </div>

                {/* Remember Me + Forgot */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Controller
                      name="rememberMe"
                      control={control}
                      render={({ field }) => (
                        <Checkbox
                          id="rememberMe"
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      )}
                    />
                    <Label htmlFor="rememberMe" className="text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </Label>
                  </div>
                  <Link
                    to="/forgot-password"
                    className="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200"
                  >
                    Forgot password?
                  </Link>
                </div>

                {/* Sign In Button */}
                <Button
                  type="submit"
                  className="w-full bg-blue-600 hover:bg-blue-700 transition-all duration-200 transform hover:scale-[1.02]"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing In..." : "Sign In"}
                </Button>
              </form>

              {/* Separator */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <Separator className="w-full" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-white dark:bg-gray-900 px-2 text-gray-500">New to Jeevika?</span>
                </div>
              </div>

              {/* Sign Up Link */}
              <div className="text-center">
                <Link to="/signup">
                  <Button variant="outline" className="w-full border-blue-200 text-blue-600 hover:bg-blue-50">
                    Create Account
                  </Button>
                </Link>
              </div>

              {/* Emergency notice */}
              <div className="mt-6 p-3 bg-red-50 border border-red-100 rounded-md text-center">
                <p className="text-xs text-red-700">
                  For medical emergencies, please call 911 or go to the nearest emergency room.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}