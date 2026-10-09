import PageMeta from "../../components/common/PageMeta";
import CommunityForm from "../../components/Community/CommunityForm";
import HeroSub from "../../components/HeroSub";

const Signup = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/siginup", text: "Sigin Up " },
  ];
  return (
    <>
      <PageMeta title=" | Dakshin Ekkam" />
      <HeroSub
        title=" "
        breadcrumbLinks={breadcrumbLinks}
      />
      <CommunityForm />
    </>
  );
};

export default Signup;
