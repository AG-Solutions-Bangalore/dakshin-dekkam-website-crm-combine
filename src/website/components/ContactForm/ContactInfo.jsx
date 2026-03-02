// import { Mail, MapPin } from "lucide-react";

// const ContactInfo = ({ websitecompany }) => {
//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
//           {/* Email Card */}
//           <div
//             className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
//             data-aos="zoom-in"
//           >
//             <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-full">
//               <Mail size={28} className="text-yellow-600" />
//             </div>
//             <div className="flex-1 text-center sm:text-left">
//               <h3 className="text-midnight_text text-lg sm:text-xl font-semibold">
//                 Email Us
//               </h3>
//               <p className="text-black/70 text-sm sm:text-base mt-2 leading-relaxed">
//                 Feel free to contact us at{" "}
//                 <a
//                   href={`mailto:${websitecompany?.support_email || ""}`}
//                   className="font-medium text-yellow-600 hover:underline"
//                 >
//                   {websitecompany?.support_email || "example@email.com"}
//                 </a>{" "}
//                 — we’ll respond promptly.
//               </p>
//             </div>
//           </div>

//           {/* Address Card */}
//           <div
//             className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
//             data-aos="zoom-in"
//             data-aos-delay="200"
//           >
//             <div className="flex-shrink-0 w-16 h-16 bg-yellow-100 flex items-center justify-center rounded-full">
//               <MapPin size={28} className="text-yellow-600" />
//             </div>
//             <div className="flex-1 text-center sm:text-left">
//               <h3 className="text-midnight_text text-lg sm:text-xl font-semibold">
//                 Address
//               </h3>
//               <p className="text-black/70 text-sm sm:text-base mt-2 leading-relaxed">
//                 {websitecompany?.store_address || "No address provided"}
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ContactInfo;
import { Mail, MapPin } from "lucide-react";

const ContactInfo = ({ websitecompany }) => {
  return (
    <section className="py-12 bg-[#faf7f7] mb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
          {/* Email Card */}
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
            data-aos="zoom-in"
          >
            <div
              className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full"
              style={{ background: "#fdf0ef" }}
            >
              <Mail size={28} style={{ color: "#db2920" }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-midnight_text text-lg sm:text-xl font-semibold">
                Email Us
              </h3>
              <p className="text-black/70 text-sm sm:text-base mt-2 leading-relaxed">
                Feel free to contact us at{" "}
                <a
                  href={`mailto:${websitecompany?.support_email || ""}`}
                  className="font-medium hover:underline"
                  style={{ color: "#db2920" }}
                >
                  {websitecompany?.support_email || "example@email.com"}
                </a>{" "}
                — we'll respond promptly.
              </p>
            </div>
          </div>

          {/* Address Card */}
          <div
            className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-5 bg-white shadow-md p-6 rounded-2xl hover:shadow-lg transition"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div
              className="flex-shrink-0 w-16 h-16 flex items-center justify-center rounded-full"
              style={{ background: "#fdf0ef" }}
            >
              <MapPin size={28} style={{ color: "#db2920" }} />
            </div>
            <div className="flex-1 text-center sm:text-left">
              <h3 className="text-midnight_text text-lg sm:text-xl font-semibold">
                Address
              </h3>
              <p className="text-black/70 text-sm sm:text-base mt-2 leading-relaxed">
                {websitecompany?.store_address || "No address provided"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactInfo;