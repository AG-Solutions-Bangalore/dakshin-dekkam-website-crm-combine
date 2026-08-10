import AboutSection from "../../About/AboutSection";
import HeroSub from "../../components/HeroSub";
import ChairPeronCarousel from "../../About/ChairPeronCarousel";
import TeamCarousel from "../../components/TeamCarousel";
import PageMeta from "../../components/common/PageMeta";
import OurHistory from "../../About/OurHistory";

const About = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/about", text: "About" },
  ];
  return (
    <>
      <PageMeta title="About Us | Dakshin Ekkam" />
      <HeroSub
        title="About Us"
        breadcrumbLinks={breadcrumbLinks}
      />
      <AboutSection />
      <OurHistory />
      <TeamCarousel />
    </>
  );
};

export default About;
