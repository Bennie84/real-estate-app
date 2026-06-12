// const ForgotPasswordPage = () => {
//   return <div className="p-10 text-2xl font-bold">Forgot Password Page 🔑</div>;
// };
// export default ForgotPasswordPage;

import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Mail, Building2, ArrowLeft, ArrowRight } from 'lucide-react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import toast from 'react-hot-toast'
import { resetPassword } from '../../services/supabase/authService'

const forgotSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
})

const ForgotPasswordPage = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [emailSent, setEmailSent] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data) => {
    setIsLoading(true)
    try {
      await resetPassword(data.email)
      setEmailSent(true)
      toast.success('Reset link sent to your email!')
    } catch (error) {
      toast.error(error.message || 'Something went wrong. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 mb-8 w-fit">
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

        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl p-8">
          {!emailSent ? (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-2xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                  Forgot your password?
                </h1>
                <p className="text-gray-500 dark:text-gray-400 text-sm">
                  No worries! Enter your email and we'll send you a reset link.
                </p>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
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

                <button
                  type="submit"
                  disabled={isLoading}
                  className="btn-primary w-full flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      Send Reset Link
                      <ArrowRight size={18} />
                    </>
                  )}
                </button>
              </form>
            </>
          ) : (
            // Success state
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="text-center py-4"
            >
              <div className="w-16 h-16 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail size={28} className="text-green-600 dark:text-green-400" />
              </div>
              <h2 className="text-xl font-heading font-bold text-gray-900 dark:text-white mb-2">
                Check your email!
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-sm mb-6">
                We sent a password reset link to your email address. Check your inbox and follow the instructions.
              </p>
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-semibold text-sm"
              >
                Back to login
              </Link>
            </motion.div>
          )}

          {/* Back to login */}
          {!emailSent && (
            <div className="mt-6 text-center">
              <Link
                to="/login"
                className="flex items-center justify-center gap-1.5 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft size={16} />
                Back to login
              </Link>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  )
}

export default ForgotPasswordPage