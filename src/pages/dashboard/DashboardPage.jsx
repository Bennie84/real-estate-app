// const DashboardPage = () => {
//   return <div className="p-10 text-2xl font-bold">Dashboard Page ⚙️</div>;
// };
// export default DashboardPage;

import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Building2,
  MessageSquare,
  Users,
  TrendingUp,
  ArrowRight,
  Eye,
  Plus,
} from "lucide-react";
import DashboardLayout from "../../components/layout/DashboardLayout";
import { supabase } from "../../services/supabase/supabaseClient";
import { dummyProperties } from "../../data/dummyProperties";

const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const DashboardPage = () => {
  const [stats, setStats] = useState({
    totalProperties: 0,
    totalInquiries: 0,
    totalUsers: 0,
    featuredProperties: 0,
  });
  const [recentInquiries, setRecentInquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      // Fetch counts from Supabase
      const [propertiesRes, inquiriesRes, usersRes] = await Promise.all([
        supabase.from("properties").select("id", { count: "exact" }),
        supabase.from("inquiries").select("id", { count: "exact" }),
        supabase.from("profiles").select("id", { count: "exact" }),
      ]);

      // Fetch recent inquiries
      const { data: inquiries } = await supabase
        .from("inquiries")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(5);

      setStats({
        totalProperties: propertiesRes.count || dummyProperties.length,
        totalInquiries: inquiriesRes.count || 0,
        totalUsers: usersRes.count || 0,
        featuredProperties: dummyProperties.filter((p) => p.is_featured).length,
      });

      setRecentInquiries(inquiries || []);
    } catch (error) {
      console.error("Error fetching stats:", error);
      // Use dummy stats if Supabase fails
      setStats({
        totalProperties: dummyProperties.length,
        totalInquiries: 0,
        totalUsers: 1,
        featuredProperties: dummyProperties.filter((p) => p.is_featured).length,
      });
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    {
      label: "Total Properties",
      value: stats.totalProperties,
      icon: <Building2 size={22} />,
      color: "bg-blue-500/10 text-blue-400",
      link: "/dashboard/properties",
    },
    {
      label: "Total Inquiries",
      value: stats.totalInquiries,
      icon: <MessageSquare size={22} />,
      color: "bg-green-500/10 text-green-400",
      link: "/dashboard/inquiries",
    },
    {
      label: "Total Users",
      value: stats.totalUsers,
      icon: <Users size={22} />,
      color: "bg-purple-500/10 text-purple-400",
      link: "/dashboard/users",
    },
    {
      label: "Featured Properties",
      value: stats.featuredProperties,
      icon: <TrendingUp size={22} />,
      color: "bg-orange-500/10 text-orange-400",
      link: "/dashboard/properties",
    },
  ];

  return (
    <DashboardLayout>
      <motion.div initial="hidden" animate="visible" variants={stagger}>
        {/* Header */}
        <motion.div variants={fadeUp} className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-heading font-bold text-white mb-1">
            Dashboard Overview
          </h1>
          <p className="text-gray-400">
            Welcome back! Here's what's happening.
          </p>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          variants={stagger}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8"
        >
          {statCards.map((stat) => (
            <motion.div key={stat.label} variants={fadeUp}>
              <Link
                to={stat.link}
                className="block bg-gray-900 border border-gray-800 rounded-2xl p-5 hover:border-gray-700 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className={`w-10 h-10 rounded-xl flex items-center justify-center ${stat.color}`}
                  >
                    {stat.icon}
                  </div>
                  <ArrowRight
                    size={16}
                    className="text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200"
                  />
                </div>
                <div className="text-3xl font-bold text-white mb-1">
                  {loading ? (
                    <div className="h-8 w-12 bg-gray-800 rounded animate-pulse" />
                  ) : (
                    stat.value
                  )}
                </div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Quick Actions + Recent Inquiries */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Quick Actions */}
          <motion.div variants={fadeUp}>
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <h2 className="font-heading font-semibold text-white mb-4">
                Quick Actions
              </h2>
              <div className="space-y-3">
                <Link
                  to="/dashboard/properties"
                  className="flex items-center gap-3 p-3 bg-primary-600/10 hover:bg-primary-600/20 border border-primary-600/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                    <Plus size={16} className="text-primary-400" />
                  </div>
                  <span className="text-primary-400 text-sm font-medium">
                    Add New Property
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-primary-400 ml-auto group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/dashboard/inquiries"
                  className="flex items-center gap-3 p-3 bg-green-500/10 hover:bg-green-500/20 border border-green-500/20 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                    <MessageSquare size={16} className="text-green-400" />
                  </div>
                  <span className="text-green-400 text-sm font-medium">
                    View Inquiries
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-green-400 ml-auto group-hover:translate-x-1 transition-transform"
                  />
                </Link>

                <Link
                  to="/"
                  className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 border border-gray-700 rounded-xl transition-all duration-200 group"
                >
                  <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Eye size={16} className="text-gray-400" />
                  </div>
                  <span className="text-gray-400 text-sm font-medium">
                    View Website
                  </span>
                  <ArrowRight
                    size={14}
                    className="text-gray-400 ml-auto group-hover:translate-x-1 transition-transform"
                  />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Recent Inquiries */}
          <motion.div variants={fadeUp} className="lg:col-span-2">
            <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-heading font-semibold text-white">
                  Recent Inquiries
                </h2>
                <Link
                  to="/dashboard/inquiries"
                  className="text-primary-400 text-sm hover:text-primary-300 transition-colors"
                >
                  View all
                </Link>
              </div>

              {recentInquiries.length === 0 ? (
                <div className="text-center py-10">
                  <MessageSquare
                    size={32}
                    className="text-gray-600 mx-auto mb-3"
                  />
                  <p className="text-gray-500 text-sm">No inquiries yet</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recentInquiries.map((inquiry) => (
                    <div
                      key={inquiry.id}
                      className="flex items-start gap-3 p-3 bg-gray-800 rounded-xl"
                    >
                      <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-primary-400 text-xs font-bold">
                          {inquiry.name?.charAt(0) || "?"}
                        </span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <span className="text-white text-sm font-medium truncate">
                            {inquiry.name}
                          </span>
                          <span className="text-gray-500 text-xs shrink-0">
                            {new Date(inquiry.created_at).toLocaleDateString()}
                          </span>
                        </div>
                        <p className="text-gray-400 text-xs mt-0.5 truncate">
                          {inquiry.message}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </DashboardLayout>
  );
};

export default DashboardPage; 
