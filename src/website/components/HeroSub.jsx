// import React from "react";
// import Breadcrumb from "./Breadcrumb";

// const HeroSub = ({ title, description, breadcrumbLinks }) => {
//   return (
//     <header className="relative bg-cream max-w-full">
//       <section className="relative z-20 pt-24 pb-16 lg:pt-28 lg:pb-14">
//         <div className="container mx-auto px-4">
//           <div className="text-center max-w-3xl mx-auto">
//             <h1
//               className="text-4xl md:text-6xl font-bold text-gray-900"
//               data-aos="fade-right"
//             >
//               {title}
//             </h1>

//             <div className="mt-6" data-aos="fade-up" data-aos-delay="700">
//               <Breadcrumb links={breadcrumbLinks} />
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-0 relative">
//         <svg
//           className="xl:h-40 xl:w-full"
//           data-name="Layer 1"
//           xmlns="http://www.w3.org/2000/svg"
//           viewBox="0 0 1200 120"
//           preserveAspectRatio="none"
//         >
//           <path
//             d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
//             fill="currentColor"
//           ></path>
//         </svg>
//         <div className="bg-white w-full h-10 -mt-px"></div>
//       </div>

//       {/* <div className="bg-white h-12 relative z-0" /> */}
//     </header>
//   );
// };

// export default HeroSub;
import React from "react";
import Breadcrumb from "./Breadcrumb";

const HeroSub = ({ title, description, breadcrumbLinks }) => {
  return (
    <header
      className="relative max-w-full"
      style={{ background: "linear-gradient(135deg, #fdf0ef, #fbe4e3)" }}
    >
      {/* Decorative blobs */}
      <div
        className="absolute top-0 right-0 w-64 h-64 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#db2920" }}
      />
      <div
        className="absolute bottom-0 left-0 w-48 h-48 rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: "#f5c6c4" }}
      />

      <section className="relative z-20 pt-24 pb-16 lg:pt-28 lg:pb-14">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            {/* Accent line */}
            <div
              className="w-12 h-1 rounded-full mx-auto mb-4"
              style={{ background: "#db2920" }}
            />
            <h1
              className="text-4xl md:text-6xl font-bold text-gray-900"
              data-aos="fade-right"
            >
              {title}
            </h1>
            <div className="mt-6" data-aos="fade-up" data-aos-delay="700">
              <Breadcrumb links={breadcrumbLinks} />
            </div>
          </div>
        </div>
      </section>

      <div className="text-white -mt-14 sm:-mt-24 lg:-mt-36 z-0 relative">
        <svg
          className="xl:h-40 xl:w-full"
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M600,112.77C268.63,112.77,0,65.52,0,7.23V120H1200V7.23C1200,65.52,931.37,112.77,600,112.77Z"
            fill="currentColor"
          ></path>
        </svg>
        <div className="bg-white w-full h-10 -mt-px"></div>
      </div>
    </header>
  );
};

export default HeroSub;
