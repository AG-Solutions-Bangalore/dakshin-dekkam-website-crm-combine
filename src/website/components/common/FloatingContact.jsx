// import { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function FloatingContact() {
//   const [open, setOpen] = useState(false);
//   const navigate = useNavigate();
//   return (
//     <>
//       <button
//         onClick={() => navigate("/booking-hall")}
//         className="fixed right-0 bottom-1/3 -translate-y-1/2
//   bg-amber-500 hover:bg-amber-600
//   text-white px-4 py-3
//   rounded-l-xl shadow-lg
//   z-40 transition-all duration-300
//   flex items-center gap-2
//   hover:pr-5 group"
//       >
//         <svg
//           className="w-4 h-4 group-hover:rotate-12 transition-transform"
//           fill="none"
//           stroke="currentColor"
//           viewBox="0 0 24 24"
//         >
//           <path
//             strokeLinecap="round"
//             strokeLinejoin="round"
//             strokeWidth={2}
//             d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//           />
//         </svg>

//         <span className="text-sm font-semibold tracking-wide">Book Now</span>
//       </button>
//       <button
//         onClick={() => setOpen(true)}
//         className="fixed right-0 top-1/2 -translate-y-1/2 bg-gradient-to-br from-[#0F3652] to-[#1a4d6f] text-white pl-4 sm:pl-6 pr-1 py-3  rounded-l-2xl shadow-2xl z-50 hover:pr-5 sm:hover:pr-6 transition-all duration-300 group"
//       >
//         <div className="flex items-center gap-2 sm:gap-3">
//           <svg
//             className="w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//             />
//           </svg>
//           <span className="font-semibold tracking-wide text-sm sm:text-base">
//             Contact
//           </span>
//         </div>
//       </button>

//       {/* Overlay */}
//       {open && (
//         <div
//           onClick={() => setOpen(false)}
//           className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fadeIn"
//         />
//       )}

//       {/* Slide Panel */}
//       <div
//         className={`fixed right-0 top-0 h-full w-full sm:w-[440px] lg:w-[480px] bg-white shadow-2xl z-50 transition-transform duration-500 ease-out ${
//           open ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         {/* Header */}
//         <div className="bg-gradient-to-br from-[#0F3652] to-[#1a4d6f] px-5 sm:px-8 py-6 sm:py-8 relative overflow-hidden">
//           {/* Decorative circles */}
//           <div className="absolute top-0 right-0 w-32 sm:w-40 h-32 sm:h-40 bg-white/5 rounded-full -translate-y-16 sm:-translate-y-20 translate-x-16 sm:translate-x-20"></div>
//           <div className="absolute bottom-0 left-0 w-24 sm:w-32 h-24 sm:h-32 bg-white/5 rounded-full translate-y-12 sm:translate-y-16 -translate-x-12 sm:-translate-x-16"></div>

//           <div className="relative">
//             <button
//               onClick={() => setOpen(false)}
//               className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 p-1"
//             >
//               <svg
//                 className="w-6 h-6 sm:w-7 sm:h-7"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M6 18L18 6M6 6l12 12"
//                 />
//               </svg>
//             </button>

//             <div className="flex items-center gap-3 mb-2">
//               <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm flex-shrink-0">
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                   />
//                 </svg>
//               </div>
//               <div>
//                 <h2 className="text-xl sm:text-2xl font-bold text-white">
//                   Get in Touch
//                 </h2>
//                 <p className="text-white/80 text-xs sm:text-sm">
//                   We're here to help you
//                 </p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="p-5 sm:p-8 space-y-5 sm:space-y-6 overflow-y-auto h-[calc(100%-180px)] sm:h-[calc(100%-160px)]">

//           {/* Contact Details */}
//           <div className="space-y-3 sm:space-y-4">
//             <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
//               Contact Information
//             </h4>

//             {/* Phone Numbers */}
//             <div className="space-y-2 sm:space-y-3">
//               <a
//                 href="tel:08043705354"
//                 className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-blue-50 transition-all group border border-transparent hover:border-blue-200 cursor-pointer active:scale-95"
//               >
//                 <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/50 transition-all shadow-md">
//                   <svg
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-pulse"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-gray-500 mb-0.5 group-hover:text-blue-600">
//                     Office - Tap to Call
//                   </p>
//                   <p className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-blue-600">
//                     080-43705354
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span className="text-xs font-medium text-blue-600 opacity-0 group-hover:opacity-100 transition-opacity">
//                     Call
//                   </span>
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-blue-600 group-hover:translate-x-1 transition-transform flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//               </a>

//               <a
//                 href="tel:+919606922996"
//                 className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-green-50 transition-all group border border-transparent hover:border-green-200 cursor-pointer active:scale-95"
//               >
//                 <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-green-500/50 transition-all shadow-md">
//                   <svg
//                     className="w-5 h-5 sm:w-6 sm:h-6 text-white group-hover:animate-pulse"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
//                     />
//                   </svg>
//                 </div>
//                 <div className="flex-1 min-w-0">
//                   <p className="text-xs text-gray-500 mb-0.5 group-hover:text-green-600">
//                     Mobile - Tap to Call
//                   </p>
//                   <p className="text-sm sm:text-base font-semibold text-gray-900 truncate group-hover:text-green-600">
//                     +91 9606922996
//                   </p>
//                 </div>
//                 <div className="flex items-center gap-1">
//                   <span className="text-xs font-medium text-green-600 opacity-0 group-hover:opacity-100 transition-opacity">
//                     Call
//                   </span>
//                   <svg
//                     className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 group-hover:translate-x-1 transition-transform flex-shrink-0"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M9 5l7 7-7 7"
//                     />
//                   </svg>
//                 </div>
//               </a>
//             </div>

//             {/* Location */}
//             <a
//               href="https://maps.app.goo.gl/91fyTCYRzDz9FeYa8"
//               target="_blank"
//               rel="noopener noreferrer"
//               className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl hover:bg-gray-50 transition-colors group border border-transparent hover:border-gray-200"
//             >
//               <div className="w-11 h-11 sm:w-12 sm:h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-md">
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 text-white"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                   />
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                   />
//                 </svg>
//               </div>
//               <div className="flex-1 min-w-0">
//                 <p className="text-xs text-gray-500 mb-0.5">Location</p>
//                 <p className="text-sm sm:text-base font-semibold text-gray-900 truncate">
//                   View on Map
//                 </p>
//               </div>
//               <svg
//                 className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:translate-x-1 transition-transform flex-shrink-0"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M9 5l7 7-7 7"
//                 />
//               </svg>
//             </a>
//           </div>

//           {/* Quick Actions */}
//           <div className="space-y-3 sm:space-y-4 pt-3 sm:pt-4">
//             <h4 className="text-xs sm:text-sm font-semibold text-gray-400 uppercase tracking-wider">
//               Quick Actions
//             </h4>

//             <div className="grid grid-cols-2 gap-2 sm:gap-3">
//               <a
//                 href="mailto:contact@example.com?subject=Inquiry from Website&body=Hello, I would like to inquire about..."
//                 className="p-3 sm:p-4 bg-gradient-to-br from-[#0F3652] to-[#1a4d6f] text-white rounded-xl hover:shadow-lg hover:shadow-[#0F3652]/50 transition-all hover:scale-105 active:scale-95 block text-center"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                   />
//                 </svg>
//                 <span className="text-xs sm:text-sm font-semibold">
//                   Email Us
//                 </span>
//               </a>

//               <a
//                 href="https://wa.me/919606922996?text=Hello, I would like to inquire about your services"
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 className="p-3 sm:p-4 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg hover:shadow-green-500/50 transition-all hover:scale-105 active:scale-95 block text-center"
//               >
//                 <svg
//                   className="w-5 h-5 sm:w-6 sm:h-6 mx-auto mb-1.5 sm:mb-2"
//                   fill="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
//                 </svg>
//                 <span className="text-xs sm:text-sm font-semibold">
//                   WhatsApp
//                 </span>
//               </a>
//             </div>
//           </div>

//           {/* Book Now Button */}
//           <div className="pt-4 sm:pt-6">
//             <a
//               href="/booking-hall"
//               className="w-full flex items-center justify-center gap-3 p-4 sm:p-5 bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-white rounded-2xl hover:shadow-2xl hover:shadow-orange-500/50 transition-all hover:scale-105 active:scale-95 group font-bold text-base sm:text-lg"
//             >
//               <svg
//                 className="w-6 h-6 sm:w-7 sm:h-7 group-hover:rotate-12 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
//                 />
//               </svg>
//               <span>Hall Booking</span>
//               <svg
//                 className="w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-2 transition-transform"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M13 7l5 5m0 0l-5 5m5-5H6"
//                 />
//               </svg>
//             </a>
//           </div>
//         </div>

//         {/* Footer */}
//         <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 bg-gray-50 border-t border-gray-100">
//           <p className="text-center text-xs sm:text-sm text-gray-500">
//             Available{" "}
//             <span className="font-semibold text-gray-700">Mon - Sat</span> •
//             9:00 AM - 6:00 PM
//           </p>
//         </div>
//       </div>

//       <style jsx>{`
//         @keyframes fadeIn {
//           from {
//             opacity: 0;
//           }
//           to {
//             opacity: 1;
//           }
//         }
//         .animate-fadeIn {
//           animation: fadeIn 0.3s ease-out;
//         }
//       `}</style>
//     </>
//   );
// }
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FloatingContact() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <>
      {/* Book Now Floating Button */}
      <button
        onClick={() => navigate("/booking-hall")}
        className="fixed right-0 bottom-1/3 -translate-y-1/2 text-white px-3 py-2.5 rounded-l-xl shadow-lg z-40 transition-all duration-300 flex items-center gap-2 hover:pr-4 group"
        style={{ background: "linear-gradient(135deg, #db2920, #9b1c15)" }}
      >
        <svg
          className="w-4 h-4 group-hover:rotate-12 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <span className="text-xs font-semibold tracking-wide">Book Now</span>
      </button>

      {/* Contact Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed right-0 top-1/2 -translate-y-1/2 text-white pl-4 pr-3 py-3 rounded-l-2xl shadow-2xl z-50 hover:pr-5 transition-all duration-300 group"
        style={{ background: "linear-gradient(135deg, #db2920, #9b1c15)" }}
      >
        <div className="flex items-center gap-2">
          <svg
            className="w-4 h-4 group-hover:scale-110 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
            />
          </svg>
          <span className="font-semibold text-sm">Contact</span>
        </div>
      </button>

      {/* Overlay */}
      {open && (
        <div
          onClick={() => setOpen(false)}
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 animate-fadeIn"
        />
      )}

      {/* Slide Panel */}
      <div
        className={`fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-2xl z-50 transition-transform duration-500 ease-out flex flex-col ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div
          className="relative px-6 py-5 overflow-hidden flex-shrink-0"
          style={{ background: "linear-gradient(135deg, #db2920, #9b1c15)" }}
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/5 rounded-full translate-y-12 -translate-x-12"></div>
          <div className="relative flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <div>
                <h2 className="text-lg font-bold text-white">Get in Touch</h2>
                <p className="text-white/80 text-xs">We're here to help you</p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="text-white/80 hover:text-white hover:rotate-90 transition-all duration-300 p-1"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* Contact Info */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Contact Information
            </h4>

            {/* Office Phone */}
            <a
              href="tel:08043705354"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#fdf0ef] transition-all group border border-transparent hover:border-[#f5c6c4] cursor-pointer active:scale-95"
            >
              <div
                className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-sm"
                style={{
                  background: "linear-gradient(135deg, #db2920, #9b1c15)",
                }}
              >
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Office · Tap to Call</p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-[#db2920]">
                  080-43705354
                </p>
              </div>
              <svg
                className="w-4 h-4 text-[#db2920] group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Mobile */}
            <a
              href="tel:+919606922996"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-green-50 transition-all group border border-transparent hover:border-green-200 cursor-pointer active:scale-95"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-green-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Mobile · Tap to Call</p>
                <p className="text-sm font-semibold text-gray-900 group-hover:text-green-600">
                  +91 9606922996
                </p>
              </div>
              <svg
                className="w-4 h-4 text-green-500 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>

            {/* Location */}
            <a
              href="https://maps.app.goo.gl/91fyTCYRzDz9FeYa8"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all group border border-transparent hover:border-gray-200 active:scale-95"
            >
              <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-gray-700 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-all shadow-sm">
                <svg
                  className="w-5 h-5 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-gray-500">Location</p>
                <p className="text-sm font-semibold text-gray-900">
                  View on Map
                </p>
              </div>
              <svg
                className="w-4 h-4 text-gray-400 group-hover:translate-x-1 transition-transform"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </a>
          </div>

          {/* Quick Actions */}
          <div className="space-y-2">
            <h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Quick Actions
            </h4>
            <div className="grid grid-cols-2 gap-2">
              <a
                href="mailto:contact@example.com?subject=Inquiry from Website"
                className="p-3 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
                style={{
                  background: "linear-gradient(135deg, #db2920, #9b1c15)",
                }}
              >
                <svg
                  className="w-5 h-5 mx-auto mb-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
                <span className="text-xs font-semibold">Email Us</span>
              </a>
              <a
                href="https://wa.me/919606922996?text=Hello, I would like to inquire about your services"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-gradient-to-br from-green-500 to-green-600 text-white rounded-xl hover:shadow-lg transition-all hover:scale-105 active:scale-95 text-center"
              >
                <svg
                  className="w-5 h-5 mx-auto mb-1"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                </svg>
                <span className="text-xs font-semibold">WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Book Now */}
          <a
            href="/booking-hall"
            className="w-full flex items-center justify-center gap-2 p-4 text-white rounded-2xl hover:shadow-xl transition-all hover:scale-105 active:scale-95 group font-bold text-base"
            style={{ background: "linear-gradient(135deg, #db2920, #9b1c15)" }}
          >
            <svg
              className="w-5 h-5 group-hover:rotate-12 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <span>Hall Booking</span>
            <svg
              className="w-4 h-4 group-hover:translate-x-2 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13 7l5 5m0 0l-5 5m5-5H6"
              />
            </svg>
          </a>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 bg-[#fdf0ef] border-t border-[#f5c6c4] flex-shrink-0">
          <p className="text-center text-xs text-gray-500">
            Available{" "}
            <span className="font-semibold text-[#db2920]">Mon – Sat</span> ·
            9:00 AM – 6:00 PM
          </p>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
