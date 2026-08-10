import PageMeta from "@/website/components/common/PageMeta";
import HeroSub from "@/website/components/HeroSub";

import BookingRoomForm from "./BookingRoomForm";

const BookingRoom = () => {
  const breadcrumbLinks = [
    { href: "/", text: "Home" },
    { href: "/booking-room", text: "Room Booking" },
  ];
  return (
    <>
      <PageMeta title="Room Booking | Dakshin Ekkam" />
      <HeroSub title="Room Booking" breadcrumbLinks={breadcrumbLinks} />
      <BookingRoomForm />
    </>
  );
};

export default BookingRoom;
