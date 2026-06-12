import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Users, Search, Shield, User } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { supabase } from '../../services/supabase/supabaseClient'
import toast from 'react-hot-toast'

const DashboardUsersPage = () => {
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetchUsers()
  }, [])

  const fetchUsers = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setUsers(data || [])
    } catch (error) {
      console.error('Error fetching users:', error)
      setUsers([])
    } finally {
      setLoading(false)
    }
  }

  const handleRoleChange = async (userId, newRole) => {
    try {
      const { error } = await supabase
        .from('profiles')
        .update({ role: newRole })
        .eq('id', userId)
      if (error) throw error
      toast.success(`User role updated to ${newRole}`)
      fetchUsers()
    } catch (error) {
      toast.error('Failed to update role')
    }
  }

  const filteredUsers = users.filter((u) =>
    u.full_name?.toLowerCase().includes(search.toLowerCase()) ||
    u.email?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1">
            Users
          </h1>
          <p className="text-gray-400 text-sm">
            {users.length} registered users
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search users..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Users Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : filteredUsers.length === 0 ? (
            <div className="p-12 text-center">
              <Users size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No users found</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                      User
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                      Email
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">
                      Joined
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                      Role
                    </th>
                    <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredUsers.map((user) => (
                    <motion.tr
                      key={user.id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      {/* User Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 bg-primary-600/20 rounded-full flex items-center justify-center shrink-0">
                            <span className="text-primary-400 text-sm font-bold">
                              {user.full_name?.charAt(0) || '?'}
                            </span>
                          </div>
                          <div>
                            <div className="text-white text-sm font-medium">
                              {user.full_name || 'No name'}
                            </div>
                            <div className="text-gray-500 text-xs sm:hidden">
                              {user.email}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-gray-300 text-sm">
                          {user.email}
                        </span>
                      </td>

                      {/* Joined */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-gray-400 text-sm">
                          {user.created_at
                            ? new Date(user.created_at).toLocaleDateString()
                            : 'N/A'}
                        </span>
                      </td>

                      {/* Role Badge */}
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg ${
                          user.role === 'admin'
                            ? 'bg-primary-500/10 text-primary-400'
                            : 'bg-gray-700 text-gray-400'
                        }`}>
                          {user.role === 'admin'
                            ? <Shield size={12} />
                            : <User size={12} />
                          }
                          {user.role || 'user'}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end">
                          {user.role === 'admin' ? (
                            <button
                              onClick={() => handleRoleChange(user.id, 'user')}
                              className="text-xs px-3 py-1.5 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-lg transition-colors"
                            >
                              Remove Admin
                            </button>
                          ) : (
                            <button
                              onClick={() => handleRoleChange(user.id, 'admin')}
                              className="text-xs px-3 py-1.5 bg-primary-600/20 hover:bg-primary-600/30 text-primary-400 rounded-lg transition-colors"
                            >
                              Make Admin
                            </button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  )
}

export default DashboardUsersPage