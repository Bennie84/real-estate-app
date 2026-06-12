import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { MapPin, Bed, Bath, Square, Heart } from 'lucide-react'
import { formatPrice } from '../../utils/formatPrice'
import { useAuth } from '../../context/AuthContext'

const PropertyCard = ({ property, onFavoriteToggle, isFavorited }) => {
  const { user } = useAuth()

  const {
    id,
    title,
    location,
    price,
    category,
    status,
    bedrooms,
    bathrooms,
    square_feet,
    images,
  } = property

  return (
    <motion.div
      whileHover={{ y: -5 }}
      transition={{ duration: 0.2 }}
      className="card overflow-hidden group"
    >
      {/* Image */}
      <div className="relative overflow-hidden h-56">
        <img
          src={images?.[0] || 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800'}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-lg ${
            status === 'For Sale'
              ? 'bg-primary-600 text-white'
              : 'bg-gold-500 text-white'
          }`}>
            {status}
          </span>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-black/50 text-white backdrop-blur-sm">
            {category}
          </span>
        </div>

        {/* Favorite button */}
        {user && (
          <button
            onClick={(e) => {
              e.preventDefault()
              onFavoriteToggle?.(id)
            }}
            className="absolute top-3 right-3 w-8 h-8 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-md hover:scale-110 transition-transform duration-200"
          >
            <Heart
              size={16}
              className={isFavorited ? 'fill-red-500 text-red-500' : 'text-gray-400'}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <Link to={`/properties/${id}`}>
        <div className="p-5">
          {/* Price */}
          <div className="text-xl font-heading font-bold text-primary-600 dark:text-primary-400 mb-1">
            {formatPrice(price)}
            {status === 'For Rent' && (
              <span className="text-sm font-normal text-gray-500">/year</span>
            )}
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 dark:text-white mb-2 line-clamp-1 group-hover:text-primary-600 transition-colors duration-200">
            {title}
          </h3>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-gray-500 dark:text-gray-400 mb-4">
            <MapPin size={14} className="text-primary-500 shrink-0" />
            <span className="text-sm line-clamp-1">{location}</span>
          </div>

          {/* Divider */}
          <div className="border-t border-gray-100 dark:border-gray-800 pt-4">
            <div className="flex items-center justify-between text-gray-500 dark:text-gray-400">

              {/* Bedrooms */}
              {bedrooms && (
                <div className="flex items-center gap-1.5">
                  <Bed size={15} className="text-gray-400" />
                  <span className="text-xs font-medium">{bedrooms} Beds</span>
                </div>
              )}

              {/* Bathrooms */}
              {bathrooms && (
                <div className="flex items-center gap-1.5">
                  <Bath size={15} className="text-gray-400" />
                  <span className="text-xs font-medium">{bathrooms} Baths</span>
                </div>
              )}

              {/* Square feet */}
              {square_feet && (
                <div className="flex items-center gap-1.5">
                  <Square size={15} className="text-gray-400" />
                  <span className="text-xs font-medium">{square_feet.toLocaleString()} sqft</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  )
}

export default PropertyCard