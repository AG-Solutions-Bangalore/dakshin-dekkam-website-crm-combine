// import React from "react";
// import { Star } from "lucide-react";

// const testimonials = [
//   {
//     name: "Kumaar Ak",
//     event: "Family Function",
//     text: "Very well maintained function hall in the busy JP Nagar. Above this function hall lot of rooms are available for stay. On the top floor you have a huge MTR Maiya Restaurant, which is awesome!",
//     rating: 4,
//   },
//   {
//     name: "G Vijay",
//     event: "Wedding Reception",
//     text: "Great destination for weddings, small function nestled in midst of mini forest on Bannerghatta road. Very clean facility with good ceiling height.",
//     rating: 5,
//   },
//   {
//     name: "B Shshy",
//     event: "Birthday Party",
//     text: "Big hall located in JP Nagar. Air conditioned hall. Dining hall located in the basement. Simple and good hall in JP nagar. This hall easily can accommodate 300 people.",
//     rating: 5,
//   },
//   {
//     name: "Mahesh Harpanahalli",
//     event: "Engagement Ceremony",
//     text: "Excellent ambience. AC and fans are provided. Excellent maintenance. Very good lighting. Hygienically maintained. Suitable for small celebrations.",
//     rating: 5,
//   },
//   {
//     name: "Sameer Mehta",
//     event: "Dance Performance",
//     text: "Stage can accommodate 10 people for dance and 20 to sit. Function hall can accommodate 150 people at a time.",
//     rating: 3,
//   },
//   {
//     name: "TSG",
//     event: "Family Gathering",
//     text: "Medium size hall for about 200 people. Dining area is in the basement. Convenient location.",
//     rating: 4,
//   },
// ];

// const Testimonials = () => {
//   return (
//     <section className="bg-white my-10 overflow-hidden">
//       <div className="max-w-7xl mx-auto px-4">
//         <div className="text-center mb-12">
//           <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//             What Our Clients Say
//           </h2>
//           <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
//         </div>

//         {/* Carousel */}
//         <div className="relative overflow-hidden">
//           <div className="flex gap-6 animate-scroll">
//             {[...testimonials, ...testimonials].map((testimonial, idx) => (
//               <div
//                 key={idx}
//                 className="min-w-[320px] max-w-[320px] bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between mb-6"
//               >
//                 {/* Stars */}
//                 <div className="flex mb-3">
//                   {[...Array(testimonial.rating)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="w-4 h-4 fill-amber-400 text-amber-400"
//                     />
//                   ))}
//                 </div>

//                 {/* Text */}
//                 <p
//                   className="text-gray-600 text-sm mb-5"
//                   style={{
//                     display: "-webkit-box",
//                     WebkitLineClamp: 4,
//                     WebkitBoxOrient: "vertical",
//                     overflow: "hidden",
//                   }}
//                 >
//                   {testimonial.text}
//                 </p>

//                 {/* User Info */}
//                 <div className="border-t pt-3">
//                   <p className="font-semibold text-gray-900 text-sm">
//                     {testimonial.name}
//                   </p>
//                   <p className="text-xs text-gray-500">{testimonial.event}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Animation Style */}
//       <style>
//         {`
//           @keyframes scroll {
//             0% { transform: translateX(0); }
//             100% { transform: translateX(-50%); }
//           }

//           .animate-scroll {
//             width: max-content;
//             animation: scroll 25s linear infinite;
//           }

//           .animate-scroll:hover {
//             animation-play-state: paused;
//           }
//         `}
//       </style>
//     </section>
//   );
// };

// export default Testimonials;
import React from "react";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Kumaar Ak",
    event: "Family Function",
    text: "Very well maintained function hall in the busy JP Nagar. Above this function hall lot of rooms are available for stay. On the top floor you have a huge MTR Maiya Restaurant, which is awesome!",
    rating: 4,
  },
  {
    name: "G Vijay",
    event: "Wedding Reception",
    text: "Great destination for weddings, small function nestled in midst of mini forest on Bannerghatta road. Very clean facility with good ceiling height.",
    rating: 5,
  },
  {
    name: "B Shshy",
    event: "Birthday Party",
    text: "Big hall located in JP Nagar. Air conditioned hall. Dining hall located in the basement. Simple and good hall in JP nagar. This hall easily can accommodate 300 people.",
    rating: 5,
  },
  {
    name: "Mahesh Harpanahalli",
    event: "Engagement Ceremony",
    text: "Excellent ambience. AC and fans are provided. Excellent maintenance. Very good lighting. Hygienically maintained. Suitable for small celebrations.",
    rating: 5,
  },
  {
    name: "Sameer Mehta",
    event: "Dance Performance",
    text: "Stage can accommodate 10 people for dance and 20 to sit. Function hall can accommodate 150 people at a time.",
    rating: 3,
  },
  {
    name: "TSG",
    event: "Family Gathering",
    text: "Medium size hall for about 200 people. Dining area is in the basement. Convenient location.",
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="bg-white my-10 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            What Our Clients Say
          </h2>
          <div
            className="w-24 h-1 mx-auto rounded-full"
            style={{
              background: "linear-gradient(to right, #db2920, #f07470)",
            }}
          ></div>
        </div>

        <div className="relative overflow-hidden">
          <div className="flex gap-6 animate-scroll">
            {[...testimonials, ...testimonials].map((testimonial, idx) => (
              <div
                key={idx}
                className="min-w-[320px] max-w-[320px] bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition flex flex-col justify-between mb-6"
              >
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-4 h-4"
                      style={{ fill: "#db2920", color: "#db2920" }}
                    />
                  ))}
                </div>

                <p
                  className="text-gray-600 text-sm mb-5"
                  style={{
                    display: "-webkit-box",
                    WebkitLineClamp: 4,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {testimonial.text}
                </p>

                <div
                  className="border-t pt-3"
                  style={{ borderColor: "#f5c6c4" }}
                >
                  <p
                    className="font-semibold text-sm"
                    style={{ color: "#db2920" }}
                  >
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-gray-500">{testimonial.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }

          .animate-scroll {
            width: max-content;
            animation: scroll 25s linear infinite;
          }

          .animate-scroll:hover {
            animation-play-state: paused;
          }
        `}
      </style>
    </section>
  );
};

export default Testimonials;
