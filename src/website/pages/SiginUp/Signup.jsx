import PageMeta from "../../components/common/PageMeta";
import CommunityForm from "../../components/Community/CommunityForm";
import HeroSub from "../../components/HeroSub";

const Signup = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/siginup", text: "Sigin Up / Update" },
  ];
  return (
    <>
      <PageMeta title="Sign up | Dakshin Ekkam" />
      <HeroSub
        title="Sign up / Update"
        breadcrumbLinks={breadcrumbLinks}
      />
      <CommunityForm />
    </>
  );
};

export default Signup;
