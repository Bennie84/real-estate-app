// const DashboardPropertiesPage = () => {
//   return (
//     <div className="text-white text-2xl font-bold">Dashboard Properties</div>
//   );
// };
// export default DashboardPropertiesPage;

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Plus, Search, Edit, Trash2, Eye,
  Building2, X, ChevronDown
} from 'lucide-react'
import DashboardLayout from '../../components/layout/DashboardLayout'
import { supabase } from '../../services/supabase/supabaseClient'
import { deleteProperty, uploadPropertyImage, addProperty, updateProperty } from '../../services/supabase/propertyService'
import { dummyProperties } from '../../data/dummyProperties'
import { formatPrice } from '../../utils/formatPrice'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext'

const categories = ['Apartment', 'Duplex', 'Land', 'Commercial', 'Short-let']
const statuses = ['For Sale', 'For Rent']

const emptyForm = {
  title: '',
  description: '',
  price: '',
  location: '',
  category: 'Apartment',
  status: 'For Sale',
  bedrooms: '',
  bathrooms: '',
  square_feet: '',
  features: '',
  is_featured: false,
}

const DashboardPropertiesPage = () => {
  const { user } = useAuth()
  const [properties, setProperties] = useState([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')
  const [showForm, setShowForm] = useState(false)
  const [editingProperty, setEditingProperty] = useState(null)
  const [formData, setFormData] = useState(emptyForm)
  const [images, setImages] = useState([])
  const [imageFiles, setImageFiles] = useState([])
  const [submitting, setSubmitting] = useState(false)
  const [deleteConfirm, setDeleteConfirm] = useState(null)

  useEffect(() => {
    fetchProperties()
  }, [])

  const fetchProperties = async () => {
    setLoading(true)
    try {
      const { data, error } = await supabase
        .from('properties')
        .select('*')
        .order('created_at', { ascending: false })

        if (error) throw error
        
      if (data && data.length > 0) {
        setProperties(data)
      } else {
        setProperties(dummyProperties)
      }
    } catch (error) {
      setProperties(dummyProperties)
    } finally {
      setLoading(false)
    }
  }

  const handleEdit = (property) => {
    setEditingProperty(property)
    setFormData({
      title: property.title || '',
      description: property.description || '',
      price: property.price || '',
      location: property.location || '',
      category: property.category || 'Apartment',
      status: property.status || 'For Sale',
      bedrooms: property.bedrooms || '',
      bathrooms: property.bathrooms || '',
      square_feet: property.square_feet || '',
      features: property.features?.join(', ') || '',
      is_featured: property.is_featured || false,
    })
    setImages(property.images || [])
    setShowForm(true)
  }

  const handleCloseForm = () => {
    setShowForm(false)
    setEditingProperty(null)
    setFormData(emptyForm)
    setImages([])
    setImageFiles([])
  }

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files)
    setImageFiles(files)
    // Preview images
    const previews = files.map((file) => URL.createObjectURL(file))
    setImages(previews)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)

    try {
      // Build property data object
      const propertyData = {
        ...formData,
        price: parseFloat(formData.price),
        bedrooms: formData.bedrooms ? parseInt(formData.bedrooms) : null,
        bathrooms: formData.bathrooms ? parseInt(formData.bathrooms) : null,
        square_feet: formData.square_feet ? parseFloat(formData.square_feet) : null,
        features: formData.features
          ? formData.features.split(',').map((f) => f.trim()).filter(Boolean)
          : [],
        user_id: user.id,
        images: images,
      }

      if (editingProperty) {
        // Update existing property
        await updateProperty(editingProperty.id, propertyData)
        toast.success('Property updated successfully!')
      } else {
        // Add new property
        const newProperty = await addProperty(propertyData)

        // Upload images if any
        if (imageFiles.length > 0) {
          const imageUrls = await Promise.all(
            imageFiles.map((file) => uploadPropertyImage(file, newProperty.id))
          )
          await updateProperty(newProperty.id, { images: imageUrls })
        }
        toast.success('Property added successfully!')
      }

      handleCloseForm()
      fetchProperties()
    } catch (error) {
      toast.error(error.message || 'Something went wrong')
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    try {
      await deleteProperty(id)
      toast.success('Property deleted successfully!')
      setDeleteConfirm(null)
      fetchProperties()
    } catch (error) {
      toast.error('Failed to delete property')
    }
  }

  const filteredProperties = properties.filter((p) =>
    p.title?.toLowerCase().includes(search.toLowerCase()) ||
    p.location?.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <DashboardLayout>
      <div className="space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-heading font-bold text-white mb-1">
              Properties
            </h1>
            <p className="text-gray-400 text-sm">
              {properties.length} total properties
            </p>
          </div>
          <button
            onClick={() => setShowForm(true)}
            className="flex items-center gap-2 px-4 py-2.5 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-all duration-200 shadow-lg"
          >
            <Plus size={18} />
            Add Property
          </button>
        </div>

        {/* Search */}
        <div className="relative max-w-sm">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search properties..."
            className="w-full pl-9 pr-4 py-2.5 bg-gray-900 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Properties Table */}
        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center">
              <div className="w-8 h-8 border-2 border-primary-600 border-t-transparent rounded-full animate-spin mx-auto" />
            </div>
          ) : filteredProperties.length === 0 ? (
            <div className="p-12 text-center">
              <Building2 size={40} className="text-gray-600 mx-auto mb-3" />
              <p className="text-gray-400">No properties found</p>
              <button
                onClick={() => setShowForm(true)}
                className="mt-4 text-primary-400 text-sm hover:text-primary-300"
              >
                Add your first property
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-800">
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                      Property
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4 hidden sm:table-cell">
                      Category
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4 hidden md:table-cell">
                      Price
                    </th>
                    <th className="text-left text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4 hidden lg:table-cell">
                      Status
                    </th>
                    <th className="text-right text-xs font-medium text-gray-400 uppercase tracking-wider px-6 py-4">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-800">
                  {filteredProperties.map((property) => (
                    <tr
                      key={property.id}
                      className="hover:bg-gray-800/50 transition-colors duration-150"
                    >
                      {/* Property Info */}
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 rounded-xl overflow-hidden shrink-0 bg-gray-800">
                            {property.images?.[0] ? (
                              <img
                                src={property.images[0]}
                                alt={property.title}
                                className="w-full h-full object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Building2 size={20} className="text-gray-600" />
                              </div>
                            )}
                          </div>
                          <div className="min-w-0">
                            <div className="text-white text-sm font-medium truncate max-w-[200px]">
                              {property.title}
                            </div>
                            <div className="text-gray-400 text-xs truncate max-w-[200px]">
                              {property.location}
                            </div>
                          </div>
                        </div>
                      </td>

                      {/* Category */}
                      <td className="px-6 py-4 hidden sm:table-cell">
                        <span className="text-gray-300 text-sm">
                          {property.category}
                        </span>
                      </td>

                      {/* Price */}
                      <td className="px-6 py-4 hidden md:table-cell">
                        <span className="text-primary-400 text-sm font-medium">
                          {formatPrice(property.price)}
                        </span>
                      </td>

                      {/* Status */}
                      <td className="px-6 py-4 hidden lg:table-cell">
                        <span className={`text-xs font-medium px-2.5 py-1 rounded-lg ${
                          property.status === 'For Sale'
                            ? 'bg-blue-500/10 text-blue-400'
                            : 'bg-yellow-500/10 text-yellow-400'
                        }`}>
                          {property.status}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="px-6 py-4">
                        <div className="flex items-center justify-end gap-2">
                           <a
                            href={`/properties/${property.id}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition-all duration-200"
                          >
                            <Eye size={16} />
                          </a>
                          <button
                            onClick={() => handleEdit(property)}
                            className="p-2 text-gray-400 hover:text-primary-400 hover:bg-primary-400/10 rounded-lg transition-all duration-200"
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            onClick={() => setDeleteConfirm(property.id)}
                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all duration-200"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <AnimatePresence>
        {deleteConfirm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl p-6 max-w-sm w-full shadow-2xl"
            >
              <h3 className="text-white font-heading font-bold text-lg mb-2">
                Delete Property?
              </h3>
              <p className="text-gray-400 text-sm mb-6">
                This action cannot be undone. The property will be permanently removed.
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
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Add/Edit Property Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-start justify-center p-4 overflow-y-auto"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.95, opacity: 0, y: 20 }}
              className="bg-gray-900 border border-gray-700 rounded-2xl w-full max-w-2xl my-8 shadow-2xl"
            >
              {/* Form Header */}
              <div className="flex items-center justify-between p-6 border-b border-gray-800">
                <h2 className="text-white font-heading font-bold text-xl">
                  {editingProperty ? 'Edit Property' : 'Add New Property'}
                </h2>
                <button
                  onClick={handleCloseForm}
                  className="p-2 text-gray-400 hover:text-white hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Form Body */}
              <form onSubmit={handleSubmit} className="p-6 space-y-5">

                {/* Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="e.g. Luxury 4 Bedroom Duplex"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Location */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Location *
                  </label>
                  <input
                    type="text"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    placeholder="e.g. Lekki Phase 1, Lagos"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Price */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Price (₦) *
                  </label>
                  <input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="e.g. 85000000"
                    required
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Category + Status */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Category *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full appearance-none px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                      >
                        {categories.map((cat) => (
                          <option key={cat} value={cat}>{cat}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Status *
                    </label>
                    <div className="relative">
                      <select
                        value={formData.status}
                        onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                        className="w-full appearance-none px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                      >
                        {statuses.map((s) => (
                          <option key={s} value={s}>{s}</option>
                        ))}
                      </select>
                      <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                    </div>
                  </div>
                </div>

                {/* Bedrooms + Bathrooms + Square Feet */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Bedrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bedrooms}
                      onChange={(e) => setFormData({ ...formData, bedrooms: e.target.value })}
                      placeholder="e.g. 4"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Bathrooms
                    </label>
                    <input
                      type="number"
                      value={formData.bathrooms}
                      onChange={(e) => setFormData({ ...formData, bathrooms: e.target.value })}
                      placeholder="e.g. 3"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1.5">
                      Sq Feet
                    </label>
                    <input
                      type="number"
                      value={formData.square_feet}
                      onChange={(e) => setFormData({ ...formData, square_feet: e.target.value })}
                      placeholder="e.g. 3200"
                      className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>

                {/* Description */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe the property..."
                    rows={3}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                  />
                </div>

                {/* Features */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Features & Amenities
                  </label>
                  <input
                    type="text"
                    value={formData.features}
                    onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                    placeholder="Swimming Pool, Gym, Generator, Security (comma separated)"
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl text-white placeholder-gray-500 text-sm focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>

                {/* Images */}
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1.5">
                    Property Images
                  </label>
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageChange}
                    className="w-full px-4 py-3 bg-gray-800 border border-gray-700 border-dashed rounded-xl text-gray-400 text-sm focus:outline-none cursor-pointer file:mr-4 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-primary-600 file:text-white hover:file:bg-primary-700"
                  />
                  {/* Image Previews */}
                  {images.length > 0 && (
                    <div className="flex gap-2 mt-3 flex-wrap">
                      {images.map((img, index) => (
                        <div key={index} className="relative">
                          <img
                            src={img}
                            alt={`Preview ${index + 1}`}
                            className="w-16 h-16 object-cover rounded-lg border border-gray-700"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              setImages(images.filter((_, i) => i !== index))
                              setImageFiles(imageFiles.filter((_, i) => i !== index))
                            }}
                            className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-red-500 rounded-full flex items-center justify-center"
                          >
                            <X size={10} className="text-white" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Featured Toggle */}
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, is_featured: !formData.is_featured })}
                    className={`w-11 h-6 rounded-full transition-colors duration-200 relative ${
                      formData.is_featured ? 'bg-primary-600' : 'bg-gray-700'
                    }`}
                  >
                    <span className={`absolute top-0.5 w-5 h-5 bg-white rounded-full shadow transition-transform duration-200 ${
                      formData.is_featured ? 'translate-x-5' : 'translate-x-0.5'
                    }`} />
                  </button>
                  <label className="text-sm text-gray-300">
                    Feature this property on homepage
                  </label>
                </div>

                {/* Submit */}
                <div className="flex gap-3 pt-2">
                  <button
                    type="button"
                    onClick={handleCloseForm}
                    className="flex-1 px-4 py-3 bg-gray-800 hover:bg-gray-700 text-white text-sm font-medium rounded-xl transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submitting}
                    className="flex-1 px-4 py-3 bg-primary-600 hover:bg-primary-700 text-white text-sm font-semibold rounded-xl transition-colors flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      editingProperty ? 'Update Property' : 'Add Property'
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </DashboardLayout>
  )
}

export default DashboardPropertiesPage