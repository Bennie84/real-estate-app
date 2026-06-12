// const SignUpPage = () => {
//   return <div className="p-10 text-2xl font-bold">Sign Up Page 📝</div>;
// };
// export default SignUpPage;

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Building2,
  ArrowRight,
  User,
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import toast from "react-hot-toast";
import { signUp } from "../../services/supabase/authService";

// Validation schema
const signUpSchema = z
  .object({
    fullName: z.string().min(2, "Full name must be at least 2 characters"),
    email: z.string().email("Please enter a valid email address"),
    password: z.string().min(6, "Password must be at least 6 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

const SignUpPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(signUpSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signUp(data.email, data.password, data.fullName);
      toast.success(
        "Account created! Please check your email to verify your account.",
      );
      navigate("/login");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">
      {/* Left Side - Image Panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-900 via-primary-700 to-primary-600 items-center justify-center relative overflow-hidden">
        {/* Background decorative circles */}
        <div className="absolute top-[-100px] left-[-100px] w-[400px] h-[400px] bg-white/5 rounded-full" />
        <div className="absolute bottom-[-150px] right-[-100px] w-[500px] h-[500px] bg-white/5 rounded-full" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Building2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Join LuxEstate Today
          </h2>
          <p className="text-primary-100 text-lg leading-relaxed max-w-sm mx-auto">
            Create your free account and start exploring premium properties
            across Nigeria.
          </p>

          {/* Benefits */}
          <div className="mt-10 space-y-4 text-left">
            {[
              "Browse hundreds of premium listings",
              "Save your favorite properties",
              "Get notified of new listings",
              "Contact agents directly",
            ].map((benefit) => (
              <div key={benefit} className="flex items-center gap-3">
                <div className="w-5 h-5 bg-white/20 rounded-full flex items-center justify-center shrink-0">
                  <ArrowRight size={10} className="text-white" />
                </div>
                <span className="text-primary-100 text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Right Side - Form */}
      <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md"
        >
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 mb-8 group w-fit">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-md">
              <Building2 size={20} className="text-white" />
            </div>
            <div className="flex flex-col leading-none">
              <span className="font-heading font-bold text-lg text-gray-900 dark:text-white">
                LuxEstate
              </span>
              <span className="text-[10px] text-primary-600 font-medium tracking-widest uppercase">
                Premium Properties
              </span>
            </div>
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
              Create an account
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Join thousands of property seekers today
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            {/* Full Name Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Full Name
              </label>
              <div className="relative">
                <User
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("fullName")}
                  type="text"
                  placeholder="John Doe"
                  className={`input-field pl-11 ${errors.fullName ? "border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>
              {errors.fullName && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("email")}
                  type="email"
                  placeholder="you@example.com"
                  className={`input-field pl-11 ${errors.email ? "border-red-400 focus:ring-red-400" : ""}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("password")}
                  type={showPassword ? "text" : "password"}
                  placeholder="Min. 6 characters"
                  className={`input-field pl-11 pr-11 ${errors.password ? "border-red-400 focus:ring-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
                />
                <input
                  {...register("confirmPassword")}
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Repeat your password"
                  className={`input-field pl-11 pr-11 ${errors.confirmPassword ? "border-red-400 focus:ring-red-400" : ""}`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-500 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="btn-primary w-full flex items-center justify-center gap-2 mt-2"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  Create Account
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Login link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Sign in
            </Link>
          </p>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUpPage;