// import { Mail, Phone } from "lucide-react";
// import { Link } from "react-router-dom";

// const ContactLocation = ({ websitecompany }) => {
//   return (
//     <>
//       <section className="bg-cream pb-10">
//         <div className="container mx-auto  px-4">
//           <div className="container mx-auto  px-4">
//             <div
//               className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 pt-12"
//               data-aos="flip-down"
//               data-aos-delay="200"
//             >
//               <div>
//                 <h2 className="text-3xl leading-tight font-bold">Office</h2>
//               </div>
//               <div>
//                 <p className="text-lg font-normal leading-8">
//                   {websitecompany?.store_address || ""}
//                 </p>
//               </div>
//               <div>
//                 <Link
//                   to={`mailto:${websitecompany?.support_email || ""}`}
//                   className="text-lg flex items-center gap-2  font-medium hover:underline"
//                 >
//                   <Mail size={16} /> {websitecompany?.support_email || ""}
//                 </Link>
//                 <Link
//                   to={`tel:${websitecompany?.support_phone || ""}`}
//                   className="text-lg  flex items-center gap-2 hover:underline w-fit"
//                 >
//                   <Phone size={16} /> {websitecompany?.support_phone || ""}
//                 </Link>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </>
//   );
// };

// export default ContactLocation;
import { Mail, Phone } from "lucide-react";
import { Link } from "react-router-dom";

const ContactLocation = ({ websitecompany }) => {
  return (
    <>
      <section className="bg-[#fdf0ef] pb-10">
        <div className="container mx-auto px-4">
          <div className="container mx-auto px-4">
            <div
              className="grid sm:grid-cols-3 grid-cols-1 sm:gap-24 gap-4 pt-12"
              data-aos="flip-down"
              data-aos-delay="200"
            >
              <div>
                <h2 className="text-3xl leading-tight font-bold">Office</h2>
              </div>
              <div>
                <p className="text-lg font-normal leading-8">
                  {websitecompany?.store_address || ""}
                </p>
              </div>
              <div>
                <Link
                  to={`mailto:${websitecompany?.support_email || ""}`}
                  className="text-lg flex items-center gap-2 font-medium hover:underline"
                  style={{ color: "#db2920" }}
                >
                  <Mail size={16} /> {websitecompany?.support_email || ""}
                </Link>
                <Link
                  to={`tel:${websitecompany?.support_phone || ""}`}
                  className="text-lg flex items-center gap-2 hover:underline w-fit"
                  style={{ color: "#db2920" }}
                >
                  <Phone size={16} /> {websitecompany?.support_phone || ""}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ContactLocation;