import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard,
  Building2,
  MessageSquare,
  Users,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";
import { signOut } from "../../services/supabase/authService";
import toast from "react-hot-toast";

const navItems = [
  {
    label: "Overview",
    path: "/dashboard",
    icon: <LayoutDashboard size={18} />,
  },
  {
    label: "Properties",
    path: "/dashboard/properties",
    icon: <Building2 size={18} />,
  },
  {
    label: "Inquiries",
    path: "/dashboard/inquiries",
    icon: <MessageSquare size={18} />,
  },
  {
    label: "Users",
    path: "/dashboard/users",
    icon: <Users size={18} />,
  },
];

const DashboardLayout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { profile } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await signOut();
      toast.success("Logged out successfully");
      navigate("/");
    } catch (error) {
      toast.error("Error logging out");
    }
  };

  const isActive = (path) => location.pathname === path;

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo */}
      <div className="p-6 border-b border-gray-800">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
            <Building2 size={18} className="text-white" />
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-heading font-bold text-white text-sm">
              LuxEstate
            </span>
            <span className="text-[10px] text-primary-500 tracking-widest uppercase">
              Admin Panel
            </span>
          </div>
        </Link>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 p-4 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            onClick={() => setSidebarOpen(false)}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200 group ${
              isActive(item.path)
                ? "bg-primary-600 text-white shadow-lg shadow-primary-600/20"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            {item.icon}
            {item.label}
            {isActive(item.path) && (
              <ChevronRight size={14} className="ml-auto" />
            )}
          </Link>
        ))}
      </nav>

      {/* User Info + Logout */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-4 py-3 mb-2">
          <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
            <span className="text-white text-xs font-bold">
              {profile?.full_name?.charAt(0) || "A"}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-white text-sm font-medium truncate">
              {profile?.full_name || "Admin"}
            </div>
            <div className="text-gray-500 text-xs truncate">
              {profile?.email}
            </div>
          </div>
        </div>
        <button
          onClick={handleSignOut}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/10 hover:text-red-400 transition-all duration-200"
        >
          <LogOut size={18} />
          Sign Out
        </button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-950 flex">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-gray-900 flex-col border-r border-gray-800 shrink-0">
        <SidebarContent />
      </aside>

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black/50 z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -256 }}
              animate={{ x: 0 }}
              exit={{ x: -256 }}
              transition={{ type: "spring", damping: 25 }}
              className="fixed left-0 top-0 bottom-0 w-64 bg-gray-900 z-50 lg:hidden border-r border-gray-800"
            >
              <SidebarContent />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-4 flex items-center justify-between shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-3 ml-auto">
            <Link
              to="/"
              className="text-sm text-gray-400 hover:text-white transition-colors"
            >
              ← View Website
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
