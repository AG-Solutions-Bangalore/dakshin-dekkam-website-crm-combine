// import { Link, useLocation } from "react-router-dom";
// import { motion, AnimatePresence } from "framer-motion";

// const MobileBottomNav = ({ menuItems }) => {
//   const location = useLocation();

//   return (
//     <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-white shadow-lg rounded-full flex justify-between items-center px-4 py-3 z-50 md:hidden">
//       {menuItems.map((item, idx) => {
//         const isActive = location.pathname === item.path;

//         return (
//           <Link
//             key={idx}
//             to={item.path}
//             className={`flex items-center justify-center transition-all duration-300 ${
//               isActive
//                 ? "bg-orange-400 text-white rounded-full p-2 shadow-lg"
//                 : "text-gray-400"
//             }`}
//           >
//             <span className="flex items-center justify-center space-x-2">
//               <span className="w-4 h-4 flex items-center justify-center">
//                 {item.icon}
//               </span>

//               <AnimatePresence>
//                 {isActive && (
//                   <motion.span
//                     className="text-sm font-medium"
//                   >
//                     {item.label}
//                   </motion.span>
//                 )}
//               </AnimatePresence>
//             </span>
//           </Link>
//         );
//       })}
//     </div>
//   );
// };

// export default MobileBottomNav;
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MobileBottomNav = ({ menuItems }) => {
  const location = useLocation();

  return (
    <div
      className="fixed bottom-4 left-1/2 transform -translate-x-1/2 w-11/12 bg-white shadow-lg rounded-full flex justify-between items-center px-4 py-3 z-50 md:hidden"
      style={{ border: "1px solid #f5c6c4" }}
    >
      {menuItems.map((item, idx) => {
        const isActive = location.pathname === item.path;

        return (
          <Link
            key={idx}
            to={item.path}
            className={`flex items-center justify-center transition-all duration-300 ${
              isActive
                ? "text-white rounded-full p-2 shadow-lg"
                : "text-gray-400"
            }`}
            style={isActive ? { background: "#db2920" } : {}}
          >
            <span className="flex items-center justify-center space-x-2">
              <span className="w-4 h-4 flex items-center justify-center">
                {item.icon}
              </span>
              <AnimatePresence>
                {isActive && (
                  <motion.span className="text-sm font-medium">
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>
            </span>
          </Link>
        );
      })}
    </div>
  );
};

export default MobileBottomNav;
