import OurObjectives from "@/website/components/AllInOne";
import PageMeta from "../../components/common/PageMeta";
import CommunityForm from "../../components/Community/CommunityForm";
import HeroSub from "../../components/HeroSub";
import ChairPersonCarousel from "@/website/About/ChairPeronCarousel";

const Community = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/community", text: "Community" },
  ];
  return (
    <>
      <PageMeta title="Community | Dakshin Ekkam" />
      <HeroSub title="Community" breadcrumbLinks={breadcrumbLinks} />
      <OurObjectives />
      <ChairPersonCarousel />
    </>
  );
};

export default Community;
