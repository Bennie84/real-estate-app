import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

// Layouts
import MainLayout from '../components/layout/MainLayout'

// Pages - Home
import HomePage from '../pages/home/HomePage'

// Pages - Auth
import LoginPage from '../pages/auth/LoginPage'
import SignUpPage from '../pages/auth/SignUpPage'
import ForgotPasswordPage from '../pages/auth/ForgotPasswordPage'

// Pages - Properties
import PropertiesPage from '../pages/properties/PropertiesPage'
import PropertyDetailPage from '../pages/properties/PropertyDetailPage'

// Pages - Dashboard
import DashboardPage from '../pages/dashboard/DashboardPage'
import DashboardPropertiesPage from '../pages/dashboard/DashboardPropertiesPage'
import DashboardInquiriesPage from '../pages/dashboard/DashboardInquiriesPage'
import DashboardUsersPage from '../pages/dashboard/DashboardUsersPage'

// Only logged in users
const ProtectedRoute = ({ children }) => {
  const { user } = useAuth()
  if (!user) return <Navigate to="/login" replace />
  return children
}

// Only admin users
const AdminRoute = ({ children }) => {
  const { user, isAdmin, loading } = useAuth()
  if (loading) return null
  if (!user) return <Navigate to="/login" replace />
  if (!isAdmin) return <Navigate to="/" replace />
  return children
}

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public routes */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/properties" element={<PropertiesPage />} />
          <Route path="/properties/:id" element={<PropertyDetailPage />} />
        </Route>

        {/* Auth routes */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Admin routes */}
        <Route path="/dashboard" element={<AdminRoute><DashboardPage /></AdminRoute>} />
        <Route path="/dashboard/properties" element={<AdminRoute><DashboardPropertiesPage /></AdminRoute>} />
        <Route path="/dashboard/inquiries" element={<AdminRoute><DashboardInquiriesPage /></AdminRoute>} />
        <Route path="/dashboard/users" element={<AdminRoute><DashboardUsersPage /></AdminRoute>} />

        {/* Catch all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRoutes