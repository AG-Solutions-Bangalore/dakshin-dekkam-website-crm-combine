// import { forwardRef } from "react";

// const InputField = forwardRef(
//   (
//     {
//       label,
//       type = "text",
//       name,
//       value,
//       onChange,
//       placeholder,
//       startIcon,
//       error,
//       rows = 4,
//       required,
//       maxLength,
//     },
//     ref
//   ) => {
//     return (
//       <div className="w-full mb-4">
//         {label && (
//           <label
//             htmlFor={name}
//             className="block text-sm font-medium text-gray-700 mb-1"
//           >
//             {label}
//             {required && <span className="text-red-600 ml-1">*</span>}
//           </label>
//         )}

//         <div
//           className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ${
//             error
//               ? "border-red-500 focus-within:ring-red-400"
//               : "border-gray-300 focus-within:ring-yellow-400"
//           }`}
//         >
//           {startIcon && <span className="mr-2 text-gray-500">{startIcon}</span>}

//           {type === "textarea" ? (
//             <textarea
//               ref={ref}
//               id={name}
//               name={name}
//               value={value}
//               onChange={onChange}
//               rows={rows}
//               placeholder={placeholder}
//               maxLength={maxLength}
//               className="w-full resize-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
//             />
//           ) : (
//             <input
//               ref={ref}
//               id={name}
//               name={name}
//               type={type}
//               value={value}
//               onChange={onChange}
//               placeholder={placeholder}
//               maxLength={maxLength}
//               className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
//             />
//           )}
//         </div>

//         {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
//       </div>
//     );
//   }
// );

// InputField.displayName = "InputField";
// export default InputField;
import { forwardRef } from "react";

const InputField = forwardRef(
  (
    {
      label,
      type = "text",
      name,
      value,
      onChange,
      placeholder,
      startIcon,
      error,
      rows = 4,
      required,
      maxLength,
    },
    ref,
  ) => {
    return (
      <div className="w-full mb-4">
        {label && (
          <label
            htmlFor={name}
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            {label}
            {required && <span className="text-red-600 ml-1">*</span>}
          </label>
        )}

        <div
          className={`flex items-center border rounded-lg px-3 py-2 focus-within:ring-2 ${
            error
              ? "border-red-500 focus-within:ring-red-400"
              : "border-[#f5c6c4] focus-within:ring-[#db2920]"
          }`}
        >
          {startIcon && (
            <span className="mr-2" style={{ color: "#db2920" }}>
              {startIcon}
            </span>
          )}

          {type === "textarea" ? (
            <textarea
              ref={ref}
              id={name}
              name={name}
              value={value}
              onChange={onChange}
              rows={rows}
              placeholder={placeholder}
              maxLength={maxLength}
              className="w-full resize-none outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          ) : (
            <input
              ref={ref}
              id={name}
              name={name}
              type={type}
              value={value}
              onChange={onChange}
              placeholder={placeholder}
              maxLength={maxLength}
              className="w-full outline-none bg-transparent text-gray-700 placeholder-gray-400"
            />
          )}
        </div>

        {error && <p className="text-sm text-red-500 mt-1">{error}</p>}
      </div>
    );
  },
);

InputField.displayName = "InputField";
export default InputField;
