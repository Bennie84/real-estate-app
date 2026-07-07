// const PropertyDetailPage = () => {
//   return <div className="p-10 text-2xl font-bold">Property Detail Page 🏡</div>;
// };
// export default PropertyDetailPage;
import { addFavourite, removeFavourite, checkIsFavourited} from '../../services/supabase/favouritesService'
import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  MapPin, Bed, Bath, Square, ArrowLeft,
  Heart, Share2, Phone, Mail, MessageCircle,
  ChevronLeft, ChevronRight, Check
} from 'lucide-react'
import { useAuth } from '../../context/AuthContext'
import { getPropertyById } from '../../services/supabase/propertyService'
import { submitInquiry } from '../../services/supabase/inquiryService'
import { dummyProperties } from '../../data/dummyProperties'
import { formatPrice } from '../../utils/formatPrice'
import toast from 'react-hot-toast'

const PropertyDetailPage = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { user } = useAuth()
  const [property, setProperty] = useState(null)
  const [loading, setLoading] = useState(true)
  const [currentImage, setCurrentImage] = useState(0)
  const [isFavorited, setIsFavorited] = useState(false)
  const [showInquiryForm, setShowInquiryForm] = useState(false)
  const [inquiryData, setInquiryData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    fetchProperty()
  }, [id])

  useEffect(() => {
    const checkFavourite = async () => {
     if (user && property) {
      const result = await checkIsFavourited(user.id, property.id)
      setIsFavourited(result)
    }
    }
    checkFavourite()
  }, [user, property])

  const fetchProperty = async () => {
    setLoading(true)
    try {
      // First check dmmy data
      const dummy = dummyProperties.find((p) => p.id === id)
      if (dummy) {
        setProperty(dummy)
        setLoading(false)
        return
      }
      // If not in dummy data, try supabase
      const data = await getPropertyById(id)
      setProperty(data)
    } catch (error) {
      toast.error('Property not found')
      navigate('/properties')
    } finally {
      setLoading(false)
    }
  }
  const handleFavorite = async () => {
    if (!user) {
      toast.error('Please login to save favorites')
      navigate('/login')
      return
    }
    try {
      if (isFavourited) {
        await removeFavourite(user.id, property.id)
        setIsFavourited(false)
        toast.success('Removed from favourites')
      } else {
        await addFavourite(user.id, property.id)
        setIsFavourited(true)
        toast.success('Added to favourites')
      }
    } catch (error) {
      if (error.message.includes('dummy')) {
        toast.error('Favourites only work with real properties added by admin')
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href)
    toast.success('Link copied to clipboard!')
  }

  const handleInquirySubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await submitInquiry({
        name: inquiryData.name,
        email: inquiryData.email,
        phone: inquiryData.phone,
        message: inquiryData.message,
        property_id: property.id,
        user_id: user?.id || null,
      })
      toast.success('Inquiry sent! We will contact you soon.')
      setShowInquiryForm(false)
      setInquiryData({ name: '', email: '', phone: '', message: '' })
    } catch (error) {
      console.log('Inquiry error:', error)
      console.log('Inquiry error message:', error.message)
      console.log('Inquiry error details:', JSON.stringify(error))
      toast.error('Failed to send inquiry. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const nextImage = () => {
    setCurrentImage((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    )
  }

  const prevImage = () => {
    setCurrentImage((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    )
  }

  // Loading skeleton
  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-pulse">
        <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-32 mb-6" />
        <div className="h-96 bg-gray-200 dark:bg-gray-800 rounded-2xl mb-8" />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div className="h-32 bg-gray-200 dark:bg-gray-800 rounded" />
          </div>
          <div className="h-64 bg-gray-200 dark:bg-gray-800 rounded-2xl" />
        </div>
      </div>
    )
  }

  if (!property) return null

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

        {/* Back button */}
        <button
          onClick={() => navigate('/properties')}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 mb-6 transition-colors"
        >
          <ArrowLeft size={18} />
          <span className="text-sm font-medium">Back to Properties</span>
        </button>

        {/* Image Gallery */}
        <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 lg:h-[500px] mb-8 group">
          <img
            src={property.images?.[currentImage] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
            alt={property.title}
            className="w-full h-full object-cover transition-transform duration-500"
          />

          {/* Image overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

          {/* Navigation arrows - only show if multiple images */}
          {property.images?.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <ChevronLeft size={20} className="text-gray-800" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 hover:bg-white"
              >
                <ChevronRight size={20} className="text-gray-800" />
              </button>
            </>
          )}

          {/* Image counter */}
          {property.images?.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5">
              {property.images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentImage(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-200 ${
                    currentImage === index
                      ? 'bg-white w-4'
                      : 'bg-white/50'
                  }`}
                />
              ))}
            </div>
          )}

          {/* Action buttons */}
          <div className="absolute top-4 right-4 flex gap-2">
            <button
              onClick={handleShare}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <Share2 size={18} className="text-gray-700" />
            </button>
            <button
              onClick={handleFavorite}
              className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white transition-colors"
            >
              <Heart
                size={18}
                className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-700'}
              />
            </button>
          </div>

          {/* Status badge */}
          <div className="absolute top-4 left-4 flex gap-2">
            <span className={`text-xs font-semibold px-3 py-1.5 rounded-lg ${
              property.status === 'For Sale'
                ? 'bg-primary-600 text-white'
                : 'bg-gold-500 text-white'
            }`}>
              {property.status}
            </span>
            <span className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-black/50 text-white backdrop-blur-sm">
              {property.category}
            </span>
          </div>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left - Property Details */}
          <div className="lg:col-span-2 space-y-6">

            {/* Title and Price */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="card p-6"
            >
              <div className="flex items-start justify-between gap-4 mb-3">
                <h1 className="text-2xl sm:text-3xl font-heading font-bold text-gray-900 dark:text-white">
                  {property.title}
                </h1>
                <div className="text-2xl font-heading font-bold text-primary-600 shrink-0">
                  {formatPrice(property.price)}
                  {property.status === 'For Rent' && (
                    <span className="text-sm font-normal text-gray-500">/yr</span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400">
                <MapPin size={16} className="text-primary-500 shrink-0" />
                <span className="text-sm">{property.location}</span>
              </div>
            </motion.div>

            {/* Property Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="card p-6"
            >
              <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
                Property Details
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {property.bedrooms && (
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Bed size={22} className="text-primary-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {property.bedrooms}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Bedrooms</div>
                  </div>
                )}
                {property.bathrooms && (
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Bath size={22} className="text-primary-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {property.bathrooms}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Bathrooms</div>
                  </div>
                )}
                {property.square_feet && (
                  <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                    <Square size={22} className="text-primary-600 mx-auto mb-2" />
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {property.square_feet.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-500 dark:text-gray-400">Sq Ft</div>
                  </div>
                )}
                <div className="text-center p-4 bg-gray-50 dark:bg-gray-800 rounded-xl">
                  <MapPin size={22} className="text-primary-600 mx-auto mb-2" />
                  <div className="font-semibold text-gray-900 dark:text-white text-sm">
                    {property.category}
                  </div>
                  <div className="text-xs text-gray-500 dark:text-gray-400">Type</div>
                </div>
              </div>
            </motion.div>

            {/* Description */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6"
            >
              <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
                Description
              </h2>
              <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                {property.description || 'No description available for this property.'}
              </p>
            </motion.div>

            {/* Features */}
            {property.features && property.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="card p-6"
              >
                <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-4">
                  Features & Amenities
                </h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {property.features.map((feature) => (
                    <div
                      key={feature}
                      className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300"
                    >
                      <div className="w-5 h-5 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0">
                        <Check size={12} className="text-primary-600" />
                      </div>
                      {feature}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Right - Contact Card */}
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="card p-6 sticky top-24"
            >
              <h2 className="font-heading font-semibold text-gray-900 dark:text-white mb-6">
                Interested in this property?
              </h2>

              {/* Contact buttons */}
              <div className="space-y-3 mb-6">
                <a
                  href="tel:+2348000000000"
                  className="btn-primary w-full flex items-center justify-center gap-2">
                
                  <Phone size={18} />
                  Call Agent
                </a>
                <a
                  href="https://wa.me/2348000000000"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-xl transition-all duration-200 shadow-md hover:shadow-lg"
                >
                  <MessageCircle size={18} />
                  WhatsApp
                </a>
                <button
                  onClick={() => setShowInquiryForm(!showInquiryForm)}
                  className="btn-outline w-full flex items-center justify-center gap-2"
                >
                  <Mail size={18} />
                  Send Inquiry
                </button>
              </div>

              {/* Inquiry Form */}
              {showInquiryForm && (
                <motion.form
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  onSubmit={handleInquirySubmit}
                  className="space-y-3 border-t border-gray-100 dark:border-gray-800 pt-4"
                >
                  <input
                    type="text"
                    placeholder="Your Name"
                    value={inquiryData.name}
                    onChange={(e) => setInquiryData({ ...inquiryData, name: e.target.value })}
                    required
                    className="input-field text-sm"
                  />
                  <input
                    type="email"
                    placeholder="Your Email"
                    value={inquiryData.email}
                    onChange={(e) => setInquiryData({ ...inquiryData, email: e.target.value })}
                    required
                    className="input-field text-sm"
                  />
                  <input
                    type="tel"
                    placeholder="Your Phone"
                    value={inquiryData.phone}
                    onChange={(e) => setInquiryData({ ...inquiryData, phone: e.target.value })}
                    className="input-field text-sm"
                  />
                  <textarea
                    placeholder="I am interested in this property..."
                    value={inquiryData.message}
                    onChange={(e) => setInquiryData({ ...inquiryData, message: e.target.value })}
                    required
                    rows={3}
                    className="input-field text-sm resize-none"
                  />
                  <button
                    type="submit"
                    disabled={submitting}
                    className="btn-primary w-full flex items-center justify-center gap-2"
                  >
                    {submitting ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      'Send Message'
                    )}
                  </button>
                </motion.form>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PropertyDetailPage 
