// import { Link } from "react-router-dom";
// import {
//   Mail,
//   Phone,
//   MapPin,
//   Facebook,
//   Twitter,
//   Instagram,
//   Linkedin,
//   Send,
// } from "lucide-react";
// import { useSelector } from "react-redux";

// function Footer() {
//   const websitecompany = useSelector((state) => state.websitecompany || "");

//   return (
//     <footer className="bg-[#252641] text-white pt-12">
//       <div className="container mx-auto px-4 lg:px-16 grid grid-cols-1 md:grid-cols-12 gap-4">
//         <div className="col-span-4">
//           <h1 className="text-2xl font-bold mb-3 relative inline-block">
//             <span className="z-10">{websitecompany?.store_name || ""}</span>
//             <svg
//               className="w-6 h-6 absolute -top-0 -left-3 z-20"
//               viewBox="0 0 79 79"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <path
//                 d="M35.9645 2.94975C37.9171 0.997129 41.0829 0.997127 43.0355 2.94975L76.0502 35.9645C78.0029 37.9171 78.0029 41.0829 76.0503 43.0355L43.0355 76.0502C41.0829 78.0029 37.9171 78.0029 35.9645 76.0503L2.94975 43.0355C0.997129 41.0829 0.997127 37.9171 2.94975 35.9645L35.9645 2.94975Z"
//                 stroke="#26C1F2"
//                 strokeWidth="2"
//               />
//             </svg>
//           </h1>
//           <p className="text-gray-400 mt-3">
//             {websitecompany?.store_description || ""}
//           </p>
//           <div className="flex space-x-3 mt-4">
//             <Link to="#" className="hover:text-yellow-500">
//               <Facebook size={18} />
//             </Link>
//             <Link to="#" className="hover:text-yellow-500">
//               <Twitter size={18} />
//             </Link>
//             <Link to="#" className="hover:text-yellow-500">
//               <Instagram size={18} />
//             </Link>
//             <Link to="#" className="hover:text-yellow-500">
//               <Linkedin size={18} />
//             </Link>
//           </div>
//         </div>

//         {/* Column 2: Quick Links */}
//         <div className="col-span-3">
//           <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
//           <ul className="space-y-2 text-gray-400">
//             <li>
//               <Link to="/" className="hover:text-yellow-500">
//                 Home
//               </Link>
//             </li>
//             <li>
//               <Link to="/aboutus" className="hover:text-yellow-500">
//                 About Us
//               </Link>
//             </li>
//             <li>
//               <Link to="/gallery" className="hover:text-yellow-500">
//                 Gallery
//               </Link>
//             </li>

//             <li>
//               <Link to="/community" className="hover:text-yellow-500">
//                 Community
//               </Link>
//             </li>
//             <li>
//               <Link to="/contact" className="hover:text-yellow-500">
//                 Contact
//               </Link>
//             </li>
//             <li>
//               <Link to="/booking-room" className="hover:text-yellow-500">
//                 Booking Now
//               </Link>
//             </li>
//           </ul>
//         </div>

//         {/* Column 3: Map */}
//         {/* <div className="col-span-3">
//           <h2 className="font-semibold text-lg mb-4">Our Location</h2>
//           <iframe
//             src={websitecompany?.google_map_url || ""}
//             width="100%"
//             height="150"
//             style={{ border: 0 }}
//             allowFullScreen=""
//             loading="lazy"
//             title="map"
//           ></iframe>
//         </div> */}

//         {/* Column 4: Contact Info */}
//         <div className="col-span-5">
//           <h2 className="font-semibold text-lg mb-4">Contact Us</h2>
//           <p className="flex items-center gap-2 text-gray-400 mb-2">
//             {/* <MapPin size={24} /> */}
//             {websitecompany?.store_address || ""}
//           </p>
//           <p className="flex items-center gap-2 text-gray-400 mb-2">
//             <Phone size={16} />{" "}
//             <Link
//               to={`tel:${websitecompany?.support_phone || ""}`}
//               className="hover:text-yellow-500"
//             >
//               {websitecompany?.support_phone || ""}
//             </Link>
//           </p>
//           <p className="flex items-center gap-2 text-gray-400">
//             <Mail size={16} />{" "}
//             <Link
//               to={`mailto:${websitecompany?.support_email || ""}`}
//               className="hover:text-yellow-500"
//             >
//               {websitecompany?.support_email || ""}
//             </Link>
//           </p>
//           <div className="flex flex-col sm:flex-row  gap-3 mt-2">
//             <input
//               type="email"
//               placeholder="Your Email"
//               className="rounded-full py-2 pl-5 bg-transparent border border-gray-400 text-white placeholder-gray-400"
//             />

//             <button
//               title="Subscribe"
//               type="submit"
//               className="flex items-center justify-center gap-2 text-white font-semibold px-5 py-2 rounded-full bg-gradient-to-r from-[#545AE7] to-[#393FCF] hover:opacity-90 transition"
//             >
//               <Send size={18} />
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Copyright */}
//       <div className="text-center text-gray-400 mt-12 pb-6">
//         &copy; 2025{" "}
//         <a
//           href="https://ag-solutions.in/"
//           target="_blank"
//           rel="noopener noreferrer"
//           className="text-blue-500 hover:underline"
//         >
//           AG Solutions
//         </a>
//         . All rights reserved.
//       </div>
//     </footer>
//   );
// }

// export default Footer;
import { Link } from "react-router-dom";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Send,
} from "lucide-react";
import { useSelector } from "react-redux";

function Footer() {
  const websitecompany = useSelector((state) => state.websitecompany || "");

  return (
    <footer className="bg-[#252641] text-white pt-12">
      <div className="mx-auto px-4 lg:px-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8">
        {/* Column 1: Company Info */}
        <div className="lg:col-span-4">
          {/* <h1 className="text-2xl font-bold mb-3 relative inline-block">
            <span className="z-10">{websitecompany?.store_name || ""}</span>
            <svg
              className="w-6 h-6 absolute -top-0 -left-3 z-20"
              viewBox="0 0 79 79"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M35.9645 2.94975C37.9171 0.997129 41.0829 0.997127 43.0355 2.94975L76.0502 35.9645C78.0029 37.9171 78.0029 41.0829 76.0503 43.0355L43.0355 76.0502C41.0829 78.0029 37.9171 78.0029 35.9645 76.0503L2.94975 43.0355C0.997129 41.0829 0.997127 37.9171 2.94975 35.9645L35.9645 2.94975Z"
                stroke="#26C1F2"
                strokeWidth="2"
              />
            </svg>
          </h1> */}
          <Link
            to="/"
            className="text-lg relative z-50 flex flex-row items-center gap-2 font-bold tracking-widest rounded-lg focus:outline-none focus:shadow-outline"
          >
            <img src="./logo.png" alt="app_logo" className="w-10  h-10" />
            <span> Dhakshin Ekkam</span>
          </Link>
          <p className="text-gray-400 mt-3 text-sm leading-relaxed">
            {websitecompany?.store_description || ""}
          </p>
          <div className="flex space-x-3 mt-4">
            <Link to="#" className="hover:text-yellow-500 transition-colors">
              <Facebook size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500 transition-colors">
              <Twitter size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500 transition-colors">
              <Instagram size={18} />
            </Link>
            <Link to="#" className="hover:text-yellow-500 transition-colors">
              <Linkedin size={18} />
            </Link>
          </div>
        </div>

        {/* Column 2: Quick Links */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-lg mb-4">Quick Links</h2>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <Link to="/" className="hover:text-yellow-500 transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/aboutus"
                className="hover:text-yellow-500 transition-colors"
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                to="/gallery"
                className="hover:text-yellow-500 transition-colors"
              >
                Gallery
              </Link>
            </li>
            <li>
              <Link
                to="/community"
                className="hover:text-yellow-500 transition-colors"
              >
                Community
              </Link>
            </li>
            <li>
              <Link
                to="/contact"
                className="hover:text-yellow-500 transition-colors"
              >
                Contact
              </Link>
            </li>
            <li>
              <Link
                to="/booking-hall"
                className="hover:text-yellow-500 transition-colors"
              >
                Hall Booking
              </Link>
            </li>
          </ul>
        </div>

        {/* Column 3: Contact Info */}
        <div className="lg:col-span-4">
          <h2 className="font-semibold text-lg mb-4">Contact Us</h2>
          <div className="space-y-3 text-sm">
            <p className="flex items-start gap-2 text-gray-400">
              <MapPin size={16} className="mt-1 flex-shrink-0" />
              <span>{websitecompany?.store_address || ""}</span>
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <Phone size={16} className="flex-shrink-0" />
              <Link
                to={`tel:${websitecompany?.support_phone || ""}`}
                className="hover:text-yellow-500 transition-colors"
              >
                {websitecompany?.support_phone || ""}
              </Link>
            </p>
            <p className="flex items-center gap-2 text-gray-400">
              <Mail size={16} className="flex-shrink-0" />
              <Link
                to={`mailto:${websitecompany?.support_email || ""}`}
                className="hover:text-yellow-500 transition-colors break-all"
              >
                {websitecompany?.support_email || ""}
              </Link>
            </p>
          </div>

          {/* Newsletter */}
          {/* <div className="mt-4">
            <h3 className="font-semibold text-sm mb-2">Subscribe Newsletter</h3>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 rounded-full py-2 px-4 bg-transparent border border-gray-400 text-white placeholder-gray-400 text-sm focus:outline-none focus:border-yellow-500 transition-colors"
              />
              <button
                title="Subscribe"
                type="submit"
                className="flex items-center justify-center gap-2 text-white font-semibold px-4 py-2 rounded-full bg-gradient-to-r from-[#545AE7] to-[#393FCF] hover:opacity-90 transition-opacity"
              >
                <Send size={16} />
              </button>
            </div>
          </div> */}
        </div>

        {/* Column 4: Google Map */}
        <div className="lg:col-span-2">
          <h2 className="font-semibold text-lg mb-4">Our Location</h2>
          <div className="w-full h-40 rounded-lg overflow-hidden shadow-lg">
            <iframe
              src={
                websitecompany?.google_map_url
                  ? websitecompany.google_map_url
                  : "https://www.google.com/maps?q=Kutchi%20Bhavan&output=embed&t=m"
              }
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Google Map Location"
              className="transition-all duration-300"
            />
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="text-center text-gray-400 text-sm mt-12 pb-6 border-t border-gray-700 pt-6">
        &copy; 2026{" "}
        <a
          href="https://ag-solutions.in/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:text-blue-400 hover:underline transition-colors"
        >
          AG Solutions
        </a>
        . All rights reserved.
      </div>
    </footer>
  );
}

export default Footer;
