// import { COMMITTE_MEMBER } from "@/api";
// import { useGetApiMutation } from "@/hooks/useGetApiMutation";
// import TeamSkeletonCard from "./TeamSkeletonCard";
// import GeneralMembersGrid from "./About/GeneralMembersGrid";
// import LeadershipGrid from "./About/LeadershipGrid";

// const TeamCarousel = () => {
//   const { data: committedata, isLoading } = useGetApiMutation({
//     url: COMMITTE_MEMBER,
//     queryKey: ["commmittemember"],
//   });

//   const members = committedata?.data || [];
//   const noImage = committedata?.image_url?.find(
//     (i) => i.image_for === "No Image"
//   )?.image_url;
//   const baseImage = committedata?.image_url?.find(
//     (i) => i.image_for === "Committee"
//   )?.image_url;

//   const getImage = (member) =>
//     member.committee_member_images
//       ? `${baseImage}${member.committee_member_images}`
//       : noImage;

//   const leadership = members.filter((m) =>
//     [
//       "President",
//       "Vice President - I",
//       "Vice President - II",
//       "Secretary",
//       "Joint Secretary I",
//       "Treasurer",
//     ].includes(m.committee_type)
//   );

//   const generalMembers = members.filter(
//     (m) =>
//       ![
//         "President",
//         "Vice President - I",
//         "Vice President - II",
//         "Secretary",
//         "Joint Secretary I",
//         "Treasurer",
//       ].includes(m.committee_type)
//   );

//   return (
//     <section className="container mx-auto px-4 lg:px-8 pb-16 text-gray-700">
//       <div data-aos="fade-up" className="max-w-2xl mx-auto text-center mt-24">
//         <h1 className="font-bold text-darken my-3 text-3xl">
//           Meet the <span className="text-yellow-500">Team</span>
//         </h1>
//         <p className="leading-relaxed text-gray-500">
//           Our leadership team and dedicated members who make everything
//           possible.
//         </p>
//       </div>

//       {isLoading ? (
//         <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {Array.from({ length: 6 }).map((_, idx) => (
//             <TeamSkeletonCard key={idx} />
//           ))}
//         </div>
//       ) : (
//         <>
//           <LeadershipGrid
//             members={leadership}
//             getImage={getImage}
//           isLoading={isLoading}
//           />
//           <GeneralMembersGrid
//             members={generalMembers}
//             getImage={getImage}
//             isLoading={isLoading}
//           />
//         </>
//       )}
//     </section>
//   );
// };

// export default TeamCarousel;
import { COMMITTE_MEMBER } from "@/api";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import TeamSkeletonCard from "./TeamSkeletonCard";
import GeneralMembersGrid from "./About/GeneralMembersGrid";
import LeadershipGrid from "./About/LeadershipGrid";

const TeamCarousel = () => {
  const { data: committedata, isLoading } = useGetApiMutation({
    url: COMMITTE_MEMBER,
    queryKey: ["commmittemember"],
  });

  const members = committedata?.data || [];
  const noImage = committedata?.image_url?.find(
    (i) => i.image_for === "No Image",
  )?.image_url;
  const baseImage = committedata?.image_url?.find(
    (i) => i.image_for === "Committee",
  )?.image_url;

  const getImage = (member) =>
    member.committee_member_images
      ? `${baseImage}${member.committee_member_images}`
      : noImage;

  const leadership = members.filter((m) =>
    [
      "President",
      "Vice President - I",
      "Vice President - II",
      "Secretary",
      "Joint Secretary I",
      "Treasurer",
    ].includes(m.committee_type),
  );

  const generalMembers = members.filter(
    (m) =>
      ![
        "President",
        "Vice President - I",
        "Vice President - II",
        "Secretary",
        "Joint Secretary I",
        "Treasurer",
      ].includes(m.committee_type),
  );

  return (
    <section className="container mx-auto px-4 lg:px-8 pb-16 text-gray-700">
      <div data-aos="fade-up" className="max-w-2xl mx-auto text-center mt-24">
        <h1 className="font-bold text-darken my-3 text-3xl">
          Meet the <span style={{ color: "#db2920" }}>Team</span>
        </h1>
        <p className="leading-relaxed text-gray-500">
          Our leadership team and dedicated members who make everything
          possible.
        </p>
      </div>

      {isLoading ? (
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <TeamSkeletonCard key={idx} />
          ))}
        </div>
      ) : (
        <>
          <LeadershipGrid
            members={leadership}
            getImage={getImage}
            isLoading={isLoading}
          />
          <GeneralMembersGrid
            members={generalMembers}
            getImage={getImage}
            isLoading={isLoading}
          />
        </>
      )}
    </section>
  );
};

export default TeamCarousel;
