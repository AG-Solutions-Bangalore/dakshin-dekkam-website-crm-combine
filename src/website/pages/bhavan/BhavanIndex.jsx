import PageMeta from "@/website/components/common/PageMeta";
import HeroSub from "@/website/components/HeroSub";

import BhavanForm from "./BhavanForm";

const BhavanIndex = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Kutchi Bhavan" },
    { href: "/booking-hall", text: "Hall Booking Form" },
  ];
  return (
    <>
      <PageMeta title="Hall Booking Form | Dakshin Ekkam" />
      <HeroSub title="Hall Booking Form" breadcrumbLinks={breadcrumbLinks} />
      <BhavanForm />
    </>
  );
};

export default BhavanIndex;
