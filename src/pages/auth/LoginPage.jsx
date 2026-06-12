// const LoginPage = () => {
//   return <div className="p-10 text-2xl font-bold">Login Page 🔐</div>;
// };
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Mail, Lock, Eye, EyeOff, Building2, ArrowRight } from 'lucide-react'
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "react-hot-toast";
import { signIn } from '../../services/supabase/authService'


//Validation schema using Zod
const loginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      await signIn(data.email, data.password);
      toast.success('Welcome back!');
      navigate('/');
    } catch (error) {
      toast.error(error.message) || toast.error('Invalid email or password')
    } finally {
      setIsLoading(false);

    }
  }
     

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex">

      {/* Left Side - Form */}
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
              Welcome back
            </h1>
            <p className="text-gray-500 dark:text-gray-400">
              Sign in to your account to continue
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">

            {/* Email Field */}
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('email')}
                  type="email"
                  placeholder="you@example.com"
                  className={`input-field pl-11 ${errors.email ? 'border-red-400 focus:ring-red-400' : ''}`}
                />
              </div>
              {errors.email && (
                <p className="text-red-500 text-xs mt-1">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <Link
                  to="/forgot-password"
                  className="text-xs text-primary-600 hover:text-primary-700 font-medium"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  {...register('password')}
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className={`input-field pl-11 pr-11 ${errors.password ? 'border-red-400 focus:ring-red-400' : ''}`}
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
                <p className="text-red-500 text-xs mt-1">{errors.password.message}</p>
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
                  Sign In
                  <ArrowRight size={18} />
                </>
              )}
            </button>
          </form>

          {/* Sign up link */}
          <p className="text-center text-sm text-gray-500 dark:text-gray-400 mt-6">
            Don't have an account?{' '}
            <Link
              to="/signup"
              className="text-primary-600 hover:text-primary-700 font-semibold"
            >
              Create one free
            </Link>
          </p>
        </motion.div>
      </div>

      {/* Right Side - Image Panel (hidden on mobile) */}
      <div className="hidden lg:flex flex-1 bg-gradient-to-br from-primary-600 via-primary-700 to-primary-900 items-center justify-center relative overflow-hidden">
        
        {/* Background decorative circles */}
        <div className="absolute top-[-100px] right-[-100px] w-[400px] h-[400px] bg-white/5 rounded-full" />
        <div className="absolute bottom-[-150px] left-[-100px] w-[500px] h-[500px] bg-white/5 rounded-full" />

        {/* Content */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="relative z-10 text-center px-12"
        >
          <div className="w-20 h-20 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
            <Building2 size={40} className="text-white" />
          </div>
          <h2 className="text-4xl font-heading font-bold text-white mb-4">
            Find Your Dream Property
          </h2>
          <p className="text-primary-100 text-lg leading-relaxed max-w-sm mx-auto">
            Access thousands of premium properties across Nigeria. Your perfect home is just a click away.
          </p>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-10">
            {[
              { number: '500+', label: 'Properties' },
              { number: '200+', label: 'Happy Clients' },
              { number: '50+', label: 'Locations' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-bold text-white">{stat.number}</div>
                <div className="text-primary-200 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

    </div>
  )
}

export default LoginPage

  









  