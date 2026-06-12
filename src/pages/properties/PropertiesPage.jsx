import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, SlidersHorizontal, X, ChevronDown } from "lucide-react";
import PropertyCard from "../../components/property/PropertyCard";
import { dummyProperties } from "../../data/dummyProperties";

const categories = [
  "All",
  "Apartment",
  "Duplex",
  "Land",
  "Commercial",
  "Short-let",
];
const statuses = ["All", "For Sale", "For Rent"];
const bedroomOptions = ["Any", "1", "2", "3", "4", "5+"];

const PropertiesPage = () => {
  const [searchParams] = useSearchParams();
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [category, setCategory] = useState(
    searchParams.get("category") || "All",
  );
  const [status, setStatus] = useState("All");
  const [bedrooms, setBedrooms] = useState("Any");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [showFilters, setShowFilters] = useState(false);

  // Filter dummy data locally
  const filteredProperties = dummyProperties.filter((property) => {
    if (
      search &&
      !property.title.toLowerCase().includes(search.toLowerCase()) &&
      !property.location.toLowerCase().includes(search.toLowerCase())
    )
      return false;
    if (category !== "All" && property.category !== category) return false;
    if (status !== "All" && property.status !== status) return false;
    if (bedrooms !== "Any" && property.bedrooms < parseInt(bedrooms))
      return false;
    if (minPrice && property.price < parseInt(minPrice)) return false;
    if (maxPrice && property.price > parseInt(maxPrice)) return false;
    return true;
  });

  // Sort
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === "price_low") return a.price - b.price;
    if (sortBy === "price_high") return b.price - a.price;
    return 0;
  });

  const clearFilters = () => {
    setSearch("");
    setCategory("All");
    setStatus("All");
    setBedrooms("Any");
    setMinPrice("");
    setMaxPrice("");
    setSortBy("newest");
  };

  const hasActiveFilters =
    search ||
    category !== "All" ||
    status !== "All" ||
    bedrooms !== "Any" ||
    minPrice ||
    maxPrice;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Header */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-2">
            Property Listings
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            {sortedProperties.length} properties found
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div
            className={`lg:w-72 shrink-0 ${showFilters ? "block" : "hidden lg:block"}`}
          >
            <div className="card p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-heading font-semibold text-gray-900 dark:text-white">
                  Filters
                </h2>
                {hasActiveFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-red-500 hover:text-red-600 font-medium flex items-center gap-1"
                  >
                    <X size={12} />
                    Clear all
                  </button>
                )}
              </div>

              {/* Search */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Search
                </label>
                <div className="relative">
                  <Search
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Location, title..."
                    className="input-field pl-9 text-sm"
                  />
                </div>
              </div>

              {/* Category */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <div className="space-y-2">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      onClick={() => setCategory(cat)}
                      className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-all duration-200 ${
                        category === cat
                          ? "bg-primary-50 dark:bg-primary-900/30 text-primary-600 font-medium"
                          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800"
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Status */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Status
                </label>
                <div className="flex gap-2">
                  {statuses.map((s) => (
                    <button
                      key={s}
                      onClick={() => setStatus(s)}
                      className={`flex-1 py-2 rounded-lg text-xs font-medium transition-all duration-200 ${
                        status === s
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>

              {/* Bedrooms */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Bedrooms
                </label>
                <div className="flex flex-wrap gap-2">
                  {bedroomOptions.map((b) => (
                    <button
                      key={b}
                      onClick={() => setBedrooms(b)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                        bedrooms === b
                          ? "bg-primary-600 text-white"
                          : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200"
                      }`}
                    >
                      {b}
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price Range (₦)
                </label>
                <div className="space-y-2">
                  <input
                    type="number"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min price"
                    className="input-field text-sm"
                  />
                  <input
                    type="number"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max price"
                    className="input-field text-sm"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Properties Grid */}
          <div className="flex-1">
            {/* Top bar */}
            <div className="flex items-center justify-between mb-6">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-300"
              >
                <SlidersHorizontal size={16} />
                Filters
                {hasActiveFilters && (
                  <span className="w-2 h-2 bg-primary-600 rounded-full" />
                )}
              </button>

              <div className="flex items-center gap-2 ml-auto">
                <span className="text-sm text-gray-500 hidden sm:inline">
                  Sort by:
                </span>
                <div className="relative">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="appearance-none bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-xl px-4 py-2 pr-8 text-sm font-medium text-gray-700 dark:text-gray-300 focus:outline-none focus:ring-2 focus:ring-primary-500 cursor-pointer"
                  >
                    <option value="newest">Newest First</option>
                    <option value="price_low">Price: Low to High</option>
                    <option value="price_high">Price: High to Low</option>
                  </select>
                  <ChevronDown
                    size={14}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none"
                  />
                </div>
              </div>
            </div>

            {/* Empty state */}
            {sortedProperties.length === 0 && (
              <div className="text-center py-20">
                <div className="text-6xl mb-4">🏠</div>
                <h3 className="text-xl font-heading font-semibold text-gray-900 dark:text-white mb-2">
                  No properties found
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-6">
                  Try adjusting your filters or search query
                </p>
                <button onClick={clearFilters} className="btn-primary">
                  Clear Filters
                </button>
              </div>
            )}

            {/* Properties grid */}
            {sortedProperties.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
              >
                {sortedProperties.map((property, index) => (
                  <motion.div
                    key={property.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertiesPage;