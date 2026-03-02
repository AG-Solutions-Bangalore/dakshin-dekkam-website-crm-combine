// import React, { useState, useEffect } from "react";
// import { ChevronLeft, ChevronRight } from "lucide-react";

// export default function GallerySection() {
//   const [currentSlide, setCurrentSlide] = useState(0);
//   const [isPaused, setIsPaused] = useState(false);

//   const galleryImages = [
//     {
//       id: 1,
//       src: "/img/gallery.jpg",
//       title: "Community Events",
//       category: "Celebrations",
//     },
//     {
//       id: 2,
//       src: "/img/gallery1.jpg",
//       title: "Cultural Programs",
//       category: "Heritage",
//     },
//     {
//       id: 3,
//       src: "/img/gallery2.jpg",
//       title: "Workshops",
//       category: "Learning",
//     },
//     {
//       id: 4,
//       src: "/img/gallery3.jpg",
//       title: "Social Gatherings",
//       category: "Bonding",
//     },
//     {
//       id: 5,
//       src: "/img/gallery4.jpg",
//       title: "Educational Events",
//       category: "Knowledge",
//     },
//   ];

//   useEffect(() => {
//     if (!isPaused) {
//       const interval = setInterval(() => {
//         setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
//       }, 2000);

//       return () => clearInterval(interval);
//     }
//   }, [isPaused, galleryImages.length]);

//   const nextSlide = () => {
//     setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
//   };

//   const prevSlide = () => {
//     setCurrentSlide(
//       (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
//     );
//   };

//   const goToSlide = (index) => {
//     setCurrentSlide(index);
//   };

//   const currentImage = galleryImages[currentSlide];

//   return (
//     <section
//       className="py-20 px-4 bg-gradient-to-b from-white to-amber-50"
//       onMouseEnter={() => setIsPaused(true)}
//       onMouseLeave={() => setIsPaused(false)}
//     >
//       <div className="max-w-7xl mx-auto">
//         <div className="text-center mb-16">
//           <p className="text-amber-600 font-semibold text-sm uppercase tracking-wide mb-2">
//             Our Gallery
//           </p>
//           <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
//             Gallery Moments
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto">
//             Explore the vibrant memories and beautiful moments from our thriving
//             community
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row gap-6">
//           <div className="lg:w-32 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-4 lg:pb-0 amber-scrollbar">
//             {galleryImages.map((image, idx) => (
//               <button
//                 key={image.id}
//                 onClick={() => goToSlide(idx)}
//                 aria-label={`Go to ${image.title}`}
//                 className={`flex-shrink-0 w-24 h-20 lg:w-full lg:h-24 rounded-lg
//       overflow-hidden transition-all duration-300 border-2 ${
//         idx === currentSlide
//           ? "border-amber-500 shadow-md"
//           : "border-gray-300 hover:border-amber-400 opacity-70 hover:opacity-100"
//       }`}
//               >
//                 <img
//                   src={image.src}
//                   alt={image.title}
//                   className={`w-full h-full object-cover transition-transform duration-300 ${
//                     idx === currentSlide ? "scale-105" : "hover:scale-105"
//                   }`}
//                 />
//               </button>
//             ))}
//           </div>

//           <div className="flex-1">
//             <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
//               <img
//                 src={currentImage.src}
//                 alt={currentImage.title}
//                 className="w-full h-full object-cover transition-transform duration-700"
//               />

//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

//               <div className="absolute bottom-0 left-0 right-0 p-8">
//                 <span className="inline-block px-4 py-1.5 bg-amber-500 rounded-full text-sm font-medium text-white mb-3">
//                   {currentImage.category}
//                 </span>
//                 <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
//                   {currentImage.title}
//                 </h3>
//                 <p className="text-white/80 text-sm font-medium">
//                   {String(currentSlide + 1).padStart(2, "0")} /{" "}
//                   {String(galleryImages.length).padStart(2, "0")}
//                 </p>
//               </div>

//               {/* Navigation Arrows on Image */}
//               <button
//                 onClick={prevSlide}
//                 className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
//                 aria-label="Previous slide"
//               >
//                 <ChevronLeft className="w-6 h-6 text-gray-800 group-hover:text-amber-600" />
//               </button>

//               <button
//                 onClick={nextSlide}
//                 className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
//                 aria-label="Next slide"
//               >
//                 <ChevronRight className="w-6 h-6 text-gray-800 group-hover:text-amber-600" />
//               </button>
//             </div>

//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }
import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function GallerySection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const galleryImages = [
    {
      id: 1,
      src: "/img/gallery.jpg",
      title: "Community Events",
      category: "Celebrations",
    },
    {
      id: 2,
      src: "/img/gallery1.jpg",
      title: "Cultural Programs",
      category: "Heritage",
    },
    {
      id: 3,
      src: "/img/gallery2.jpg",
      title: "Workshops",
      category: "Learning",
    },
    {
      id: 4,
      src: "/img/gallery3.jpg",
      title: "Social Gatherings",
      category: "Bonding",
    },
    {
      id: 5,
      src: "/img/gallery4.jpg",
      title: "Educational Events",
      category: "Knowledge",
    },
  ];

  useEffect(() => {
    if (!isPaused) {
      const interval = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
      }, 2000);
      return () => clearInterval(interval);
    }
  }, [isPaused, galleryImages.length]);

  const nextSlide = () =>
    setCurrentSlide((prev) => (prev + 1) % galleryImages.length);
  const prevSlide = () =>
    setCurrentSlide(
      (prev) => (prev - 1 + galleryImages.length) % galleryImages.length,
    );
  const goToSlide = (index) => setCurrentSlide(index);

  const currentImage = galleryImages[currentSlide];

  return (
    <section
      className="py-20 px-4 bg-gradient-to-b from-white to-[#fdf0ef]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p
            className="font-semibold text-sm uppercase tracking-wide mb-2"
            style={{ color: "#db2920" }}
          >
            Our Gallery
          </p>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Gallery Moments
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Explore the vibrant memories and beautiful moments from our thriving
            community
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-32 flex lg:flex-col gap-4 overflow-x-auto lg:overflow-y-auto lg:max-h-[600px] pb-4 lg:pb-0">
            {galleryImages.map((image, idx) => (
              <button
                key={image.id}
                onClick={() => goToSlide(idx)}
                aria-label={`Go to ${image.title}`}
                className={`flex-shrink-0 w-24 h-20 lg:w-full lg:h-24 rounded-lg overflow-hidden transition-all duration-300 border-2 ${
                  idx === currentSlide
                    ? "shadow-md opacity-100"
                    : "border-gray-300 opacity-70 hover:opacity-100"
                }`}
                style={
                  idx === currentSlide
                    ? { borderColor: "#db2920" }
                    : { ["--hover-border"]: "#f5c6c4" }
                }
              >
                <img
                  src={image.src}
                  alt={image.title}
                  className={`w-full h-full object-cover transition-transform duration-300 ${
                    idx === currentSlide ? "scale-105" : "hover:scale-105"
                  }`}
                />
              </button>
            ))}
          </div>

          <div className="flex-1">
            <div className="relative h-[500px] lg:h-[600px] rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={currentImage.src}
                alt={currentImage.title}
                className="w-full h-full object-cover transition-transform duration-700"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

              <div className="absolute bottom-0 left-0 right-0 p-8">
                <span
                  className="inline-block px-4 py-1.5 rounded-full text-sm font-medium text-white mb-3"
                  style={{ backgroundColor: "#db2920" }}
                >
                  {currentImage.category}
                </span>
                <h3 className="text-3xl md:text-4xl font-bold text-white mb-2">
                  {currentImage.title}
                </h3>
                <p className="text-white/80 text-sm font-medium">
                  {String(currentSlide + 1).padStart(2, "0")} /{" "}
                  {String(galleryImages.length).padStart(2, "0")}
                </p>
              </div>

              <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
                aria-label="Previous slide"
              >
                <ChevronLeft
                  className="w-6 h-6 text-gray-800"
                  style={{ color: "inherit" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#db2920")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                />
              </button>

              <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/90 hover:bg-white rounded-full shadow-lg transition-all duration-300 flex items-center justify-center group"
                aria-label="Next slide"
              >
                <ChevronRight
                  className="w-6 h-6 text-gray-800"
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#db2920")
                  }
                  onMouseLeave={(e) => (e.currentTarget.style.color = "")}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
