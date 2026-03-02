import { Link, useLocation } from "react-router-dom";

const DesktopNavbar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex space-x-6">
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            data-aos="fade-up"
            data-aos-delay={idx * 50}
            className={`px-3 py-2 text-sm font-medium  ${
              isActive ? "text-[#db2920]" : ""
            }`}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
};

export default DesktopNavbar;
