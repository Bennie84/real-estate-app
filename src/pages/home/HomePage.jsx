import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Search,
  MapPin,
  ChevronDown,
  ArrowRight,
  Shield,
  Clock,
  Award,
  Users,
  ChevronUp,
  Mail,
  Phone,
} from "lucide-react";
import PropertyCard from "../../components/property/PropertyCard";
import { dummyProperties } from "../../data/dummyProperties";

// Animation variants
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const stagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const HomePage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeFaq, setActiveFaq] = useState(null);
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const filters = ["All", "For Sale", "For Rent"];
  const categories = ["Apartment", "Duplex", "Land", "Commercial", "Short-let"];

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/properties?search=${searchQuery}`);
  };

  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    setEmail("");
    alert("Thank you for subscribing!");
  };

  const faqs = [
    {
      question: "How do I list a property on LuxEstate?",
      answer:
        "To list a property, you need to create an account and contact our admin team. We verify all listings to ensure quality and authenticity for our users.",
    },
    {
      question: "Are the property listings verified?",
      answer:
        "Yes! Every property listed on LuxEstate goes through a verification process. We check ownership documents and ensure all details are accurate before publishing.",
    },
    {
      question: "How do I schedule a property viewing?",
      answer:
        'You can schedule a viewing by clicking the "Contact Agent" button on any property page and filling out the inquiry form. Our team will get back to you within 24 hours.',
    },
    {
      question: "What areas do you cover?",
      answer:
        "We currently cover all major cities in Nigeria including Lagos, Abuja, Port Harcourt, Ibadan, and many more. We are continuously expanding our coverage.",
    },
    {
      question: "Is there a fee for using LuxEstate?",
      answer:
        "Browsing and searching properties is completely free. We only charge a small commission when a successful transaction is completed through our platform.",
    },
  ];

  const testimonials = [
    {
      name: "Adebayo Johnson",
      role: "Property Buyer",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
      text: "LuxEstate made finding my dream home incredibly easy. The listings are detailed and the team was very professional throughout the process.",
    },
    {
      name: "Chioma Okafor",
      role: "Property Investor",
      image:
        "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
      text: "I have bought three properties through LuxEstate. Their verified listings and professional service give me confidence in every transaction.",
    },
    {
      name: "Emmanuel Adeyemi",
      role: "First-time Buyer",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
      text: "As a first-time buyer I was nervous, but LuxEstate guided me through every step. I found my perfect apartment within two weeks!",
    },
  ];

  return (
    <div className="bg-white dark:bg-gray-950">
      {/* ===== HERO SECTION ===== */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1600"
            alt="Hero"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.span
              variants={fadeUp}
              className="inline-block bg-primary-600/20 backdrop-blur-sm border border-primary-500/30 text-primary-300 text-sm font-medium px-4 py-1.5 rounded-full mb-6"
            >
              🏠 Nigeria's Premium Real Estate Platform
            </motion.span>

            <motion.h1
              variants={fadeUp}
              className="text-4xl sm:text-5xl lg:text-7xl font-heading font-bold text-white mb-6 leading-tight"
            >
              Find Your Perfect
              <span className="text-primary-400 block">Dream Property</span>
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-lg sm:text-xl text-gray-300 mb-10 max-w-2xl mx-auto"
            >
              Discover thousands of premium properties across Nigeria. Your
              dream home is just a search away.
            </motion.p>

            {/* Search Bar */}
            <motion.div variants={fadeUp} className="max-w-3xl mx-auto">
              {/* Filter Tabs */}
              <div className="flex items-center justify-center gap-2 mb-4">
                {filters.map((filter) => (
                  <button
                    key={filter}
                    onClick={() => setActiveFilter(filter)}
                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                      activeFilter === filter
                        ? "bg-primary-600 text-white shadow-lg"
                        : "bg-white/10 text-white hover:bg-white/20 backdrop-blur-sm"
                    }`}
                  >
                    {filter}
                  </button>
                ))}
              </div>

              {/* Search Input */}
              <form
                onSubmit={handleSearch}
                className="flex items-center gap-3 bg-white dark:bg-gray-900 rounded-2xl p-2 shadow-2xl"
              >
                <MapPin size={20} className="text-primary-500 ml-3 shrink-0" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search by location, property type..."
                  className="flex-1 py-3 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-sm"
                />
                <button
                  type="submit"
                  className="btn-primary flex items-center gap-2 shrink-0"
                >
                  <Search size={18} />
                  <span className="hidden sm:inline">Search</span>
                </button>
              </form>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeUp}
              className="flex items-center justify-center gap-8 mt-10"
            >
              {[
                { number: "500+", label: "Properties" },
                { number: "200+", label: "Happy Clients" },
                { number: "50+", label: "Locations" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-2xl font-bold text-white">
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={28} />
        </motion.div>
      </section>

      {/* ===== CATEGORIES SECTION ===== */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-10"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
          >
            Browse by Category
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-gray-400"
          >
            Find properties that match your needs
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4"
        >
          {categories.map((category, index) => (
            <motion.button
              key={category}
              variants={fadeUp}
              onClick={() => navigate(`/properties?category=${category}`)}
              className="card p-6 text-center hover:border-primary-500 border-2 border-transparent cursor-pointer group transition-all duration-200"
            >
              <div className="text-3xl mb-3">
                {["🏢", "🏠", "🌿", "🏗️", "🛋️"][index]}
              </div>
              <div className="font-semibold text-gray-900 dark:text-white text-sm group-hover:text-primary-600 transition-colors">
                {category}
              </div>
            </motion.button>
          ))}
        </motion.div>
      </section>

      {/* ===== FEATURED PROPERTIES SECTION ===== */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="flex items-end justify-between mb-10"
          >
            <div>
              <motion.h2
                variants={fadeUp}
                className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
              >
                Featured Properties
              </motion.h2>
              <motion.p
                variants={fadeUp}
                className="text-gray-500 dark:text-gray-400"
              >
                Hand-picked premium listings just for you
              </motion.p>
            </div>
            <motion.button
              variants={fadeUp}
              onClick={() => navigate("/properties")}
              className="hidden sm:flex items-center gap-2 text-primary-600 font-semibold hover:gap-3 transition-all duration-200"
            >
              View All <ArrowRight size={18} />
            </motion.button>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {dummyProperties.slice(0, 6).map((property) => (
              <motion.div key={property.id} variants={fadeUp}>
                <PropertyCard property={property} />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile view all button */}
          <div className="text-center mt-8 sm:hidden">
            <button
              onClick={() => navigate("/properties")}
              className="btn-outline"
            >
              View All Properties
            </button>
          </div>
        </div>
      </section>
      
      {/* ===== ABOUT SECTION ===== */}
   <section id="about" className="py-20 px-4 bg-white dark:bg-gray-950">
  <div className="max-w-7xl mx-auto">

    {/* Top - Founder Story */}
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">

      {/* Left - Image */}
      <motion.div
        initial={{ opacity: 0, x: -30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative"
      >
        <div className="relative rounded-2xl overflow-hidden h-[500px]">
          <img
            src="https://images.unsplash.com/photo-1560250097-0b93528c311a?w=800"
            alt="Founder"
            className="w-full h-full object-cover"
          />
          {/* Overlay card */}
          <div className="absolute bottom-6 left-6 right-6 bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm rounded-xl p-4 shadow-xl">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center shrink-0">
                <Users size={20} className="text-white" />
              </div>
              <div>
                <div className="font-heading font-bold text-gray-900 dark:text-white">
                  Founder Name
                </div>
                <div className="text-primary-600 text-sm font-medium">
                  Founder & CEO, LuxEstate
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Floating stat card */}
        <div className="absolute -top-6 -right-6 bg-primary-600 rounded-2xl p-5 shadow-xl hidden lg:block">
          <div className="text-3xl font-bold text-white">10+</div>
          <div className="text-primary-200 text-sm">Years Experience</div>
        </div>
      </motion.div>

      {/* Right - Story */}
      <motion.div
        initial={{ opacity: 0, x: 30 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="space-y-6"
      >
        <div>
          <span className="text-primary-600 font-semibold text-sm uppercase tracking-wider">
            About Us
          </span>
          <h2 className="text-3xl lg:text-4xl font-heading font-bold text-gray-900 dark:text-white mt-2 mb-4">
            Built on Trust, Driven by Excellence
          </h2>
          <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
            LuxEstate was founded with a simple mission — to make finding premium properties in Nigeria transparent, reliable, and stress-free. What started as a small agency has grown into one of Nigeria's most trusted real estate platforms.
          </p>
        </div>

        <p className="text-gray-500 dark:text-gray-400 leading-relaxed">
          Our founder, with over 10 years of experience in Nigerian real estate, built LuxEstate after seeing too many buyers and renters fall victim to fraudulent listings and unreliable agents. We set out to change that — one verified listing at a time.
        </p>

        {/* Key points */}
        <div className="space-y-3">
          {[
            'Every listing is personally verified by our team',
            'Transparent pricing with no hidden charges',
            'Dedicated support throughout your property journey',
            'Trusted by over 200 satisfied clients across Nigeria',
          ].map((point) => (
            <div key={point} className="flex items-start gap-3">
              <div className="w-5 h-5 bg-primary-100 dark:bg-primary-900/30 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                <ArrowRight size={10} className="text-primary-600" />
              </div>
              <span className="text-gray-600 dark:text-gray-300 text-sm">{point}</span>
            </div>
          ))}
        </div>

        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 pt-4">
          {[
            { number: '500+', label: 'Properties Listed' },
            { number: '200+', label: 'Happy Clients' },
            { number: '50+', label: 'Locations Covered' },
          ].map((stat) => (
            <div key={stat.label} className="text-center p-4 bg-gray-50 dark:bg-gray-900 rounded-xl">
              <div className="text-2xl font-bold text-primary-600">{stat.number}</div>
              <div className="text-gray-500 dark:text-gray-400 text-xs mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>

    {/* Bottom - Why Choose Us */}
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="text-center mb-10"
    >
      <motion.h2
        variants={fadeUp}
        className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
      >
        Why Choose LuxEstate?
      </motion.h2>
      <motion.p variants={fadeUp} className="text-gray-500 dark:text-gray-400">
        We make finding your dream property simple and stress-free
      </motion.p>
    </motion.div>

    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={stagger}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
    >
      {[
        {
          icon: <Shield size={28} className="text-primary-600" />,
          title: 'Verified Listings',
          description: 'Every property is thoroughly verified before listing. No scams, no fake listings.'
        },
        {
          icon: <Clock size={28} className="text-primary-600" />,
          title: 'Fast Response',
          description: 'Our team responds to all inquiries within 24 hours. We value your time.'
        },
        {
          icon: <Award size={28} className="text-primary-600" />,
          title: 'Premium Quality',
          description: 'We only list high-quality properties that meet our strict standards.'
        },
        {
          icon: <Users size={28} className="text-primary-600" />,
          title: 'Expert Agents',
          description: 'Our experienced agents guide you through every step of the process.'
        },
      ].map((item) => (
        <motion.div
          key={item.title}
          variants={fadeUp}
          className="card p-6 text-center group hover:border-primary-500 border-2 border-transparent transition-all duration-200"
        >
          <div className="w-14 h-14 bg-primary-50 dark:bg-primary-900/30 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-primary-100 transition-colors duration-200">
            {item.icon}
          </div>
          <h3 className="font-heading font-semibold text-gray-900 dark:text-white mb-2">
            {item.title}
          </h3>
          <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
            {item.description}
          </p>
        </motion.div>
      ))}
    </motion.div>
  </div>
</section>

      {/* ===== TESTIMONIALS SECTION ===== */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="text-center mb-12"
          >
            <motion.h2
              variants={fadeUp}
              className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
            >
              What Our Clients Say
            </motion.h2>
            <motion.p
              variants={fadeUp}
              className="text-gray-500 dark:text-gray-400"
            >
              Real stories from real people who found their dream properties
            </motion.p>
          </motion.div>

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {testimonials.map((testimonial) => (
              <motion.div
                key={testimonial.name}
                variants={fadeUp}
                className="card p-6"
              >
                {/* Stars */}
                <div className="flex gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-gold-500 text-lg">
                      ★
                    </span>
                  ))}
                </div>

                <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-6">
                  "{testimonial.text}"
                </p>

                <div className="flex items-center gap-3">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                  <div>
                    <div className="font-semibold text-gray-900 dark:text-white text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-gray-500 dark:text-gray-400 text-xs">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ===== FAQ SECTION ===== */}
      <section className="py-16 px-4 max-w-3xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-gray-400"
          >
            Everything you need to know about LuxEstate
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="space-y-4"
        >
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              variants={fadeUp}
              className="card overflow-hidden"
            >
              <button
                onClick={() => setActiveFaq(activeFaq === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="font-semibold text-gray-900 dark:text-white text-sm pr-4">
                  {faq.question}
                </span>
                {activeFaq === index ? (
                  <ChevronUp size={18} className="text-primary-600 shrink-0" />
                ) : (
                  <ChevronDown size={18} className="text-gray-400 shrink-0" />
                )}
              </button>
              {activeFaq === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="px-5 pb-5"
                >
                  <p className="text-gray-500 dark:text-gray-400 text-sm leading-relaxed">
                    {faq.answer}
                  </p>
                </motion.div>
              )}
            </motion.div>
          ))}
        </motion.div>
      </section>

      {/* ===== NEWSLETTER SECTION ===== */}
      <section className="py-16 px-4 bg-primary-600">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="max-w-2xl mx-auto text-center"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-heading font-bold text-white mb-3"
          >
            Stay Updated on New Listings
          </motion.h2>
          <motion.p variants={fadeUp} className="text-primary-100 mb-8">
            Subscribe to our newsletter and be the first to know about new
            properties
          </motion.p>

          <motion.form
            variants={fadeUp}
            onSubmit={handleNewsletterSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
          >
            <div className="relative flex-1">
              <Mail
                size={18}
                className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
              />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="w-full pl-11 pr-4 py-3 rounded-xl bg-white text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              type="submit"
              className="bg-gray-900 hover:bg-gray-800 text-white font-semibold px-6 py-3 rounded-xl transition-colors duration-200 shrink-0"
            >
              Subscribe
            </button>
          </motion.form>
        </motion.div>
      </section>

      {/* ===== CONTACT SECTION ===== */}
      <section id="contact" className="py-16 px-4 max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="text-center mb-12"
        >
          <motion.h2
            variants={fadeUp}
            className="text-3xl font-heading font-bold text-gray-900 dark:text-white mb-3"
          >
            Get In Touch
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="text-gray-500 dark:text-gray-400"
          >
            Have questions? We'd love to hear from you
          </motion.p>
        </motion.div>

        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={stagger}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto"
        >
          <motion.a
            variants={fadeUp}
            href="tel:+2348000000000"
            className="card p-6 flex items-center gap-4 hover:border-primary-500 border-2 border-transparent transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <Phone size={22} className="text-primary-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Call Us
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                +234 800 000 0000
              </div>
            </div>
          </motion.a>

          <motion.a
            variants={fadeUp}
            href="mailto:info@luxestate.com"
            className="card p-6 flex items-center gap-4 hover:border-primary-500 border-2 border-transparent transition-all duration-200 group"
          >
            <div className="w-12 h-12 bg-primary-50 dark:bg-primary-900/30 rounded-xl flex items-center justify-center group-hover:bg-primary-100 transition-colors">
              <Mail size={22} className="text-primary-600" />
            </div>
            <div>
              <div className="font-semibold text-gray-900 dark:text-white">
                Email Us
              </div>
              <div className="text-gray-500 dark:text-gray-400 text-sm">
                info@luxestate.com
              </div>
            </div>
          </motion.a>
        </motion.div>
      </section>
    </div>
  );
};

export default HomePage;