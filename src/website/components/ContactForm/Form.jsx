// import { useState, useEffect } from "react";
// import InputField from "../common/InputField";
// import SelectField from "../common/SelectField";
// import { Loader } from "lucide-react";
// import { useApiMutation } from "@/hooks/useApiMutation";
// import { CREATE_WEB_ENQUIRY } from "@/api";
// import { showErrorToast, showSuccessToast } from "@/website/utils/toast";

// const Form = () => {
//   const [formData, setFormData] = useState({
//     full_name: "",
//     mobile_no: "",
//     email_id: "",
//     Project: "",
//     description: "",
//   });
//   const [errors, setErrors] = useState({});
//   const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name == "mobile_no") {
//       const digitsOnly = value.replace(/\D/g, "");
//       setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
//     } else {
//       setFormData((prev) => ({ ...prev, [name]: value }));
//     }
//   };

//   const validate = () => {
//     let newErrors = {};
//     if (!formData.full_name.trim())
//       newErrors.full_name = "Full Name is required";
//     if (!formData.mobile_no.trim())
//       newErrors.mobile_no = "Mobile No is required";
//     if (!formData.email_id.trim()) newErrors.email_id = "Email is required";
//     if (!formData.description.trim())
//       newErrors.description = "Description is required";
//     return newErrors;
//   };

//   const reset = () => {
//     setFormData({
//       full_name: "",
//       mobile_no: "",
//       email_id: "",
//       Project: "",
//       description: "",
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const validationErrors = validate();
//     setErrors(validationErrors);

//     if (Object.keys(validationErrors).length > 0) return;
//     try {
//       const response = await submitTrigger({
//         url: CREATE_WEB_ENQUIRY,
//         method: "post",
//         data: formData,
//       });
//       if (response?.code === 201) {
//         showSuccessToast(response.message || "Enquiry created successfully!");
//         reset();
//       } else {
//         showErrorToast(response.message || "Something went wrong");
//       }
//     } catch (error) {
//       console.log(error, "error");
//       showErrorToast(error?.response?.data?.message || "Failed to submit");
//     }
//   };
//   return (
//     <form
//       onSubmit={handleSubmit}
//       className="flex flex-wrap  w-full m-auto justify-between"
//       data-aos="fade-right"
//       data-aos-delay="500"
//     >
//       <div className="sm:flex gap-3 w-full">
//         <InputField
//           label="Full Name"
//           name="full_name"
//           value={formData.full_name}
//           onChange={handleChange}
//           error={errors.full_name}
//           required
//           placeholder="Enter your Full Name"
//         />
//         <InputField
//           label="Mobile No"
//           name="mobile_no"
//           value={formData.mobile_no}
//           onChange={handleChange}
//           error={errors.mobile_no}
//           maxLength={10}
//           required
//           placeholder="Enter your Mobile No"
//         />
//       </div>
//       <div className="sm:flex gap-3 w-full">
//         <InputField
//           label="Email Id"
//           type="email"
//           name="email_id"
//           value={formData.email_id}
//           onChange={handleChange}
//           error={errors.email_id}
//           required
//           placeholder="Enter your Email Id"
//         />
//       </div>
//       <div className="w-full">
//         <InputField
//           label="Description"
//           name="description"
//           value={formData.description}
//           onChange={handleChange}
//           type="textarea"
//           error={errors.description}
//           required
//           placeholder="Anything else you want to communicate"
//         />
//       </div>
//       <div className="mx-0 my-2.5 w-full flex justify-center">
//         <button
//           type="submit"
//           disabled={submitLoading}
//           className={`w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
//             submitLoading ? "cursor-not-allowed opacity-70" : ""
//           }`}
//         >
//           {submitLoading && <Loader className="w-5 h-5 animate-spin" />}
//           {submitLoading ? "Submitting..." : "Submit"}
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Form;
import { useState } from "react";
import InputField from "../common/InputField";
import { Loader } from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { CREATE_WEB_ENQUIRY } from "@/api";
import { showErrorToast, showSuccessToast } from "@/website/utils/toast";

const Form = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    mobile_no: "",
    email_id: "",
    Project: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name == "mobile_no") {
      const digitsOnly = value.replace(/\D/g, "");
      setFormData((prev) => ({ ...prev, [name]: digitsOnly }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validate = () => {
    let newErrors = {};
    if (!formData.full_name.trim())
      newErrors.full_name = "Full Name is required";
    if (!formData.mobile_no.trim())
      newErrors.mobile_no = "Mobile No is required";
    if (!formData.email_id.trim()) newErrors.email_id = "Email is required";
    if (!formData.description.trim())
      newErrors.description = "Description is required";
    return newErrors;
  };

  const reset = () => {
    setFormData({
      full_name: "",
      mobile_no: "",
      email_id: "",
      Project: "",
      description: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;
    try {
      const response = await submitTrigger({
        url: CREATE_WEB_ENQUIRY,
        method: "post",
        data: formData,
      });
      if (response?.code === 201) {
        showSuccessToast(response.message || "Enquiry created successfully!");
        reset();
      } else {
        showErrorToast(response.message || "Something went wrong");
      }
    } catch (error) {
      showErrorToast(error?.response?.data?.message || "Failed to submit");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-wrap w-full m-auto justify-between"
      data-aos="fade-right"
      data-aos-delay="500"
    >
      <div className="sm:flex gap-3 w-full">
        <InputField
          label="Full Name"
          name="full_name"
          value={formData.full_name}
          onChange={handleChange}
          error={errors.full_name}
          required
          placeholder="Enter your Full Name"
        />
        <InputField
          label="Mobile No"
          name="mobile_no"
          value={formData.mobile_no}
          onChange={handleChange}
          error={errors.mobile_no}
          maxLength={10}
          required
          placeholder="Enter your Mobile No"
        />
      </div>
      <div className="sm:flex gap-3 w-full">
        <InputField
          label="Email Id"
          type="email"
          name="email_id"
          value={formData.email_id}
          onChange={handleChange}
          error={errors.email_id}
          required
          placeholder="Enter your Email Id"
        />
      </div>
      <div className="w-full">
        <InputField
          label="Description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          type="textarea"
          error={errors.description}
          required
          placeholder="Anything else you want to communicate"
        />
      </div>
      <div className="mx-0 my-2.5 w-full flex justify-center">
        <button
          type="submit"
          disabled={submitLoading}
          className={`w-full mt-3 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
            submitLoading ? "cursor-not-allowed opacity-70" : ""
          }`}
          style={{ background: "#db2920" }}
          onMouseEnter={(e) => {
            if (!submitLoading) e.currentTarget.style.background = "#9b1c15";
          }}
          onMouseLeave={(e) => {
            if (!submitLoading) e.currentTarget.style.background = "#db2920";
          }}
        >
          {submitLoading && <Loader className="w-5 h-5 animate-spin" />}
          {submitLoading ? "Submitting..." : "Submit"}
        </button>
      </div>
    </form>
  );
};

export default Form;
