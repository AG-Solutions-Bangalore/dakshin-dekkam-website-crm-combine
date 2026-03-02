import { useState, useRef } from "react";
import {
  Mail,
  Phone,
  FileText,
  Building,
  Loader,
  User,
  Calendar,
  Clock,
  AlertCircle,
  MessageCircle,
} from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import InputField from "@/website/components/common/InputField";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { CREATE_BOOKING_HALL } from "@/api";

const AlertModal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[80vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <div className="p-6 overflow-y-auto max-h-[60vh]">{children}</div>
        <div className="flex justify-end p-6 border-t border-gray-200">
          <button
            onClick={onClose}
            className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition"
          >
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
};

const BhavanForm = () => {
  const [formData, setFormData] = useState({
    guest_name: "",
    company_name: "",
    guest_mobile_number: "",
    guest_landline_number: "",
    guest_address: "",
    guest_email: "",
    function_type: "",
    guest_no_days: "",
    guest_checkIn_date: "",
    guest_checkIn_time: "",
    guest_checkOut_date: "",
    guest_checkOut_time: "",
    special_instructions: "",
    no_of_guest: "",
    terms_accepted: false,
  });

  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const [errors, setErrors] = useState({});
  const [activeSection, setActiveSection] = useState("guest");
  const [showTermsModal, setShowTermsModal] = useState(false);

  const fieldRefs = {
    guest_name: useRef(null),
    guest_mobile_number: useRef(null),
    guest_email: useRef(null),
    function_type: useRef(null),
    guest_checkIn_date: useRef(null),
    guest_checkIn_time: useRef(null),
    guest_checkOut_date: useRef(null),
    guest_checkOut_time: useRef(null),
    no_of_guest: useRef(null),
    terms_accepted: useRef(null),
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name === "guest_mobile_number" || name === "guest_landline_number") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    if (name === "no_of_guest" || name === "guest_no_days") {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: "" });
      return;
    }

    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" });
  };

  const validate = () => {
    let newErrors = {};

    if (!formData.guest_name?.trim())
      newErrors.guest_name = "Guest name is required";
    if (!formData.guest_address?.trim())
      newErrors.guest_address = "Address  is required";
    if (!formData.guest_mobile_number) {
      newErrors.guest_mobile_number = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.guest_mobile_number)) {
      newErrors.guest_mobile_number = "Enter a valid 10-digit number";
    }
    if (!formData.guest_email?.trim()) {
      newErrors.guest_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.guest_email)) {
      newErrors.guest_email = "Enter a valid email";
    }
    if (!formData.function_type?.trim())
      newErrors.function_type = "Function type is required";
    if (!formData.guest_checkIn_date)
      newErrors.guest_checkIn_date = "Check-in date is required";
    if (!formData.guest_checkIn_time)
      newErrors.guest_checkIn_time = "Check-in time is required";
    if (!formData.guest_checkOut_date)
      newErrors.guest_checkOut_date = "Check-out date is required";
    if (!formData.guest_checkOut_time)
      newErrors.guest_checkOut_time = "Check-out time is required";
    if (!formData.no_of_guest)
      newErrors.no_of_guest = "Number of guests is required";
    if (!formData.terms_accepted)
      newErrors.terms_accepted = "You must accept the terms and conditions";

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const ref = fieldRefs[firstErrorKey];

      if (firstErrorKey === "terms_accepted") {
        setActiveSection("booking");
      } else {
        setActiveSection("guest");
      }

      setTimeout(() => {
        if (ref?.current) {
          ref.current.scrollIntoView({
            behavior: "smooth",
            block: "center",
            inline: "nearest",
          });
        }
      }, 100);

      return;
    }

    try {
      const response = await submitTrigger({
        url: CREATE_BOOKING_HALL,
        method: "post",
        data: formData,
      });

      if (response?.code === 201) {
        showSuccessToast(
          response.message || "Banquet order submitted successfully!",
        );

        // Reset form
        setFormData({
          guest_name: "",
          company_name: "",
          guest_mobile_number: "",
          guest_landline_number: "",
          guest_address: "",
          guest_email: "",
          function_type: "",
          guest_no_days: "",
          guest_checkIn_date: "",
          guest_checkIn_time: "",
          guest_checkOut_date: "",
          guest_checkOut_time: "",
          special_instructions: "",
          no_of_guest: "",
          terms_accepted: false,
        });
      } else {
        showErrorToast(response.message || "Something went wrong");
      }
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message || "Failed to submit banquet order",
      );
    }
  };

  // const sectionButtons = [
  //   { id: "guest", label: "Guest Details", icon: User },
  //   { id: "booking", label: "Booking Details", icon: Calendar },
  // ];

  const hasErrorsInSection = (sectionId) => {
    const sectionFields = {
      guest: ["guest_name", "guest_mobile_number", "guest_email"],
      booking: [
        "function_type",
        "guest_checkIn_date",
        "guest_checkIn_time",
        "guest_checkOut_date",
        "guest_checkOut_time",
        "no_of_guest",
        "terms_accepted",
      ],
    };

    return sectionFields[sectionId]?.some((field) => errors[field]);
  };

  return (
    <div className="max-w-7xl mx-auto bg-gradient-to-br from-blue-50 to-indigo-50 my-4 overflow-hidden">
      <AlertModal
        isOpen={showTermsModal}
        onClose={() => setShowTermsModal(false)}
        title="Terms & Conditions"
      >
        <div className="text-sm text-gray-700 space-y-3">
          {[
            "TOTAL 18% GST will be charged.",
            "Payment terms: 50% advance at the time of booking and the balance 50% to be paid 3 days before the function date. Under no circumstances the possession of the hall will be given without the payment of the entire hall rent and the security deposit.",
            "Security deposit of Rs. 20,000/- is to be paid 3 days before the function date.",
            "Any damages to the property shall be paid by the client at prevailing market value.",
            "(a) Cancellation made before 90 days from the date of function 10% of the hall rent will be deducted.",
            "(b) Cancellation made between 61 days to 90 days 25% of the hall rent will be deducted.",
            "(c) Cancellation made between 31 days to 60 days 50% of the hall rent will be deducted.",
            "(d) No cancellation will be accepted less than 30 days from the function date. If so, the entire hall rent will be forfeited.",
            "Hall cancellations shall be considered in writing only from the host and the same should be acknowledged by the G.M. or the Management.",
            "Usage of extra hours is permissible only if the hall is available at the hour and the cost for the additional hour will be charged @ Rs. 5,000/- per hour.",
            "The hall timings will be from 6:00 a.m. to 12:00 midnight, which will be as one day.",
            "The possession of the hall and the kitchen will be given strictly at the time mentioned above and only when supported by the Photo ID Card / facsimile of the banquet order form.",
          ].map((term, index) => (
            <p key={index} className="flex items-start gap-2">
              <span className="text-blue-600 mt-0.5">•</span>
              <span>{term}</span>
            </p>
          ))}
        </div>
      </AlertModal>

      {/* <div className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="text-center flex flex-row items-center justify-between mb-4">
          <div className="flex items-center justify-center gap-3 mb-2">
            <div className="w-10 h-10 bg-yellow-500 rounded-md flex items-center justify-center">
              <Building className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-800">Kutchi Bhavan</h1>
          </div>
          <h2 className="text-xl font-semibold text-gray-700 mb-4 bg-yellow-100 inline-block px-4 py-2 rounded-md">
            BANQUET ORDER FORM
          </h2>
        </div>

        <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
          <div className="text-center">
            <p className="font-semibold text-blue-800 text-sm">DAKSHIN BHARAT KUTCHI DASHA OSWAL JAIN EKKAM</p>
            <p className="text-gray-600 text-xs mt-1">No. 448, 1st Main Road, Opp. Mini Forest, JP Nagar 3rd Phase, Bangalore – 560 078</p>
            <div className="flex flex-wrap justify-center items-center gap-3 mt-2 text-xs">
              <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                <Phone className="w-3 h-3 text-blue-600" />
                <span className="text-gray-700">080-26589759</span>
              </span>
              <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                <FileText className="w-3 h-3 text-blue-600" />
                <span className="text-gray-700">080-26589759 / 8722820426</span>
              </span>
              <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                <Mail className="w-3 h-3 text-blue-600" />
                <span className="text-gray-700">dbkodc.jainakery@yahoo.in</span>
              </span>
              <span className="flex items-center gap-1 bg-white px-2 py-1 rounded">
                <Building className="w-3 h-3 text-blue-600" />
                <span className="text-gray-700">www.kutchibhavan.com</span>
              </span>
              <span className="text-gray-500 italic bg-white px-2 py-1 rounded">Est. 1978</span>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="bg-white border-b border-gray-200 px-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {sectionButtons.map((section) => {
            const Icon = section.icon;
            const hasError = hasErrorsInSection(section.id);

            return (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center gap-2 px-4 py-3 border-b-2 transition-all whitespace-nowrap relative ${
                  activeSection === section.id
                    ? "border-blue-500 text-blue-600 bg-blue-50"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium">{section.label}</span>
                {hasError && (
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                )}
              </button>
            );
          })}
        </div>
      </div> */}

      <form onSubmit={handleSubmit} className="px-8 py-6 bg-white">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Guest Name */}
          <InputField
            ref={fieldRefs.guest_name}
            label="Name of the Guest"
            name="guest_name"
            value={formData.guest_name}
            onChange={handleChange}
            placeholder="Enter guest name"
            startIcon={<User size={18} />}
            error={errors.guest_name}
            required
          />

          {/* Company Name */}
          <InputField
            label="Company's Name"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            placeholder="Enter company name"
            startIcon={<Building size={18} />}
          />

          {/* Contact Mobile */}
          <InputField
            ref={fieldRefs.guest_mobile_number}
            label="Contact Mob No"
            name="guest_mobile_number"
            value={formData.guest_mobile_number}
            onChange={handleChange}
            placeholder="Enter 10-digit number"
            startIcon={<Phone size={18} />}
            error={errors.guest_mobile_number}
            required
          />

          {/* Landline No */}
          <InputField
            label="Landline No"
            name="guest_landline_number"
            value={formData.guest_landline_number}
            onChange={handleChange}
            placeholder="Enter landline number"
            startIcon={<Phone size={18} />}
          />

          {/* Email */}
          <InputField
            ref={fieldRefs.guest_email}
            label="Email"
            type="email"
            name="guest_email"
            value={formData.guest_email}
            onChange={handleChange}
            placeholder="Enter email"
            startIcon={<Mail size={18} />}
            error={errors.guest_email}
            required
          />

          <InputField
            ref={fieldRefs.function_type}
            label="Type of Function"
            name="function_type"
            value={formData.function_type}
            onChange={handleChange}
            placeholder="Enter function type"
            startIcon={<Calendar size={18} />}
            error={errors.function_type}
            required
          />

          <InputField
            label="No. of Days"
            name="guest_no_days"
            value={formData.guest_no_days}
            onChange={handleChange}
            placeholder="Enter number of days"
            startIcon={<Calendar size={18} />}
            required
          />

          <InputField
            ref={fieldRefs.guest_checkIn_date}
            label="Check In Date"
            type="date"
            name="guest_checkIn_date"
            value={formData.guest_checkIn_date}
            onChange={handleChange}
            startIcon={<Calendar size={18} />}
            error={errors.guest_checkIn_date}
            required
          />

          <InputField
            ref={fieldRefs.guest_checkIn_time}
            label="Check In Time"
            type="time"
            name="guest_checkIn_time"
            value={formData.guest_checkIn_time}
            onChange={handleChange}
            startIcon={<Clock size={18} />}
            error={errors.guest_checkIn_time}
            required
          />

          <InputField
            ref={fieldRefs.guest_checkOut_date}
            label="Check Out Date"
            type="date"
            name="guest_checkOut_date"
            value={formData.guest_checkOut_date}
            onChange={handleChange}
            startIcon={<Calendar size={18} />}
            error={errors.guest_checkOut_date}
            required
          />

          <InputField
            ref={fieldRefs.guest_checkOut_time}
            label="Check Out Time"
            type="time"
            name="guest_checkOut_time"
            value={formData.guest_checkOut_time}
            onChange={handleChange}
            startIcon={<Clock size={18} />}
            error={errors.guest_checkOut_time}
            required
          />

          <InputField
            ref={fieldRefs.no_of_guest}
            label="No. of Guests expected"
            name="no_of_guest"
            value={formData.no_of_guest}
            onChange={handleChange}
            placeholder="Enter number of guests"
            startIcon={<User size={18} />}
            error={errors.no_of_guest}
            required
          />
        </div>

        <div className="flex flex-col">
          <label className="font-medium text-gray-700 text-sm mb-2 flex items-center gap-1">
            <User className="w-4 h-4 text-blue-600" />
            Address <span className="text-red-700">*</span>
          </label>
          <textarea
            name="guest_address"
            value={formData.guest_address}
            onChange={handleChange}
            rows="2"
            className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
            placeholder="Enter complete address"
          />
          {errors.guest_address && (
            <span className="text-red-500 text-sm flex items-center gap-1">
              {errors.guest_address}
            </span>
          )}
        </div>

        <div className="mt-4">
          <div className="md:col-span-2 lg:col-span-3">
            <InputField
              label="Special Instructions"
              name="special_instructions"
              type="textarea"
              value={formData.special_instructions}
              onChange={handleChange}
              placeholder="Enter any special instructions or requests"
              startIcon={<MessageCircle size={18} />}
            />
          </div>

          <div className="bg-white rounded-lg  px-4 py-2 mt-2">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <input
                  ref={fieldRefs.terms_accepted}
                  type="checkbox"
                  name="terms_accepted"
                  checked={formData.terms_accepted}
                  onChange={handleChange}
                  className={`h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5 ${
                    errors.terms_accepted ? "border-red-500" : ""
                  }`}
                />
                <label className="text-sm text-gray-700">
                  I have gone through the above{" "}
                  <span
                    role="button"
                    className="underline text-blue-700"
                    onClick={() => setShowTermsModal(true)}
                  >
                    Terms and Conditions
                  </span>{" "}
                  and accept the same.
                </label>
              </div>
              {errors.terms_accepted && (
                <span className="text-red-500 text-sm flex items-center gap-1">
                  <AlertCircle className="w-4 h-4" />
                  {errors.terms_accepted}
                </span>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-end items-center mt-8 pt-6 border-t border-gray-200">
          {/* <div className="flex gap-2">
            {sectionButtons.map((section, index) => {
              const hasError = hasErrorsInSection(section.id);
              return (
                <button
                  key={section.id}
                  type="button"
                  onClick={() => setActiveSection(section.id)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition relative ${
                    activeSection === section.id
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                  }`}
                >
                  {index + 1}
                  {hasError && (
                    <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></div>
                  )}
                </button>
              );
            })}
          </div> */}

          {/* <button
            type="submit"
            disabled={submitLoading}
            className={`bg-green-600 hover:bg-green-700 text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2 min-w-[200px] ${
              submitLoading ? "cursor-not-allowed opacity-70" : ""
            }`}
          >
            {submitLoading && <Loader className="w-5 h-5 animate-spin" />}
            {submitLoading ? "Submitting..." : "Submit Banquet Order"}
          </button> */}
          <button
            type="submit"
            disabled={submitLoading}
            className={`text-white font-medium py-3 px-8 rounded-lg transition flex items-center justify-center gap-2 min-w-[200px] ${
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
            {submitLoading ? "Submitting..." : "Submit Banquet Order"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BhavanForm;
