// Format price to Nigerian Naira
export const formatPrice = (price) => {
  if (!price) return 'Price on request'
  if (price >= 1000000000) {
     return `#${(price / 1000000000).toFixed(1)}B`
  }
  if (price >=1000000) {
    return `#${(price / 1000000).toFixed(1)}M`
  }
  if (price >= 1000) {
    return `#${(price / 1000).toFixed(0)}K`
  }
  return `#${price.toLocalString()}`
}
