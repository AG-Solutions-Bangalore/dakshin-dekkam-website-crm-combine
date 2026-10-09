import { useEffect, useRef, useState } from "react";

function LazyMap({ websitecompany }) {
  const [isVisible, setIsVisible] = useState(false);
  const [mapLoaded, setMapLoaded] = useState(false);
  const mapRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (mapRef.current) {
      observer.observe(mapRef.current);
    }

    return () => {
      if (mapRef.current) observer.unobserve(mapRef.current);
    };
  }, []);

  return (
    <div
      ref={mapRef}
      className="relative w-full h-full min-h-[360px] rounded-2xl overflow-hidden shadow-md border border-gray-100 bg-gray-100"
    >
      {isVisible ? (
        <>
          {!mapLoaded && (
            <div className="absolute inset-0 w-full h-full bg-gray-200 animate-pulse"></div>
          )}
          <iframe
            title="Kutchi Bhavan"
            src={websitecompany?.google_map_url || ""}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="w-full h-full min-h-[360px] relative z-10 border-0"
            style={{ border: 0 }}
            onLoad={() => setMapLoaded(true)}
          ></iframe>
        </>
      ) : (
        <div className="w-full h-full min-h-[360px] bg-gray-200 animate-pulse"></div>
      )}
    </div>
  );
}

export default LazyMap;
