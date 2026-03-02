// import TeamSkeletonCard from "../TeamSkeletonCard";

// const LeadershipGrid = ({ members, getImage, isLoading }) => {
//   if (isLoading) {
//     return (
//       <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
//         {Array.from({ length: 6 }).map((_, idx) => (
//           <TeamSkeletonCard key={idx} />
//         ))}
//       </div>
//     );
//   }
//   return (
//     <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
//       {members.map((member, idx) => (
//         <div
//           key={idx}
//           data-aos="fade-down"
//           data-aos-delay={idx * 100}
//           className="bg-white rounded-xl shadow-lg py-6 px-1 flex flex-col items-center hover:shadow-2xl transition duration-300"
//         >
//           <div className="w-28 h-28 mb-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md">
//             <img
//               src={getImage(member)}
//               alt={member.committee_member}
//               className="w-full h-full object-cover"
//             />
//           </div>
//           <h3 className="text-sm md:text-md font-bold text-gray-800 text-center">
//             {member.committee_member}
//           </h3>
//           <p className="text-xs md:text-sm text-yellow-600 font-medium text-center">
//             {member.committee_type}
//           </p>
//           <p className="text-xs md:text-sm text-gray-500 text-center">
//             {member.committee_year}
//           </p>
//           <div className="mt-2 w-12 h-1 bg-yellow-400 rounded-full mx-auto"></div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default LeadershipGrid;
import TeamSkeletonCard from "../TeamSkeletonCard";

const LeadershipGrid = ({ members, getImage, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
        {Array.from({ length: 6 }).map((_, idx) => (
          <TeamSkeletonCard key={idx} />
        ))}
      </div>
    );
  }

  return (
    <div className="mt-12 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 md:gap-6">
      {members.map((member, idx) => (
        <div
          key={idx}
          data-aos="fade-down"
          data-aos-delay={idx * 100}
          className="bg-white rounded-xl shadow-lg py-6 px-1 flex flex-col items-center hover:shadow-2xl transition duration-300"
        >
          <div
            className="w-28 h-28 mb-4 rounded-full overflow-hidden shadow-md border-4"
            style={{ borderColor: "#db2920" }}
          >
            <img
              src={getImage(member)}
              alt={member.committee_member}
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="text-sm md:text-md font-bold text-gray-800 text-center">
            {member.committee_member}
          </h3>
          <p
            className="text-xs md:text-sm font-medium text-center"
            style={{ color: "#db2920" }}
          >
            {member.committee_type}
          </p>
          <p className="text-xs md:text-sm text-gray-500 text-center">
            {member.committee_year}
          </p>
          <div
            className="mt-2 w-12 h-1 rounded-full mx-auto"
            style={{ background: "#db2920" }}
          ></div>
        </div>
      ))}
    </div>
  );
};

export default LeadershipGrid;
