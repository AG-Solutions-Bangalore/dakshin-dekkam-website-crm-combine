import { useSelector } from "react-redux";
import PageMeta from "../../components/common/PageMeta";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactInfo from "../../components/ContactForm/ContactInfo";
import HeroSub from "../../components/HeroSub";

const Contact = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact Us" },
  ];
  const websitecompany = useSelector((state) => state.websitecompany || "");

  return (
    <>
      <PageMeta title="Contact Us | Dakshin Ekkam" />
      <HeroSub
        title="Contact Us"
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactForm />
      <ContactInfo websitecompany={websitecompany} />
    </>
  );
};

export default Contact;
