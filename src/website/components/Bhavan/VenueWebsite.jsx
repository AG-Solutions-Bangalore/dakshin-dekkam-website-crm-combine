import {
  Bed,
  MapPin,
  Music,
  Users,
  Utensils,
  UtensilsCrossed,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

export default function VenueWebsite() {
  const navigate = useNavigate();

  const features = [
    {
      icon: <Users className="w-10 h-10" />,
      title: "Main Hall",
      description:
        "Spacious hall with stage available, perfect for large gatherings, conferences, and ceremonies with modern acoustics and flexible seating arrangements.",
      seating: "400",
      capacity: "600",
      highlights: ["Stage Available", "Modern Acoustics"],
    },
    {
      icon: <UtensilsCrossed className="w-10 h-10" />,
      title: "Dining Hall",
      description:
        "Elegant dining space with traditional plantain leaf services allowed. Ideal for formal dinners, receptions, and authentic South Indian celebrations.",
      seating: "150",
      capacity: "250",
      highlights: ["Plantain Leaf Service", "Traditional Setup"],
    },
    {
      icon: <MapPin className="w-10 h-10" />,
      title: "Prime Locations",
      description:
        "Centrally located in JP Nagar, Bangalore wi'th excellent connectivity and easy access from all parts of the city.",
      highlights: ["JP Nagar", "Central Location", "Metro connectivity"],
    },
    {
      icon: <Bed className="w-10 h-10" />,
      title: "Rooms",
      description:
        "10 well-appointed rooms available for lodging and changing purposes, ensuring comfort and convenience for your guests.",
      highlights: ["10 Rooms", "Lodging & Changing"],
    },
    {
      icon: <Utensils className="w-10 h-10" />,
      title: "Food Services",
      description:
        "Only vegetarian food allowed. Flexibility to choose between in-house catering or bring your own outside food and caterers.",
      highlights: ["Pure Veg Only", "Outside Catering Allowed"],
    },
    {
      icon: <Zap className="w-10 h-10" />,
      title: "Power Backup",
      description:
        "Uninterrupted power supply with generator backup available at the venue, ensuring your events run smoothly without disruptions.",
      highlights: ["Generator Available", "24/7 Backup"],
    },
    {
      icon: <Music className="w-10 h-10" />,
      title: "Audio & Visual",
      description:
        "Basic sound system included with all bookings. Professional projector available with additional charges for presentations and screenings.",
      highlights: ["Sound System", "Projector Available"],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-50 to-white">
      <section id="features" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16" data-aos="fade-up">
            <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
              Our Venue Spaces & Amenities
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-red-400 to-orange-300 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, idx) => (
              <div
                key={idx}
                className="group bg-red-50 p-8 rounded-2xl shadow-sm hover:shadow-lg transition duration-300 border border-red-200"
                data-aos="fade-up"
                data-aos-delay={idx * 100}
              >
                <div className="flex items-center justify-between">
                  <div className="p-4 bg-red-100 text-red-700 rounded-xl group-hover:scale-110 transition duration-300">
                    {feature.icon}
                  </div>

                  <h3 className="text-2xl font-bold text-gray-900">
                    {feature.title}
                  </h3>
                </div>

                {/* <p className="text-gray-700 text-base mb-6">
                  {feature.description}
                </p> */}
                {feature.seating && feature.capacity && (
                  <div className="space-y-2 pt-6 border-t border-red-200 mt-1">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Seating:
                      </span>
                      <span className="text-red-700 font-bold">
                        {feature.seating}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 font-medium">
                        Max Capacity:
                      </span>
                      <span className="text-red-700 font-bold">
                        {feature.capacity}
                      </span>
                    </div>
                  </div>
                )}
                {feature.highlights && (
                  <div className="flex flex-wrap gap-2 pt-4">
                    {feature.highlights.map((highlight, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-red-200 text-red-800 text-xs font-semibold rounded-full"
                      >
                        {highlight}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
