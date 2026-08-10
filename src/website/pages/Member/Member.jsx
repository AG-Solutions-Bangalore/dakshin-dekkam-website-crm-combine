import Info from "@/website/components/Info";
import PageMeta from "../../components/common/PageMeta";
import HeroSub from "../../components/HeroSub";
import MemberForm from "../../components/Member/MemberForm";

const Member = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/member", text: "Member" },
  ];
  return (
    <>
      <PageMeta title="Member | Dakshin Ekkam" />
      <HeroSub
        title="Member"
        breadcrumbLinks={breadcrumbLinks}
      />
      <Info />
    </>
  );
};

export default Member;
