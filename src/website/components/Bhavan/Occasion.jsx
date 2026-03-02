// import { Award, Heart, Music, Users } from "lucide-react";

// export default function Occasion() {
//   const events = [
//     {
//       icon: <Heart className="w-8 h-8" />,
//       title: "Weddings",
//       description: "Create magical memories in our elegant spaces",
//     },
//     {
//       icon: <Users className="w-8 h-8" />,
//       title: "Corporate Events",
//       description: "Professional settings for your business gatherings",
//     },
//     {
//       icon: <Music className="w-8 h-8" />,
//       title: "Celebrations",
//       description: "Perfect venue for birthdays and anniversaries",
//     },
//     {
//       icon: <Award className="w-8 h-8" />,
//       title: "Conferences",
//       description: "State-of-the-art facilities for seminars",
//     },
//   ];

//   return (
//     <div className="bg-gradient-to-b from-amber-50 to-white">
//       <section
//         id="events"
//         className="py-20 bg-gradient-to-b from-amber-50 to-white"
//       >
//         <div className="max-w-7xl mx-auto px-4">
//           <div className="text-center mb-16">
//             <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
//               Perfect for Every Occasion
//             </h2>
//             <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-orange-300 mx-auto rounded-full"></div>
//           </div>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
//             {events.map((event, idx) => (
//               <div
//                 key={idx}
//                 className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center group"
//               >
//                 <div className="inline-block p-4 bg-gradient-to-br from-amber-400 to-orange-300 text-white rounded-full mb-6 group-hover:scale-110 transition">
//                   {event.icon}
//                 </div>
//                 <h3 className="text-xl font-bold text-gray-900 mb-3">
//                   {event.title}
//                 </h3>
//                 <p className="text-gray-600">{event.description}</p>
//               </div>
//             ))}
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
import { Award, Heart, Music, Users } from "lucide-react";

export default function Occasion() {
  const events = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Weddings",
      description: "Create magical memories in our elegant spaces",
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Corporate Events",
      description: "Professional settings for your business gatherings",
    },
    {
      icon: <Music className="w-8 h-8" />,
      title: "Celebrations",
      description: "Perfect venue for birthdays and anniversaries",
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Conferences",
      description: "State-of-the-art facilities for seminars",
    },
  ];

  return (
    <div className="bg-gradient-to-b from-[#fdf0ef] to-white">
      <section
        id="events"
        className="py-20 bg-gradient-to-b from-[#fdf0ef] to-white"
      >
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Perfect for Every Occasion
            </h2>
            <div
              className="w-24 h-1 mx-auto rounded-full"
              style={{
                background: "linear-gradient(to right, #db2920, #f07470)",
              }}
            ></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {events.map((event, idx) => (
              <div
                key={idx}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition duration-300 text-center group"
              >
                <div
                  className="inline-block p-4 text-white rounded-full mb-6 group-hover:scale-110 transition"
                  style={{
                    background: "linear-gradient(135deg, #db2920, #9b1c15)",
                  }}
                >
                  {event.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {event.title}
                </h3>
                <p className="text-gray-600">{event.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
