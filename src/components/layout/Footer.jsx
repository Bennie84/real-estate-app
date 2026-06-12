// import { Link } from 'react-router-dom'
// import { Building2, Phone, Mail, MapPin} from 'lucide-react'

// const Footer = () => {
//   const currentYear = new Date().getFullYear()

//   return (
//     <footer className="bg-gray-950 text-gray-400">
//       {/* Main Footer */}
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
//           {/* Brand Column */}
//           <div className="space-y-4">
//             <Link to="/" className="flex items-center gap-2 group">
//               <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
//                 <Building2 size={20} className="text-white" />
//               </div>
//               <div className="flex flex-col leading-none">
//                 <span className="font-heading font-bold text-lg text-white tracking-tight">
//                   LuxEstate
//                 </span>
//                 <span className="text-[10px] text-primary-500 font-medium tracking-widest uppercase">
//                   Premium Properties
//                 </span>
//               </div>
//             </Link>
//             <p className="text-sm leading-relaxed">
//               Your trusted partner in finding the perfect property. We connect
//               buyers, sellers, and renters with their dream homes.
//             </p>
//             {/* Social Links */}
//             <div className="flex items-center gap-3 pt-2">
//               {/* {[
//                 { icon: <Facebook size={16} />, href: '#' },
//                 { icon: <Twitter size={16} />, href: '#' },
//                 { icon: <Instagram size={16} />, href: '#' },
//                 { icon: <Linkedin size={16} />, href: '#' },
//               ].map((social, index) => (

//                   key={index}
//                   href={social.href}
//                   className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200"
//                 > */}
//               {/* Social Links */}
//               {/* <div className="flex items-center gap-3 pt-2">
//                   <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
//                     <Facebook size={16} />
//                   </a>
//                   <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
//                     <Twitter size={16} />
//                   </a>
//                   <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
//                     <Instagram size={16} />
//                   </a>
//                   <a href="#" className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200">
//                     <Linkedin size={16} />
//                   </a> */}
//               {/* </div> */}

//               {/* Social Links */}
//               <div className="flex items-center gap-3 pt-2">
//                 <a
//                   href="#"
//                   className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
//                 >
//                   f
//                 </a>
//                 <a
//                   href="#"
//                   className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
//                 >
//                   X
//                 </a>
//                 <a
//                   href="#"
//                   className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white"
//                 >
//                   {/* <Instagram size={16} /> */}
//                   IG
//                 </a>
//                 <a
//                   href="#"
//                   className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
//                 >
//                   in
//                 </a>
//               </div>
//               {social.icon}
//               {/* ))} */}
//             </div>
//           </div>

//           {/* Quick Links */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
//               Quick Links
//             </h4>
//             <ul className="space-y-2">
//               {[
//                 { label: "Home", path: "/" },
//                 { label: "Properties", path: "/properties" },
//                 { label: "Login", path: "/login" },
//                 { label: "Sign Up", path: "/signup" },
//               ].map((link) => (
//                 <li key={link.path}>
//                   <Link
//                     to={link.path}
//                     className="text-sm hover:text-primary-400 transition-colors duration-200"
//                   >
//                     {link.label}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           </div>

//           {/* Property Types */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
//               Property Types
//             </h4>
//             <ul className="space-y-2">
//               {["Apartment", "Duplex", "Land", "Commercial", "Short-let"].map(
//                 (type) => (
//                   <li key={type}>
//                     <Link
//                       to={`/properties?category=${type}`}
//                       className="text-sm hover:text-primary-400 transition-colors duration-200"
//                     >
//                       {type}
//                     </Link>
//                   </li>
//                 ),
//               )}
//             </ul>
//           </div>

//           {/* Contact Info */}
//           <div className="space-y-4">
//             <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
//               Contact Us
//             </h4>
//             <ul className="space-y-3">
//               <li className="flex items-start gap-3 text-sm">
//                 <MapPin
//                   size={16}
//                   className="text-primary-500 mt-0.5 shrink-0"
//                 />
//                 <span>123 Property Street, Lagos, Nigeria</span>
//               </li>
//               <li className="flex items-center gap-3 text-sm">
//                 <Phone size={16} className="text-primary-500 shrink-0" />
//                 <span>+234 800 000 0000</span>
//               </li>
//               <li className="flex items-center gap-3 text-sm">
//                 <Mail size={16} className="text-primary-500 shrink-0" />
//                 <span>info@luxestate.com</span>
//               </li>
//             </ul>
//           </div>
//         </div>
//       </div>

//       {/* Bottom Bar */}
//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
//           <p className="text-sm">
//             © {currentYear} LuxEstate. All rights reserved.
//           </p>
//           <div className="flex items-center gap-6 text-sm">
//             <a
//               href="#"
//               className="hover:text-primary-400 transition-colors duration-200"
//             >
//               Privacy Policy
//             </a>
//             <a
//               href="#"
//               className="hover:text-primary-400 transition-colors duration-200"
//             >
//               Terms of Service
//             </a>
//           </div>
//         </div>
//       </div>
//     </footer>
//   );
// }

// export default Footer

import { Link } from "react-router-dom";
import { Building2, Phone, Mail, MapPin } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-400">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand Column */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-9 h-9 bg-primary-600 rounded-lg flex items-center justify-center">
                <Building2 size={20} className="text-white" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-heading font-bold text-lg text-white tracking-tight">
                  LuxEstate
                </span>
                <span className="text-[10px] text-primary-500 font-medium tracking-widest uppercase">
                  Premium Properties
                </span>
              </div>
            </Link>
            <p className="text-sm leading-relaxed">
              Your trusted partner in finding the perfect property. We connect
              buyers, sellers, and renters with their dream homes.
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
              >
                f
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
              >
                X
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
              >
                IG
              </a>
              <a
                href="#"
                className="w-8 h-8 bg-gray-800 hover:bg-primary-600 rounded-lg flex items-center justify-center transition-colors duration-200 text-gray-400 hover:text-white text-xs font-bold"
              >
                in
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Home", path: "/" },
                { label: "Properties", path: "/properties" },
                { label: "Login", path: "/login" },
                { label: "Sign Up", path: "/signup" },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm hover:text-primary-400 transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Property Types */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Property Types
            </h4>
            <ul className="space-y-2">
              {["Apartment", "Duplex", "Land", "Commercial", "Short-let"].map(
                (type) => (
                  <li key={type}>
                    <Link
                      to={`/properties?category=${type}`}
                      className="text-sm hover:text-primary-400 transition-colors duration-200"
                    >
                      {type}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-white font-semibold text-sm uppercase tracking-wider">
              Contact Us
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm">
                <MapPin
                  size={16}
                  className="text-primary-500 mt-0.5 shrink-0"
                />
                <span>123 Property Street, Lagos, Nigeria</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Phone size={16} className="text-primary-500 shrink-0" />
                <span>+234 800 000 0000</span>
              </li>
              <li className="flex items-center gap-3 text-sm">
                <Mail size={16} className="text-primary-500 shrink-0" />
                <span>info@luxestate.com</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm">
            © {currentYear} LuxEstate. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a
              href="#"
              className="hover:text-primary-400 transition-colors duration-200"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="hover:text-primary-400 transition-colors duration-200"
            >
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;