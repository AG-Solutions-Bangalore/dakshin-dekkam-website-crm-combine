import PageMeta from "../../components/common/PageMeta";
import GalleryCard from "../../components/GalleryCard";
import HeroSub from "../../components/HeroSub";

const Gallery = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/gallery", text: "Gallery" },
  ];
  return (
    <>
      <PageMeta title="Gallery | Dakshin Ekkam" />
      <HeroSub
        title="Gallery"
        breadcrumbLinks={breadcrumbLinks}
      />
      <GalleryCard
        bigImage="img/laptop-news.png"
        smallImages={[
          "img/children-laptop.png",
          "img/girl-laptop.png",
          "img/cat-laptop.png",
          "img/children-laptop.png",
        ]}
      />
      <GalleryCard
        bigImage="img/cat-laptop.png"
        smallImages={[
          "img/girl-laptop.png",
          "img/children-laptop.png",
          "img/laptop-news.png",
          "img/cat-laptop.png",
        ]}
      />
    </>
  );
};

export default Gallery;
