// import { Users, LifeBuoy, Calendar } from "lucide-react";

// function OurObjectives() {
//   return (
//     <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 mb-4">
//       {/* Heading */}
//       <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
//         <h1 className="font-bold text-darken my-3 text-2xl">
//           Our <span className="text-yellow-500">Objectives</span>
//         </h1>
//         <p className="leading-relaxed text-gray-500">
//           We aim to empower our community by providing connection, support, and
//           opportunities for growth through meaningful engagement.
//         </p>
//       </div>

//       {/* Objective Cards */}
//       <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
//         {/* Objective 1 */}
//         <div
//           data-aos="fade-up"
//           className="bg-white shadow-xl p-6 text-center rounded-xl"
//         >
//           <div
//             className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
//             style={{ background: "#5B72EE" }}
//           >
//             <Users className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
//             Community Connection
//           </h1>
//           <p className="px-4 text-gray-500">
//             Foster meaningful relationships and networking opportunities within
//             the community.
//           </p>
//         </div>

//         {/* Objective 2 */}
//         <div
//           data-aos="fade-up"
//           data-aos-delay="150"
//           className="bg-white shadow-xl p-6 text-center rounded-xl"
//         >
//           <div
//             className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
//             style={{ background: "#F48C06" }}
//           >
//             <LifeBuoy className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
//             Support & Mentorship
//           </h1>
//           <p className="px-4 text-gray-500">
//             Provide guidance, mentorship, and resources to help members grow and
//             overcome challenges.
//           </p>
//         </div>

//         {/* Objective 3 */}
//         <div
//           data-aos="fade-up"
//           data-aos-delay="300"
//           className="bg-white shadow-xl p-6 text-center rounded-xl"
//         >
//           <div
//             className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
//             style={{ background: "#29B9E7" }}
//           >
//             <Calendar className="w-8 h-8 text-white" />
//           </div>
//           <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
//             Events & Activities
//           </h1>
//           <p className="px-4 text-gray-500">
//             Organize community gatherings, workshops, and activities to
//             strengthen engagement and collaboration.
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OurObjectives;
import { Users, LifeBuoy, Calendar } from "lucide-react";

function OurObjectives() {
  return (
    <div className="container px-4 lg:px-8 mx-auto max-w-screen-xl text-gray-700 mb-4">
      {/* Heading */}
      <div data-aos="flip-up" className="max-w-xl mx-auto text-center mt-24">
        <h1 className="font-bold text-darken my-3 text-2xl">
          Our <span style={{ color: "#db2920" }}>Objectives</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          We aim to empower our community by providing connection, support, and
          opportunities for growth through meaningful engagement.
        </p>
      </div>

      {/* Objective Cards */}
      <div className="grid md:grid-cols-3 gap-14 md:gap-5 mt-20">
        {/* Objective 1 */}
        <div
          data-aos="fade-up"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div
            className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            style={{ background: "#db2920" }}
          >
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
            Community Connection
          </h1>
          <p className="px-4 text-gray-500">
            Foster meaningful relationships and networking opportunities within
            the community.
          </p>
        </div>

        {/* Objective 2 */}
        <div
          data-aos="fade-up"
          data-aos-delay="150"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div
            className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            style={{ background: "#c02218" }}
          >
            <LifeBuoy className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
            Support & Mentorship
          </h1>
          <p className="px-4 text-gray-500">
            Provide guidance, mentorship, and resources to help members grow and
            overcome challenges.
          </p>
        </div>

        {/* Objective 3 */}
        <div
          data-aos="fade-up"
          data-aos-delay="300"
          className="bg-white shadow-xl p-6 text-center rounded-xl"
        >
          <div
            className="rounded-full w-16 h-16 flex items-center justify-center mx-auto shadow-lg transform -translate-y-12"
            style={{ background: "#9b1c15" }}
          >
            <Calendar className="w-8 h-8 text-white" />
          </div>
          <h1 className="font-medium text-xl mb-3 lg:px-14 text-darken">
            Events & Activities
          </h1>
          <p className="px-4 text-gray-500">
            Organize community gatherings, workshops, and activities to
            strengthen engagement and collaboration.
          </p>
        </div>
      </div>
    </div>
  );
}

export default OurObjectives;
