import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Home, Building2, LogIn, UserPlus, LayoutDashboard, LogOut, User, Users, Phone, Sun, Moon } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { signOut } from '../../services/supabase/authService'
import toast from 'react-hot-toast'
import { useTheme } from '../../context/ThemeContext'
//import { Sun, Moon } from 'lucide-react'

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const { user, isAdmin, profile } = useAuth()
  const { isDark, toggleTheme } = useTheme()
  const location = useLocation()
  const navigate = useNavigate()

  // Change navbar style when scrolled
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false)
  }, [location])

  const handleSignOut = async () => {
    //console.log('sign out clicked')
    try {
      // Clear local state immediately without waiting for supabase
      await Promise.race([
        signOut(),
        new Promise((resolve) => setTimeout(resolve, 2000)) // Fallback timeout
      ])
      //console.log('Signed out successfully')
    } catch (error) {
      console.log('Sign out error:', error)
    } finally {
      // Always clear and redirect regardless of supabase response/
      // clear supabase session from localStorage manually
      localStorage.removeItem('sb-iyocdltntagffhclmwxp-auth-token')
      toast.success('Logged out successfully')
      navigate('/')
      window.location.reload()
    }
  }

  const navLinks = [
    { label: 'Home', path: '/', icon: <Home size={16} /> },
    { label: 'Properties', path: '/properties', icon: <Building2 size={16} /> },
    { label: 'About', path: '/#about', icon: <User size={16} /> },
    { label: 'Contact', path: '/#contact', icon: <Phone size={16} /> },
  ]

  const isActive = (path) => location.pathname === path

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'bg-white/95 dark:bg-gray-950/95 backdrop-blur-md shadow-lg shadow-black/5'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">

            {/* Logo */}
            <Link to="/" className="flex items-center gap-2 group">
            <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center shadow-md group-hover:bg-primary-700 transition-colors duration-200">
                <Building2 size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-lg text-gray-900 dark:text-white tracking-tight">
                  LuxEstate
                </span>
                <span className="text-[10px] text-primary-600 font-medium tracking-widest uppercase">
                  Premium Properties
                </span>
              </div>
            </Link>

            {/* Desktop Nav Links */}
            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={(e) => handleNavClick(e, link.path)}
                  className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                    isActive(link.path)
                      ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-800'
                  }`}
                >
                  {link.icon}
                  {link.label}
                </Link>
              ))}
            </div>

            {/* Desktop Auth Buttons */}
            <div className="hidden md:flex items-center gap-3">
              {/* Dark mode toggle */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
              >
                {isDark ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              {user ? (
                <>
                  {/* User info */}
                  <div className="flex items-center gap-2 px-3 py-1.5 bg-gray-100 dark:bg-gray-800 rounded-lg">
                    <div className="w-7 h-7 bg-primary-600 rounded-full flex items-center justify-center">
                      <User size={14} className="text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                      {profile?.full_name?.split(' ')[0] || 'User'}
                    </span>
                  </div>

                  {/* Admin Dashboard link */}
                  {isAdmin && (
                    <Link
                      to="/dashboard"
                      className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200"
                    >
                      <LayoutDashboard size={16} />
                      Dashboard
                    </Link>
                  )}

                  {/* Logout button */}
                  <button
                    onClick={handleSignOut}
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-medium text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
                  >
                    <LogIn size={16} />
                    Login
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center gap-1.5 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl shadow-md hover:shadow-lg transition-all duration-200 active:scale-95"
                  >
                    <UserPlus size={16} />
                    Sign Up
                  </Link>
                </>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
            >
              {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3, ease: 'easeInOut' }}
              className="md:hidden bg-white dark:bg-gray-950 border-t border-gray-100 dark:border-gray-800 overflow-hidden"
            >
              <div className="px-4 py-4 space-y-2">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={(e) => handleNavClick(e, link.path)}
                    className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive(link.path)
                        ? 'bg-primary-50 text-primary-600 dark:bg-primary-900/30 dark:text-primary-400'
                        : 'text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800'
                    }`}
                  >
                    {link.icon}
                    {link.label}
                  </Link>
                ))}

                <div className="pt-2 border-t border-gray-100 dark:border-gray-800 space-y-2">
                    {/* Dark mode toggle */}
                    <button
                      onClick={toggleTheme}
                      className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-colors duration-200"
                    >
                      {isDark ? <Sun size={16} /> : <Moon size={16} />}
                      {isDark ? 'Light Mode' : 'Dark Mode'}
                    </button>
                  {user ? (
                    <>
                      {isAdmin && (
                        <Link
                          to="/dashboard"
                          className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-primary-600 hover:bg-primary-50 dark:hover:bg-primary-900/30 transition-all duration-200"
                        >
                          <LayoutDashboard size={16} />
                          Dashboard
                        </Link>
                      )}
                      <button
                        onClick={handleSignOut}
                        className="w-full flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 transition-all duration-200"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </>
                  ) : (
                    <>
                      <Link
                        to="/login"
                        className="flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 hover:bg-gray-50 dark:text-gray-300 dark:hover:bg-gray-800 transition-all duration-200"
                      >
                        <LogIn size={16} />
                        Login
                      </Link>
                      <Link
                        to="/signup"
                        className="flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200"
                      >
                        <UserPlus size={16} />
                        Sign Up
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Spacer to prevent content hiding behind fixed navbar */}
      <div className="h-20" /> 
    </>
  )
}

export default Navbar
