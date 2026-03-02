// import { useLocation, useNavigate } from "react-router-dom";

// function AboutSection() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   return (
//     <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
//       <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
//         <div data-aos="fade-right" className="w-full">
//           <div className="relative w-full overflow-hidden rounded-lg">
//             {/* <ImageSlider /> */}
//             <img src="/img/testimonials.png" />
//           </div>
//         </div>
//         <div data-aos="fade-up" data-aos-delay={200} className="w-full">
//           <div className="flex flex-col justify-center">
//             <h1 className="font-semibold text-darken text-xl sm:text-2xl lg:text-3xl mb-5">
//               Our Story: How Ekkam Started?
//             </h1>
//             <p className="text-gray-500 mb-4 text-justify">
//               Dakshin Bharat Kutchi Dasha Oswal Jain Ekkam is a South India
//               Kutchi Jain association dedicated to fostering unity,
//               philanthropy, and cultural enrichment. Headquartered in Hubli, our
//               operations span Karnataka, Andhra Pradesh, Tamil Nadu, Kerala,
//               Pondicherry, and Goa.
//             </p>

//             <p className="text-gray-500 mb-4 text-justify">
//               We promote literature, art, science, and non-violence, while
//               supporting education, healthcare, and social welfare across
//               communities. Our initiatives include establishing institutions,
//               aiding the needy, advocating for animal welfare, and representing
//               societal concerns to government bodies.
//             </p>

//             <p className="text-gray-500 mb-4 text-justify">
//               Ekkam strives to cultivate harmony, brotherhood, and responsible
//               citizenship through constructive activities that uplift humanity
//               and advance moral, economic, and technological progress.
//             </p>
//             {location.pathname == "/" && (
//               <div>
//                 <button
//                   className="flex items-center space-x-3 pl-3 border-b border-l border-t border-yellow-500 text-yellow-500 font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out rounded-full"
//                   onClick={() => navigate("/aboutus")}
//                 >
//                   <span>More Info</span>
//                   <div className="border border-yellow-500 h-14 w-14 rounded-full flex items-center justify-center">
//                     <svg
//                       className="w-5 h-5"
//                       viewBox="0 0 26 16"
//                       fill="none"
//                       xmlns="http://www.w3.org/2000/svg"
//                     >
//                       <path
//                         d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.2929L19.3431 0.928934C18.9526 0.538409 18.3195 0.538409 17.9289 0.928934C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-8.74228e-08 9L25 9L25 7L8.74228e-08 7L-8.74228e-08 9Z"
//                         fill="#F48C06"
//                       />
//                     </svg>
//                   </div>
//                 </button>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AboutSection;
import { useLocation, useNavigate } from "react-router-dom";

function AboutSection() {
  const location = useLocation();
  const navigate = useNavigate();
  return (
    <div className="container px-4 sm:px-6 lg:px-8 mx-auto max-w-screen-xl text-gray-700">
      <div className="mt-24 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div data-aos="fade-right" className="w-full">
          <div className="relative w-full overflow-hidden rounded-lg">
            <img src="/img/testimonials.png" />
          </div>
        </div>
        <div data-aos="fade-up" data-aos-delay={200} className="w-full">
          <div className="flex flex-col justify-center">
            <h1 className="font-semibold text-darken text-xl sm:text-2xl lg:text-3xl mb-5">
              Our Story: How Ekkam Started?
            </h1>
            <p className="text-gray-500 mb-4 text-justify">
              Dakshin Bharat Kutchi Dasha Oswal Jain Ekkam is a South India
              Kutchi Jain association dedicated to fostering unity,
              philanthropy, and cultural enrichment. Headquartered in Hubli, our
              operations span Karnataka, Andhra Pradesh, Tamil Nadu, Kerala,
              Pondicherry, and Goa.
            </p>

            <p className="text-gray-500 mb-4 text-justify">
              We promote literature, art, science, and non-violence, while
              supporting education, healthcare, and social welfare across
              communities. Our initiatives include establishing institutions,
              aiding the needy, advocating for animal welfare, and representing
              societal concerns to government bodies.
            </p>

            <p className="text-gray-500 mb-4 text-justify">
              Ekkam strives to cultivate harmony, brotherhood, and responsible
              citizenship through constructive activities that uplift humanity
              and advance moral, economic, and technological progress.
            </p>

            {location.pathname == "/" && (
              <div>
                <button
                  className="flex items-center space-x-3 pl-3 rounded-full font-medium my-4 focus:outline-none transform transition hover:scale-110 duration-300 ease-in-out"
                  style={{
                    borderTop: "1px solid #db2920",
                    borderBottom: "1px solid #db2920",
                    borderLeft: "1px solid #db2920",
                    color: "#db2920",
                  }}
                  onClick={() => navigate("/aboutus")}
                >
                  <span>More Info</span>
                  <div
                    className="h-14 w-14 rounded-full flex items-center justify-center"
                    style={{ border: "1px solid #db2920" }}
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 26 16"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M25.7071 8.70711C26.0976 8.31658 26.0976 7.68342 25.7071 7.2929L19.3431 0.928934C18.9526 0.538409 18.3195 0.538409 17.9289 0.928934C17.5384 1.31946 17.5384 1.95262 17.9289 2.34315L23.5858 8L17.9289 13.6569C17.5384 14.0474 17.5384 14.6805 17.9289 15.0711C18.3195 15.4616 18.9526 15.4616 19.3431 15.0711L25.7071 8.70711ZM-8.74228e-08 9L25 9L25 7L8.74228e-08 7L-8.74228e-08 9Z"
                        fill="#db2920"
                      />
                    </svg>
                  </div>
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutSection;
