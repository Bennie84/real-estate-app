// const DashboardInquiriesPage = () => {
//   return <div className="text-white text 2xl font-bold">Dasboard Inquiries</div> 
// }
// export default DashboardInquiriesPage 


import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { MessageSquare, Search, Trash2, Mail, Phone, X } from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { supabase } from '../../services/supabase/supabaseClient'
import toast from 'react-hot-toast'

const DashboardInquiriesPage = () => {
  const [inquiries, setInquiries] = useState([])
  const [loading, setLoading] = useState(false)
  const [search, setSearch] = useState('')
  const [selectedInquiry, setSelectedInquiry] = useState(null)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchInquiries()
  }, [])

  const fetchInquiries = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('inquiries')
        .select('*')
        .order('created_at', { ascending: false })
      if (error) throw error
      setInquiries(data || [])
    } catch (error) {
      console.error('Error fetching inquiries:', error)
      setInquiries([])
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('inquiries')
        .delete()
        .eq('id', id)
      if (error) throw error
      toast.success('Inquiry deleted')
      setDeleteConfirm(null)
      setSelectedInquiry(null)
      fetchInquiries()
    } catch (error) {
      toast.error('Failed to delete inquiry')
    }
  }

  const filteredInquiries = inquiries.filter((i) =>
    i.name?.toLowerCase().includes(search.toLowerCase()) ||
    i.email?.toLowerCase().includes(search.toLowerCase()) ||
    i.message?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div>
          <h1 className="text-2xl font-heading font-bold text-white mb-1">
            Inquiries
          </h1>
          <p className="text-gray-400 text-sm">
            {inquiries.length} total inquiries
          </p>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search inquiries..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : filteredInquiries.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
            <MessageSquare size={40} className="text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No inquiries yet</p>
            <p className="text-gray-500 text-sm mt-1">
              Inquiries from property pages will appear here
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

            {/* Inquiries List */}
            <div className="lg:col-span-1 space-y-3">
              {filteredInquiries.map((inquiry) => (
                <motion.div
                  key={inquiry.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  onClick={() => setSelectedInquiry(inquiry)}
                  className={`bg-gray-900 border rounded-xl p-4 cursor-pointer transition-all duration-200 ${
                    selectedInquiry?.id === inquiry.id
                      ? 'border-primary-500 bg-primary-500/5'
                      : 'border-gray-800 hover:border-gray-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <div className="w-8 h-8 bg-primary-600/20 rounded-full flex items-center justify-center shrink-0">
                        <span className="text-primary-400 text-xs font-bold">
                          {inquiry.name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <div className="text-white text-sm font-medium">
                          {inquiry.name}
                        </div>
                        <div className="text-gray-500 text-xs">
                          {new Date(inquiry.created_at).toLocaleDateString()}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-gray-400 text-xs line-clamp-2">
                    {inquiry.message}
                  </p>
                </motion.div>
              ))}
            </div>

            {/* Inquiry Detail */}
            <div className="lg:col-span-2">
              {selectedInquiry ? (
                <motion.div
                  key={selectedInquiry.id}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="bg-gray-900 border border-gray-800 rounded-2xl p-6 sticky top-24"
                >
                  {/* Detail Header */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-primary-600/20 rounded-full flex items-center justify-center">
                        <span className="text-primary-400 text-lg font-bold">
                          {selectedInquiry.name?.charAt(0) || '?'}
                        </span>
                      </div>
                      <div>
                        <div className="text-white font-semibold">
                          {selectedInquiry.name}
                        </div>
                        <div className="text-gray-500 text-sm">
                          {new Date(selectedInquiry.created_at).toLocaleDateString('en-NG', {
                            weekday: 'long',
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => setDeleteConfirm(selectedInquiry.id)}
                      className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>

                  {/* Contact Info */}
                  <div className="space-y-3 mb-6">
                    <a
                      href={"mailto:" + selectedInquiry.email}
                      className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group"
                    >
                      <div className="w-8 h-8 bg-primary-600/20 rounded-lg flex items-center justify-center">
                        <Mail size={14} className="text-primary-400" />
                      </div>
                      <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                        {selectedInquiry.email}
                      </span>
                    </a>

                    {selectedInquiry.phone && (
                      <a
                        href={"tel:" + selectedInquiry.phone}
                        className="flex items-center gap-3 p-3 bg-gray-800 hover:bg-gray-700 rounded-xl transition-colors group"
                      >
                        <div className="w-8 h-8 bg-green-500/20 rounded-lg flex items-center justify-center">
                          <Phone size={14} className="text-green-400" />
                        </div>
                        <span className="text-gray-300 text-sm group-hover:text-white transition-colors">
                          {selectedInquiry.phone}
                        </span>
                      </a>
                    )}
                  </div>

                  {/* Message */}
                  <div className="bg-gray-800 rounded-xl p-4">
                    <div className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-3">
                      Message
                    </div>
                    <p className="text-gray-200 text-sm leading-relaxed">
                      {selectedInquiry.message}
                    </p>
                  </div>

                  {/* Reply Button */}
                  <a
                    href={`mailto:${selectedInquiry.email}?subject=Re: Property Inquiry`}
                    className="mt-4 w-full flex items-center justify-center gap-2 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors"
                  >
                    <Mail size={16} />
                    Reply via Email
                  </a>
                </motion.div>
              ) : (
                <div className="bg-gray-900 border border-gray-800 rounded-2xl p-12 text-center">
                  <MessageSquare size={32} className="text-gray-600 mx-auto mb-3" />
                  <p className="text-gray-500 text-sm">
                    Select an inquiry to view details
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Delete Confirmation */}
      {deleteConfirm && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full">
            <h3 className="text-white font-heading font-bold text-lg mb-2">
              Delete Inquiry?
            </h3>
            <p className="text-gray-400 text-sm mb-6">
              This action cannot be undone.
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setDeleteConfirm(null)}
                className="flex-1 px-4 py-2.5 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDelete(deleteConfirm)}
                className="flex-1 px-4 py-2.5 bg-red-600 hover:bg-red-700 text-white text-sm font-medium rounded-xl transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  )
}

export default DashboardInquiriesPage
