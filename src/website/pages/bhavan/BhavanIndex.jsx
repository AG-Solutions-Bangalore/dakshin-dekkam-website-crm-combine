import PageMeta from "@/website/components/common/PageMeta";
import HeroSub from "@/website/components/HeroSub";

import BhavanForm from "./BhavanForm";

const BhavanIndex = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Kutchi Bhavan" },
    { href: "/booking-hall", text: "Check Hall Availability" },
  ];
  return (
    <>
      <PageMeta title="Check Hall Availability | Dakshin Ekkam" />
      <HeroSub title="Check Hall Availability" breadcrumbLinks={breadcrumbLinks} />
      <BhavanForm />
    </>
  );
};

export default BhavanIndex;
