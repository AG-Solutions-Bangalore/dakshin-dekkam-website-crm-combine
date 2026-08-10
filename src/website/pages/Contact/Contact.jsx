import { useSelector } from "react-redux";
import PageMeta from "../../components/common/PageMeta";
import ContactForm from "../../components/ContactForm/ContactForm";
import ContactInfo from "../../components/ContactForm/ContactInfo";
import ContactLocation from "../../components/ContactForm/ContactLocation";
import LazyMap from "../../components/ContactForm/LazyMap";
import HeroSub from "../../components/HeroSub";

const Contact = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  const websitecompany = useSelector((state) => state.websitecompany || "");

  return (
    <>
      <PageMeta title="Contact | Dakshin Ekkam" />
      <HeroSub
        title="Contact"
        breadcrumbLinks={breadcrumbLinks}
      />
      <ContactInfo websitecompany={websitecompany} />
      <ContactForm />
      <LazyMap websitecompany={websitecompany} />
      {/* <ContactLocation websitecompany={websitecompany} /> */}
    </>
  );
};

export default Contact;
