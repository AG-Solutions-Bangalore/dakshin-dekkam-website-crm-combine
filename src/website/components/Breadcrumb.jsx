import React from "react";
import { Link } from "react-router-dom";

const Breadcrumb = ({ links = [] }) => {
  const lastIndex = links.length - 1;

  return (
    <nav
      aria-label="Breadcrumb"
      className="relative z-30 flex items-center justify-center space-x-2 text-sm md:text-base font-medium"
    >
      {links.map((link, idx) => (
        <React.Fragment key={idx}>
          {idx !== lastIndex ? (
            <>
              <Link
                to={link.href || "#"}
                className="text-[#db2920] hover:text-[#ce170e] transition-colors cursor-pointer"
              >
                {link.text}
              </Link>
              <span className="text-gray-400 select-none">›</span>
            </>
          ) : (
            <span
              className="text-gray-700"
              aria-current="page"
              title={link.text}
            >
              {link.text}
            </span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
};

export default Breadcrumb;
