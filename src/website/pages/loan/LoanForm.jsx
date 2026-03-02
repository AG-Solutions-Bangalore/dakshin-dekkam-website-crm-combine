import { useState, useRef } from "react";
import {
  MapPin,
  User,
  Mail,
  Phone,
  Home,
  Calendar,
  BookOpen,
  GraduationCap,
  Building,
  FileText,
  Target,
  DollarSign,
  Users,
  Loader,
} from "lucide-react";
import { useApiMutation } from "@/hooks/useApiMutation";
import { useFetchBranch } from "@/hooks/useApi";

import InputField from "@/website/components/common/InputField";
import SelectField from "@/website/components/common/SelectField";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import { CREATE_LOAN_API } from "@/api";

const LoanForm = () => {
  const [formData, setFormData] = useState({
    branch_id: "",
    loans_type: "Education Loan",
    user_full_name: "",
    user_email: "",
    user_dob: "",
    user_gender: "",
    user_residentaial_address: "",
    user_city: "",
    user_pincode: "",
    user_mobile_number: "",
    user_aadhar_number: "",
    user_parents_name: "",
    user_parents_occupation: "",
    user_annual_income: "",
    user_no_dependents: "",
    user_college_degree: "",
    user_qualification: "",
    user_degree_percentage: "",
    user_school_percentage: "",
    user_college_percentage: "",
    user_entrance_exam: "",
    user_entrance_exam_score: "",
    user_education_loan_for: "",
    user_college_name: "",
    user_course_name: "",
    user_course_duration: "",
    user_course_date: "",
    user_college_address: "",
    user_website_number_of_college: "",
    user_total_fees: "",
    user_total_loans: "",
    user_other_loans: "",
    user_intend_to_repay: "",
    user_career_goals: "",
    user_passport_photo: "",
    user_aadharcard_photo: "",
    user_school_marksheet_photo: "",
    user_college_marksheet_photo: "",
    user_college_fee_structure: "",
    user_college_admission_letter: "",
    user_other_letter: "",
    user_previous_year_marksheet: "",
    loan_required_copy: "No",
  });

  const [declarationAccepted, setDeclarationAccepted] = useState(false);
  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: branchdata } = useFetchBranch();
  const [errors, setErrors] = useState({});

  const fieldRefs = {
    branch_id: useRef(null),
    loans_type: useRef(null),
    user_full_name: useRef(null),
    user_email: useRef(null),
    user_dob: useRef(null),
    user_gender: useRef(null),
    user_residentaial_address: useRef(null),
    user_city: useRef(null),
    user_pincode: useRef(null),
    user_mobile_number: useRef(null),
    user_aadhar_number: useRef(null),
    user_parents_name: useRef(null),
    user_parents_occupation: useRef(null),
    user_annual_income: useRef(null),
    user_no_dependents: useRef(null),
    user_college_degree: useRef(null),
    user_qualification: useRef(null),
    user_degree_percentage: useRef(null),
    user_school_percentage: useRef(null),
    user_college_percentage: useRef(null),
    user_entrance_exam: useRef(null),
    user_entrance_exam_score: useRef(null),
    user_education_loan_for: useRef(null),
    user_college_name: useRef(null),
    user_course_name: useRef(null),
    user_course_duration: useRef(null),
    user_course_date: useRef(null),
    user_college_address: useRef(null),
    user_website_number_of_college: useRef(null),
    user_total_fees: useRef(null),
    user_total_loans: useRef(null),
    user_other_loans: useRef(null),
    user_intend_to_repay: useRef(null),
    user_career_goals: useRef(null),
    user_passport_photo: useRef(null),
    user_aadharcard_photo: useRef(null),
    user_school_marksheet_photo: useRef(null),
    user_college_marksheet_photo: useRef(null),
    user_college_fee_structure: useRef(null),
    user_college_admission_letter: useRef(null),
    user_other_letter: useRef(null),
    user_previous_year_marksheet: useRef(null),
  };

  const genderOptions = [
    { value: "Male", label: "Male" },
    { value: "Female", label: "Female" },
    { value: "Other", label: "Other" },
  ];

  const qualificationOptions = [
    { value: "10th", label: "10th Standard" },
    { value: "12th", label: "12th Standard" },
    { value: "Diploma", label: "Diploma" },
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Postgraduate", label: "Postgraduate" },
    { value: "PhD", label: "PhD" },
  ];

  const educationLevelOptions = [
    { value: "Undergraduate", label: "Undergraduate" },
    { value: "Postgraduate", label: "Postgraduate" },
    { value: "Diploma", label: "Diploma" },
    { value: "Certificate Course", label: "Certificate Course" },
    { value: "PhD", label: "PhD" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Mobile number (10 digits)
    if (name === "user_mobile_number") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    // Aadhar number (12 digits)
    if (name === "user_aadhar_number") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 12) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    // Pincode (6 digits)
    if (name === "user_pincode") {
      const numericValue = value.replace(/\D/g, "");
      if (numericValue.length <= 6) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    // Numeric fields that allow decimals for percentages
    if (
      name === "user_degree_percentage" ||
      name === "user_school_percentage" ||
      name === "user_college_percentage"
    ) {
      // Allow numbers and decimal point
      const decimalValue = value.replace(/[^\d.]/g, "");
      // Ensure only one decimal point
      const parts = decimalValue.split(".");
      if (parts.length <= 2) {
        setFormData({ ...formData, [name]: decimalValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    // Other numeric fields (no decimals)
    if (
      name === "user_no_dependents" ||
      name === "user_annual_income" ||
      name === "user_total_fees" ||
      name === "user_total_loans" ||
      name === "user_course_duration"
    ) {
      const numericValue = value.replace(/\D/g, "");
      setFormData({ ...formData, [name]: numericValue });
      setErrors({ ...errors, [name]: "" });
      return;
    }

    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setErrors({ ...errors, [name]: "" });
    }
  };

  const validate = () => {
    let newErrors = {};

    // Personal Information - ALL REQUIRED
    if (!formData.branch_id)
      newErrors.branch_id = "Branch selection is required";
    if (!formData.loans_type) newErrors.loans_type = "Loan type is required";
    if (!formData.user_full_name?.trim())
      newErrors.user_full_name = "Applicant's full name is required";
    if (!formData.user_email?.trim()) {
      newErrors.user_email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.user_email)) {
      newErrors.user_email = "Enter a valid email";
    }
    if (!formData.user_dob) newErrors.user_dob = "Date of birth is required";
    if (!formData.user_gender) newErrors.user_gender = "Gender is required";
    if (!formData.user_residentaial_address?.trim())
      newErrors.user_residentaial_address = "Residential address is required";
    if (!formData.user_city?.trim()) newErrors.user_city = "City is required";
    if (!formData.user_pincode) {
      newErrors.user_pincode = "Pincode is required";
    } else if (!/^[0-9]{6}$/.test(formData.user_pincode)) {
      newErrors.user_pincode = "Enter a valid 6-digit pincode";
    }
    if (!formData.user_mobile_number) {
      newErrors.user_mobile_number = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.user_mobile_number)) {
      newErrors.user_mobile_number = "Enter a valid 10-digit number";
    }
    if (!formData.user_aadhar_number) {
      newErrors.user_aadhar_number = "Aadhar number is required";
    } else if (!/^[0-9]{12}$/.test(formData.user_aadhar_number)) {
      newErrors.user_aadhar_number = "Enter a valid 12-digit Aadhar number";
    }

    // Family Information - ALL REQUIRED
    if (!formData.user_parents_name?.trim())
      newErrors.user_parents_name = "Parent/Guardian name is required";
    if (!formData.user_parents_occupation?.trim())
      newErrors.user_parents_occupation = "Parent's occupation is required";
    if (!formData.user_annual_income)
      newErrors.user_annual_income = "Annual income is required";
    if (!formData.user_no_dependents)
      newErrors.user_no_dependents = "Number of dependents is required";

    // Educational Background - ALL REQUIRED
    if (!formData.user_college_degree?.trim())
      newErrors.user_college_degree = "Current qualification is required";
    if (!formData.user_qualification)
      newErrors.user_qualification = "Qualification level is required";
    if (!formData.user_degree_percentage)
      newErrors.user_degree_percentage = "Degree percentage is required";
    if (!formData.user_school_percentage)
      newErrors.user_school_percentage = "School percentage is required";
    if (!formData.user_college_percentage)
      newErrors.user_college_percentage = "College percentage is required";
    if (!formData.user_entrance_exam?.trim())
      newErrors.user_entrance_exam = "Entrance exam name is required";
    if (!formData.user_entrance_exam_score?.trim())
      newErrors.user_entrance_exam_score = "Entrance exam score is required";

    // Course Information - ALL REQUIRED
    if (!formData.user_education_loan_for)
      newErrors.user_education_loan_for = "Education level is required";
    if (!formData.user_college_name?.trim())
      newErrors.user_college_name = "College name is required";
    if (!formData.user_course_name?.trim())
      newErrors.user_course_name = "Course name is required";
    if (!formData.user_course_duration)
      newErrors.user_course_duration = "Course duration is required";
    if (!formData.user_course_date)
      newErrors.user_course_date = "Course start date is required";
    if (!formData.user_college_address?.trim())
      newErrors.user_college_address = "College address is required";
    if (!formData.user_website_number_of_college?.trim())
      newErrors.user_website_number_of_college =
        "Website and contact details are required";
    if (!formData.user_total_fees)
      newErrors.user_total_fees = "Total fees is required";
    if (!formData.user_total_loans)
      newErrors.user_total_loans = "Loan amount required is required";
    if (!formData.user_other_loans?.trim())
      newErrors.user_other_loans = "Existing loans information is required";
    if (!formData.user_intend_to_repay?.trim())
      newErrors.user_intend_to_repay = "Repayment plan is required";
    if (!formData.user_career_goals?.trim()) {
      newErrors.user_career_goals = "Career goals description is required";
    }

    // Document Uploads - ALL REQUIRED
    if (!formData.user_passport_photo)
      newErrors.user_passport_photo = "Passport photo is required";
    if (!formData.user_aadharcard_photo)
      newErrors.user_aadharcard_photo = "Aadhar card photo is required";
    if (!formData.user_school_marksheet_photo)
      newErrors.user_school_marksheet_photo = "School marksheet is required";
    if (!formData.user_college_marksheet_photo)
      newErrors.user_college_marksheet_photo = "College marksheet is required";
    if (!formData.user_college_fee_structure)
      newErrors.user_college_fee_structure =
        "Fee structure document is required";
    if (!formData.user_college_admission_letter)
      newErrors.user_college_admission_letter = "Admission letter is required";
    if (!formData.user_previous_year_marksheet)
      newErrors.user_previous_year_marksheet =
        "Previous year marksheet is required";
    if (!formData.user_other_letter)
      newErrors.user_other_letter = "Other relevant documents are required";

    if (!declarationAccepted) {
      newErrors.declaration = "You must accept the declaration";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      const firstErrorKey = Object.keys(validationErrors)[0];
      const ref = fieldRefs[firstErrorKey];
      if (ref?.current) {
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "center",
          inline: "nearest",
        });
      }
      return;
    }

    try {
      const formDataToSubmit = new FormData();

      // Append all form data to FormData object
      Object.keys(formData).forEach((key) => {
        if (
          key.includes("_photo") ||
          key.includes("user_aadharcard_photo") ||
          key.includes("_structure") ||
          key.includes("_letter") ||
          key.includes("_marksheet")
        ) {
          // For file fields
          if (formData[key]) {
            formDataToSubmit.append(key, formData[key]);
          }
        } else {
          // For regular fields
          formDataToSubmit.append(key, formData[key]);
        }
      });

      const response = await submitTrigger({
        url: CREATE_LOAN_API,
        method: "post",
        data: formDataToSubmit,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response?.code === 201) {
        showSuccessToast(
          response.message || "Loan application submitted successfully!",
        );

        // Reset form - FIXED: Include loans_type with default value
        setFormData({
          branch_id: "",
          loans_type: "Education Loan", // Add this default value
          user_full_name: "",
          user_email: "",
          user_dob: "",
          user_gender: "",
          user_residentaial_address: "",
          user_city: "",
          user_pincode: "",
          user_mobile_number: "",
          user_aadhar_number: "",
          user_parents_name: "",
          user_parents_occupation: "",
          user_annual_income: "",
          user_no_dependents: "",
          user_college_degree: "",
          user_qualification: "",
          user_degree_percentage: "",
          user_school_percentage: "",
          user_college_percentage: "",
          user_entrance_exam: "",
          user_entrance_exam_score: "",
          user_education_loan_for: "",
          user_college_name: "",
          user_course_name: "",
          user_course_duration: "",
          user_course_date: "",
          user_college_address: "",
          user_website_number_of_college: "",
          user_total_fees: "",
          user_total_loans: "",
          user_other_loans: "",
          user_intend_to_repay: "",
          user_career_goals: "",
          user_passport_photo: "",
          user_aadharcard_photo: "",
          user_school_marksheet_photo: "",
          user_college_marksheet_photo: "",
          user_college_fee_structure: "",
          user_college_admission_letter: "",
          user_other_letter: "",
          user_previous_year_marksheet: "",
          loan_required_copy: "No",
        });
        setDeclarationAccepted(false);

        // Also reset file inputs
        Object.keys(fieldRefs).forEach((key) => {
          if (
            fieldRefs[key]?.current &&
            fieldRefs[key].current.type === "file"
          ) {
            fieldRefs[key].current.value = "";
          }
        });
      } else {
        showErrorToast(response.message || "Something went wrong");
      }
    } catch (error) {
      showErrorToast(
        error?.response?.data?.message || "Failed to submit loan application",
      );
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-6xl mx-auto bg-white my-2 px-4 sm:px-6"
    >
      {/* Header Section */}
      <div className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800 mb-4">
          DBKDO EKKAM - Education Loan Application Form
        </h1>
        <div className="text-xs sm:text-sm text-gray-600 space-y-2">
          <p>
            This form is for requesting Education loan from Sri DBKDO Jain Ekkam
            for the purpose of pursuing Graduation, Post Graduation or Diploma
            in specific specialised field.
          </p>
          <p className="font-semibold text-red-600">
            ALL FIELDS ARE MANDATORY. Please fill all fields and attach all
            required documents. Incomplete form will not be considered.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {/* Branch Selection */}
        <div className="lg:col-span-2">
          <SelectField
            ref={fieldRefs.branch_id}
            label="Branch*"
            name="branch_id"
            value={formData.branch_id}
            onChange={handleChange}
            options={
              branchdata?.data?.map((branch) => ({
                value: String(branch.id),
                label: branch.branch_name,
              })) || []
            }
            error={errors.branch_id}
            required
            startIcon={<MapPin size={18} />}
          />
        </div>

        {/* Personal Information Section */}
        <div className="md:col-span-2 lg:col-span-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Personal Information
          </h2>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_full_name}
            label="Applicant's Full Name (as per academic records)*"
            name="user_full_name"
            value={formData.user_full_name}
            onChange={handleChange}
            placeholder="Enter full name as per academic records"
            startIcon={<User size={18} />}
            error={errors.user_full_name}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_email}
            label="Email*"
            type="email"
            name="user_email"
            value={formData.user_email}
            onChange={handleChange}
            placeholder="Enter email address"
            startIcon={<Mail size={18} />}
            error={errors.user_email}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_dob}
            label="Date of Birth*"
            type="date"
            name="user_dob"
            value={formData.user_dob}
            onChange={handleChange}
            startIcon={<Calendar size={18} />}
            error={errors.user_dob}
            required
          />
        </div>

        <div className="md:col-span-1">
          <SelectField
            ref={fieldRefs.user_gender}
            label="Gender*"
            name="user_gender"
            value={formData.user_gender}
            onChange={handleChange}
            options={genderOptions}
            error={errors.user_gender}
            required
            startIcon={<Users size={18} />}
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_mobile_number}
            label="Mobile Number*"
            type="text"
            name="user_mobile_number"
            value={formData.user_mobile_number}
            onChange={handleChange}
            placeholder="Enter 10-digit mobile number"
            startIcon={<Phone size={18} />}
            error={errors.user_mobile_number}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_aadhar_number}
            label="Aadhar Number*"
            type="text"
            name="user_aadhar_number"
            value={formData.user_aadhar_number}
            onChange={handleChange}
            placeholder="Enter 12-digit Aadhar number"
            startIcon={<FileText size={18} />}
            error={errors.user_aadhar_number}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_city}
            label="City*"
            name="user_city"
            value={formData.user_city}
            onChange={handleChange}
            placeholder="Enter city"
            startIcon={<MapPin size={18} />}
            error={errors.user_city}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-3">
          <InputField
            ref={fieldRefs.user_residentaial_address}
            label="Residential Address*"
            name="user_residentaial_address"
            type="textarea"
            value={formData.user_residentaial_address}
            onChange={handleChange}
            placeholder="Enter complete residential address"
            startIcon={<Home size={18} />}
            error={errors.user_residentaial_address}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_pincode}
            label="Pincode*"
            name="user_pincode"
            value={formData.user_pincode}
            onChange={handleChange}
            placeholder="Enter 6-digit pincode"
            startIcon={<MapPin size={18} />}
            error={errors.user_pincode}
            required
          />
        </div>

        {/* Family Information Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Family Information
          </h2>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_parents_name}
            label="Parent / Guardian Full Name*"
            name="user_parents_name"
            value={formData.user_parents_name}
            onChange={handleChange}
            placeholder="Enter parent/guardian full name"
            startIcon={<User size={18} />}
            error={errors.user_parents_name}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_parents_occupation}
            label="Parent's / Guardian's Occupation*"
            name="user_parents_occupation"
            value={formData.user_parents_occupation}
            onChange={handleChange}
            placeholder="Enter occupation"
            startIcon={<Building size={18} />}
            error={errors.user_parents_occupation}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_annual_income}
            label="Total Annual Family Income from all sources (in INR)*"
            type="text"
            name="user_annual_income"
            value={formData.user_annual_income}
            onChange={handleChange}
            placeholder="Enter annual income"
            startIcon={<DollarSign size={18} />}
            error={errors.user_annual_income}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_no_dependents}
            label="Total number of dependents in the family (excluding the applicant)*"
            type="text"
            name="user_no_dependents"
            value={formData.user_no_dependents}
            onChange={handleChange}
            placeholder="Enter number of dependents"
            startIcon={<Users size={18} />}
            error={errors.user_no_dependents}
            required
          />
        </div>

        {/* Educational Background Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Educational Background
          </h2>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_college_degree}
            label="Current Qualification (mention specialisation)*"
            name="user_college_degree"
            value={formData.user_college_degree}
            onChange={handleChange}
            placeholder="E.g. 10th, 12th, BA, BCOM, BE, LLB, MBBS etc"
            startIcon={<BookOpen size={18} />}
            error={errors.user_college_degree}
            maxLength={10}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <SelectField
            ref={fieldRefs.user_qualification}
            label="Qualification Level*"
            name="user_qualification"
            value={formData.user_qualification}
            onChange={handleChange}
            options={qualificationOptions}
            error={errors.user_qualification}
            required
            startIcon={<GraduationCap size={18} />}
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_degree_percentage}
            label="Degree Percentage/CGPA*"
            type="text"
            name="user_degree_percentage"
            value={formData.user_degree_percentage}
            onChange={handleChange}
            placeholder="Enter percentage (e.g., 85.5)"
            startIcon={<BookOpen size={18} />}
            error={errors.user_degree_percentage}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_school_percentage}
            label="10th/12th Percentage*"
            type="text"
            name="user_school_percentage"
            value={formData.user_school_percentage}
            onChange={handleChange}
            placeholder="Enter percentage (e.g., 92.3)"
            startIcon={<BookOpen size={18} />}
            error={errors.user_school_percentage}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_college_percentage}
            label="College Percentage*"
            type="text"
            name="user_college_percentage"
            value={formData.user_college_percentage}
            onChange={handleChange}
            placeholder="Enter percentage (e.g., 78.9)"
            startIcon={<BookOpen size={18} />}
            error={errors.user_college_percentage}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_entrance_exam}
            label="Name of Entrance Exam Taken*"
            name="user_entrance_exam"
            value={formData.user_entrance_exam}
            onChange={handleChange}
            placeholder="E.g. JEE, NEET, CAT, etc"
            startIcon={<FileText size={18} />}
            error={errors.user_entrance_exam}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <InputField
            ref={fieldRefs.user_entrance_exam_score}
            label="Entrance Exam Rank/Score*"
            name="user_entrance_exam_score"
            value={formData.user_entrance_exam_score}
            onChange={handleChange}
            placeholder="Enter rank or score"
            startIcon={<Target size={18} />}
            error={errors.user_entrance_exam_score}
            required
          />
        </div>

        {/* Course Information Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Course & Institution Details
          </h2>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <SelectField
            ref={fieldRefs.user_education_loan_for}
            label="What is the level of education you're seeking loan for?*"
            name="user_education_loan_for"
            value={formData.user_education_loan_for}
            onChange={handleChange}
            options={educationLevelOptions}
            error={errors.user_education_loan_for}
            required
            startIcon={<GraduationCap size={18} />}
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_college_name}
            label="Name of College/Institution Admitted*"
            name="user_college_name"
            value={formData.user_college_name}
            onChange={handleChange}
            placeholder="Enter college/institution name"
            startIcon={<Building size={18} />}
            error={errors.user_college_name}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_course_name}
            label="Name of the Course Admitted To*"
            name="user_course_name"
            value={formData.user_course_name}
            onChange={handleChange}
            placeholder="Enter course name"
            startIcon={<BookOpen size={18} />}
            error={errors.user_course_name}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_course_duration}
            label="Course Duration (in years)*"
            type="text"
            name="user_course_duration"
            value={formData.user_course_duration}
            onChange={handleChange}
            placeholder="Enter duration in years"
            startIcon={<Calendar size={18} />}
            error={errors.user_course_duration}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_course_date}
            label="Course Start Date*"
            type="date"
            name="user_course_date"
            value={formData.user_course_date}
            onChange={handleChange}
            startIcon={<Calendar size={18} />}
            error={errors.user_course_date}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-4">
          <InputField
            ref={fieldRefs.user_college_address}
            label="Full Address of the Institution*"
            name="user_college_address"
            type="textarea"
            value={formData.user_college_address}
            onChange={handleChange}
            placeholder="Enter complete college/institution address"
            startIcon={<MapPin size={18} />}
            error={errors.user_college_address}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_website_number_of_college}
            label="Website Link & Contact Number of the Institution*"
            name="user_website_number_of_college"
            value={formData.user_website_number_of_college}
            onChange={handleChange}
            placeholder="Enter website and contact details"
            startIcon={<Phone size={18} />}
            error={errors.user_website_number_of_college}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_total_fees}
            label="Total Fees of the Course (INR)*"
            type="text"
            name="user_total_fees"
            value={formData.user_total_fees}
            onChange={handleChange}
            placeholder="Enter total fees amount"
            startIcon={<DollarSign size={18} />}
            error={errors.user_total_fees}
            required
          />
        </div>

        <div className="md:col-span-1">
          <InputField
            ref={fieldRefs.user_total_loans}
            label="Loan Amount Required (INR)*"
            type="text"
            name="user_total_loans"
            value={formData.user_total_loans}
            onChange={handleChange}
            placeholder="Enter loan amount required"
            startIcon={<DollarSign size={18} />}
            error={errors.user_total_loans}
            required
          />
        </div>

        {/* Financial Information Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Financial Information
          </h2>
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_other_loans}
            label="Any existing loans from any other institutions/organizations? If YES, mention the details of the loan (total loan taken, duration)*"
            name="user_other_loans"
            type="textarea"
            value={formData.user_other_loans}
            onChange={handleChange}
            placeholder="Provide details of any existing loans"
            startIcon={<FileText size={18} />}
            error={errors.user_other_loans}
            required
          />
        </div>

        <div className="md:col-span-2 lg:col-span-2">
          <InputField
            ref={fieldRefs.user_intend_to_repay}
            label="How do you intend to repay the loan if your loan application is approved? (EMI amount, EMI start date)*"
            name="user_intend_to_repay"
            type="textarea"
            value={formData.user_intend_to_repay}
            onChange={handleChange}
            placeholder="Describe your repayment plan"
            startIcon={<DollarSign size={18} />}
            error={errors.user_intend_to_repay}
            required
          />
        </div>

        {/* Career Goals Section */}
        <div className="md:col-span-2 lg:col-span-4">
          <InputField
            ref={fieldRefs.user_career_goals}
            label="Describe your career goals and how this education will help you contribute back to our community in the future.*"
            name="user_career_goals"
            type="textarea"
            rows={6}
            value={formData.user_career_goals}
            onChange={handleChange}
            placeholder="Write about your career goals and community contribution..."
            startIcon={<Target size={18} />}
            error={errors.user_career_goals}
            required
          />
        </div>

        {/* Document Upload Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-4">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 border-b pb-2">
            Required Documents - ALL DOCUMENTS ARE MANDATORY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <InputField
              ref={fieldRefs.user_passport_photo}
              label="Passport Size Photo*"
              type="file"
              name="user_passport_photo"
              onChange={handleFileChange}
              accept="image/*"
              startIcon={<FileText size={18} />}
              error={errors.user_passport_photo}
              required
            />
            <InputField
              ref={fieldRefs.user_aadharcard_photo}
              label="Aadhar Card Photo*"
              type="file"
              name="user_aadharcard_photo"
              onChange={handleFileChange}
              accept="image/*"
              startIcon={<FileText size={18} />}
              error={errors.user_aadharcard_photo}
              required
            />

            <InputField
              ref={fieldRefs.user_school_marksheet_photo}
              label="School Marksheet*"
              type="file"
              name="user_school_marksheet_photo"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_school_marksheet_photo}
              required
            />

            <InputField
              ref={fieldRefs.user_college_marksheet_photo}
              label="College Marksheet*"
              type="file"
              name="user_college_marksheet_photo"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_college_marksheet_photo}
              required
            />

            <InputField
              ref={fieldRefs.user_college_fee_structure}
              label="Official Fee Structure Document from the College*"
              type="file"
              name="user_college_fee_structure"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_college_fee_structure}
              required
            />

            <InputField
              ref={fieldRefs.user_college_admission_letter}
              label="Official Admission Letter from the College/Institution*"
              type="file"
              name="user_college_admission_letter"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_college_admission_letter}
              required
            />

            <InputField
              ref={fieldRefs.user_previous_year_marksheet}
              label="Previous year's Marksheet*"
              type="file"
              name="user_previous_year_marksheet"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_previous_year_marksheet}
              required
            />

            <InputField
              ref={fieldRefs.user_other_letter}
              label="Any Other Relevant Documents*"
              type="file"
              name="user_other_letter"
              onChange={handleFileChange}
              accept=".pdf,.jpg,.jpeg,.png"
              startIcon={<FileText size={18} />}
              error={errors.user_other_letter}
              required
            />
          </div>
        </div>

        {/* Declaration Section */}
        <div className="md:col-span-2 lg:col-span-4 mt-6">
          <div className="border rounded-lg p-4 bg-gray-50">
            <div className="flex items-start space-x-3">
              <input
                type="checkbox"
                id="declaration"
                checked={declarationAccepted}
                onChange={(e) => setDeclarationAccepted(e.target.checked)}
                className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="declaration" className="text-sm text-gray-700">
                I hereby declare that the information provided in this
                application is true, complete, and correct to the best of my
                knowledge and belief. I understand that if any information is
                found to be false, my application will be rejected.
              </label>
            </div>
            {errors.declaration && (
              <p className="text-red-500 text-sm mt-2">{errors.declaration}</p>
            )}
          </div>
        </div>
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={submitLoading}
        className={`w-full mt-8 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
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
        {submitLoading ? "Submitting..." : "Submit Loan Application"}
      </button>
    </form>
  );
};

export default LoanForm;
