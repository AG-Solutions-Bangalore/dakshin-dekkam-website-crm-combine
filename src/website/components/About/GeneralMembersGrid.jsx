// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import TeamSkeletonCard from "../TeamSkeletonCard";

// const MemberCard = ({ member, getImage }) => (
//   <div className="bg-white rounded-2xl shadow-lg pt-6 pb-4 px-1 flex flex-col items-center hover:shadow-2xl transition duration-300 my-4 min-h-[220px]">
//     <div className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 border-yellow-400 shadow-md relative">
//       <img
//         src={getImage(member)}
//         alt={member.committee_member || "Member"}
//         className="w-full h-full object-cover"
//       />
//     </div>

//     <h3 className="text-md md:text-xs font-bold text-gray-800 text-center">
//       {member.committee_member || "\u00A0"}
//     </h3>
//     <p className="text-sm md:text-xs text-yellow-600 font-semibold text-center mt-1">
//       {member.committee_type || "\u00A0"}
//     </p>
//     <p className="text-sm md:text-xs text-gray-500 text-center mt-1">
//       {member.committee_year || "\u00A0"}
//     </p>
//   </div>
// );

// const GeneralMembersGrid = ({ members, getImage, isLoading }) => {
//   const settings = {
//     dots: true,
//     arrows: false,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 2500,
//   };

//   return (
//     <>
//       <div className="block md:hidden mt-6">
//         <Slider {...settings}>
//           {isLoading
//             ? Array.from({ length: 6 }).map((_, idx) => (
//                 <div key={idx} className="px-3">
//                   <TeamSkeletonCard />
//                 </div>
//               ))
//             : members.map((member, idx) => (
//                 <div key={idx} className="px-3">
//                   <MemberCard member={member} getImage={getImage} />
//                 </div>
//               ))}
//         </Slider>
//       </div>

//       <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-8 gap-2 mt-6">
//         {isLoading
//           ? Array.from({ length: 8 }).map((_, idx) => (
//               <TeamSkeletonCard key={idx} />
//             ))
//           : members.map((member, idx) => (
//               <div
//                 key={idx}
//                 // className="px-3"
//                 data-aos="fade-up"
//                 data-aos-delay={idx * 100}
//               >
//                 <MemberCard member={member} getImage={getImage} />
//               </div>
//             ))}
//       </div>
//     </>
//   );
// };

// export default GeneralMembersGrid;
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import TeamSkeletonCard from "../TeamSkeletonCard";

const MemberCard = ({ member, getImage }) => (
  <div className="bg-white rounded-2xl shadow-lg pt-6 pb-4 px-1 flex flex-col items-center hover:shadow-2xl transition duration-300 my-4 min-h-[220px]">
    <div
      className="w-24 h-24 mb-4 rounded-full overflow-hidden border-4 shadow-md relative"
      style={{ borderColor: "#db2920" }}
    >
      <img
        src={getImage(member)}
        alt={member.committee_member || "Member"}
        className="w-full h-full object-cover"
      />
    </div>

    <h3 className="text-md md:text-xs font-bold text-gray-800 text-center">
      {member.committee_member || "\u00A0"}
    </h3>
    <p
      className="text-sm md:text-xs font-semibold text-center mt-1"
      style={{ color: "#db2920" }}
    >
      {member.committee_type || "\u00A0"}
    </p>
    <p className="text-sm md:text-xs text-gray-500 text-center mt-1">
      {member.committee_year || "\u00A0"}
    </p>
  </div>
);

const GeneralMembersGrid = ({ members, getImage, isLoading }) => {
  const settings = {
    dots: true,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2500,
  };

  return (
    <>
      <div className="block md:hidden mt-6">
        <Slider {...settings}>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <div key={idx} className="px-3">
                  <TeamSkeletonCard />
                </div>
              ))
            : members.map((member, idx) => (
                <div key={idx} className="px-3">
                  <MemberCard member={member} getImage={getImage} />
                </div>
              ))}
        </Slider>
      </div>

      <div className="hidden md:grid md:grid-cols-3 lg:grid-cols-8 gap-2 mt-6">
        {isLoading
          ? Array.from({ length: 8 }).map((_, idx) => (
              <TeamSkeletonCard key={idx} />
            ))
          : members.map((member, idx) => (
              <div key={idx} data-aos="fade-up" data-aos-delay={idx * 30}>
                <MemberCard member={member} getImage={getImage} />
              </div>
            ))}
      </div>
    </>
  );
};

export default GeneralMembersGrid;
