import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { ChevronLeft, ChevronRight } from "lucide-react";

const NextArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 right-4 z-20 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer -translate-y-1/2 hover:bg-white"
    onClick={onClick}
  >
    <ChevronRight className="w-5 h-5 text-black" />
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute top-1/2 left-4 z-20 w-10 h-10 bg-white/70 rounded-full flex items-center justify-center cursor-pointer -translate-y-1/2 hover:bg-white"
    onClick={onClick}
  >
    <ChevronLeft className="w-5 h-5 text-black" />
  </div>
);

const images = ["/img/banner-1.png", "/img/banner-2.png", "/img/banner-3.png"];

const HeroMain = () => {
  const settings = {
    dots: false,
    arrows: true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 8000,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    pauseOnHover: false,
  };

  return (
    <div className="relative w-full">
      <Slider {...settings}>
        {images.map((src, idx) => (
          <div key={idx} className="relative w-full">
            <img
              src={src}
              alt={`Slide ${idx + 1}`}
              className="w-full h-auto object-contain"
            />
            {/* <div className="absolute inset-0 bg-black/30" /> */}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HeroMain;
