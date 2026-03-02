import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import MobileBottomNav from "./MobileBottomNav";
import {
  Home,
  Info,
  Image,
  Users,
  User,
  Phone,
  House,
  HousePlus,
  IndianRupee,
} from "lucide-react";
import DesktopNavbar from "./DesktopNavbar";

function Navbar() {
  const [open, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const menuItems = [
    {
      label: "Home",
      path: "/",
      icon: <Home className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "About",
      path: "/aboutus",
      icon: <Info className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },

    {
      label: "Community",
      path: "/community",
      icon: <Users className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Member Area",
      path: "/member",
      icon: <User className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Kutchi Bhavan",
      path: "/bhavan",
      icon: <User className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Gallery",
      path: "/gallery",
      icon: <Image className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
    {
      label: "Contact",
      path: "/contact",
      icon: <Phone className="h-5 w-5" />,
      onClick: () => setOpen(false),
    },
  ];
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isLargeScreen = window.innerWidth >= 768;

      setIsScrolled(currentScrollY > 40);

      if (isLargeScreen) {
        if (currentScrollY < 40) setShowNavbar(true);
        else if (currentScrollY > lastScrollY && currentScrollY < 500)
          setShowNavbar(false);
        else setShowNavbar(true);
      } else {
        setShowNavbar(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  return (
    <div>
      <div
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 py-3 ${
          showNavbar
            ? isScrolled
              ? "bg-[#fdf0ef] shadow-md !text-black"
              : "bg-transparent"
            : "-translate-y-full"
        } ${isHome ? "text-white" : "text-black"}`}
      >
        <div className="max-w-screen-xl mx-auto px-6 md:px-8 flex items-center justify-between">
          <div className="relative">
            <Link
              to="/"
              className="text-lg relative z-50 flex flex-row items-center gap-2 font-bold tracking-widest rounded-lg focus:outline-none focus:shadow-outline"
            >
              <img src="./logo.png" alt="app_logo" className="w-10  h-10" />
              <span> Dhakshin Ekkam</span>
            </Link>
          </div>
          <DesktopNavbar menuItems={menuItems} />
        </div>
      </div>

      <MobileBottomNav open={open} menuItems={menuItems} setOpen={setOpen} />
    </div>
  );
}

export default Navbar;
