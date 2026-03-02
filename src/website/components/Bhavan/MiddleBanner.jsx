// import { ChevronRight } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// export default function MiddleBanner() {
//   const navigate = useNavigate();

//   return (
//     <div className="bg-gradient-to-b from-amber-50 to-white">
//       <section
//         id="home"
//         className="relative h-[70vh] min-h-[380px] flex items-center justify-center overflow-hidden"
//       >
//         <div className="absolute inset-0 bg-gradient-to-br from-amber-600 via-orange-500 to-amber-700"></div>
//         <div className="absolute inset-0 bg-black opacity-40"></div>

//         <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
//           <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
//             Your Dream Event
//             <br />
//             <span className="text-amber-200">Starts Here</span>
//           </h1>
//           <p className="text-xl md:text-2xl mb-8 text-amber-100">
//             JP Nagar's Premier Venue for Unforgettable Celebrations
//           </p>
//           <div className="flex flex-col sm:flex-row gap-4 justify-center">
//             <button
//               onClick={() => navigate("/booking-hall")}
//               className="bg-white text-amber-600 px-8 py-4 rounded-full font-bold text-lg hover:bg-amber-50 transform hover:scale-105 transition shadow-2xl"
//             >
//               Book Now
//               <ChevronRight className="inline ml-2" />
//             </button>
//           </div>
//         </div>

//         <div className="absolute bottom-0 left-0 right-0">
//           <svg
//             viewBox="0 0 1440 120"
//             fill="none"
//             xmlns="http://www.w3.org/2000/svg"
//           >
//             <path
//               d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
//               fill="#fffbeb"
//             />
//           </svg>
//         </div>
//       </section>
//     </div>
//   );
// }
import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function MiddleBanner() {
  const navigate = useNavigate();

  return (
    <div className="bg-gradient-to-b from-[#fdf0ef] to-white">
      <section
        id="home"
        className="relative h-[70vh] min-h-[380px] flex items-center justify-center overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-[#db2920] via-[#c02218] to-[#9b1c15]"></div>
        <div className="absolute inset-0 bg-black opacity-40"></div>

        <div className="relative z-10 text-center text-white px-4 max-w-5xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
            Your Dream Event
            <br />
            <span className="text-[#fad5d3]">Starts Here</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-[#f5c6c4]">
            JP Nagar's Premier Venue for Unforgettable Celebrations
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate("/booking-hall")}
              className="bg-white text-[#db2920] px-8 py-4 rounded-full font-bold text-lg hover:bg-[#fdf0ef] transform hover:scale-105 transition shadow-2xl"
            >
              Book Now
              <ChevronRight className="inline ml-2" />
            </button>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0">
          <svg
            viewBox="0 0 1440 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
              fill="#fdf0ef"
            />
          </svg>
        </div>
      </section>
    </div>
  );
}
