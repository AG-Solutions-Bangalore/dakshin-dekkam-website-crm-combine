import { Link, useLocation } from "react-router-dom";

const DesktopNavbar = ({ menuItems }) => {
  const location = useLocation();

  return (
    <nav className="hidden md:flex items-center space-x-1 lg:space-x-3 xl:space-x-5 flex-nowrap shrink-0">
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            data-aos="fade-up"
            data-aos-delay={idx * 50}
            className={`px-2.5 lg:px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors ${
              isActive ? "text-[#db2920]" : "hover:text-[#db2920]"
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
