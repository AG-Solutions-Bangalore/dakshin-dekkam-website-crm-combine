import {
  Book,
  Briefcase,
  Calendar,
  Droplet,
  GitBranch,
  Group,
  Heart,
  Home,
  Loader,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { useRef, useState } from "react";
import { showErrorToast, showSuccessToast } from "../../utils/toast";
import SelectField from "../common/SelectField";
import InputField from "../common/InputField";
import { useApiMutation } from "@/hooks/useApiMutation";
import {
  useFetchBloodGroup,
  useFetchBranch,
  useFetchOccupation,
} from "@/hooks/useApi";
import { MarriedStatus } from "@/website/constants/selectOptions";
import { CREATE_MEMBER } from "@/api";
import { associateMahajan } from "@/website/data/associatemahajan";

const CommunityForm = () => {
  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_dob: "",
    user_blood_group: "",
    mobile: "",
    user_whatsapp: "",
    email: "",
    user_occupation: "",
    branch_id: "",
    user_education: "",
    resi_address: "",
    place_of_residence: "",
    native_place: "",
    user_doa: "",
    user_married_status: "",
    user_group_mid: "",
  });
  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();

  const [errors, setErrors] = useState({});
  const { data: blodGroupdata } = useFetchBloodGroup();
  const { data: branchdata } = useFetchBranch();

  const { data: occupationdata } = useFetchOccupation();
  const fieldRefs = {
    first_name: useRef(null),
    email: useRef(null),
    mobile: useRef(null),
    resi_address: useRef(null),
    user_occupation: useRef(null),
    branch_id: useRef(null),
    user_blood_group: useRef(null),
  };
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name == "mobile" || name == "user_whatsapp") {
      const numericValue = value.replace(/\D/g, ""); // remove non-digits
      if (numericValue.length <= 10) {
        setFormData({ ...formData, [name]: numericValue });
        setErrors({ ...errors, [name]: "" });
      }
      return;
    }

    // For other fields
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };
  const validate = () => {
    let newErrors = {};

    if (!formData.first_name?.trim())
      newErrors.first_name = "First name is required";

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Enter a valid email";
    }

    if (!formData.mobile) {
      newErrors.mobile = "Mobile number is required";
    } else if (!/^[0-9]{10}$/.test(formData.mobile)) {
      newErrors.mobile = "Enter a valid 10-digit number";
    }

    if (!formData.resi_address?.trim())
      newErrors.resi_address = "Address is required";

    if (!formData.user_occupation?.trim())
      newErrors.user_occupation = "Occupation is required";

    if (!formData.branch_id) newErrors.branch_id = "Branch is required";

    if (!formData.user_blood_group)
      newErrors.user_blood_group = "Blood group is required";

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
      const response = await submitTrigger({
        url: CREATE_MEMBER,
        method: "post",
        data: formData,
      });

      if (response?.code === 201) {
        showSuccessToast(response.message || "Member created successfully!");

        setFormData({
          first_name: "",
          middle_name: "",
          last_name: "",
          user_dob: "",
          user_blood_group: "",
          mobile: "",
          user_whatsapp: "",
          email: "",
          user_occupation: "",
          branch_id: "",
          user_education: "",
          resi_address: "",
          place_of_residence: "",
          native_place: "",
          user_doa: "",
          user_married_status: "",
          user_group_mid: "",
        });
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
      className="max-w-6xl mx-auto bg-white my-6 px-6"
    >
      <h2 className="text-xl font-semibold mb-4 text-gray-800">
        Community Registration Form
      </h2>
      {/* <ToastDemo /> */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <InputField
          ref={fieldRefs.first_name}
          label="First Name"
          name="first_name"
          value={formData.first_name}
          onChange={handleChange}
          placeholder="Enter first name"
          startIcon={<User size={18} />}
          error={errors.first_name}
          required
        />
        <InputField
          label="Middle Name"
          name="middle_name"
          value={formData.middle_name}
          onChange={handleChange}
          startIcon={<User size={18} />}
          placeholder="Enter middle name"
        />
        <InputField
          label="Last Name"
          name="last_name"
          value={formData.last_name}
          onChange={handleChange}
          startIcon={<User size={18} />}
          placeholder="Enter last name"
        />

        {/* DOB */}
        <InputField
          label="Date of Birth"
          type="date"
          name="user_dob"
          value={formData.user_dob}
          onChange={handleChange}
          startIcon={<Calendar size={18} />}
        />

        {/* Blood Group */}
        <SelectField
          label="Blood Group"
          name="user_blood_group"
          value={formData.user_blood_group}
          onChange={handleChange}
          options={
            blodGroupdata?.data?.map((blood) => ({
              value: blood.blood_group,
              label: blood.blood_group,
            })) || []
          }
          error={errors.user_blood_group}
          required
          ref={fieldRefs.user_blood_group}
          startIcon={<Droplet size={18} />}
        />

        {/* Contact */}
        <InputField
          label="Email"
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Enter email"
          startIcon={<Mail size={18} />}
          error={errors.email}
          required
          ref={fieldRefs.email}
        />
        <InputField
          label="Mobile"
          type="text"
          name="mobile"
          value={formData.mobile}
          onChange={handleChange}
          placeholder="Enter 10-digit number"
          startIcon={<Phone size={18} />}
          error={errors.mobile}
          required
          ref={fieldRefs.mobile}
        />
        <InputField
          label="WhatsApp"
          type="text"
          name="user_whatsapp"
          value={formData.user_whatsapp}
          onChange={handleChange}
          placeholder="Enter WhatsApp number"
          startIcon={<MessageCircle size={18} />}
        />

        {/* Address */}

        {/* <InputField
          label="Place of Residence"
          name="place_of_residence"
          value={formData.place_of_residence}
          onChange={handleChange}
          placeholder="Enter place of residence"
          startIcon={<Home size={18} />}
        /> */}
        <SelectField
          label="Place of Residence"
          name="place_of_residence"
          value={formData.place_of_residence}
          onChange={handleChange}
          options={
            associateMahajan?.map((occupation) => ({
              value: occupation.value,
              label: occupation.label,
            })) || []
          }
          startIcon={<Home size={18} />}
        />
        {/*  */}
        <InputField
          label="Native Placein Kutch"
          name="native_place"
          value={formData.native_place}
          onChange={handleChange}
          placeholder="Enter native place"
          startIcon={<MapPin size={18} />}
        />

        {/* Education & Occupation */}
        <InputField
          label="Education"
          name="user_education"
          value={formData.user_education}
          onChange={handleChange}
          placeholder="Enter education"
          startIcon={<Book size={18} />}
        />
        <SelectField
          label="Occupation"
          name="user_occupation"
          value={formData.user_occupation}
          onChange={handleChange}
          options={
            occupationdata?.data?.map((occupation) => ({
              value: occupation.occupation,
              label: occupation.occupation,
            })) || []
          }
          error={errors.user_occupation}
          required
          ref={fieldRefs.user_occupation}
          startIcon={<Briefcase size={18} />}
        />
        <SelectField
          label="Branch"
          name="branch_id"
          value={formData.branch_id}
          onChange={handleChange}
          options={
            branchdata?.data?.map((branchdata) => ({
              value: String(branchdata.id),
              label: branchdata.branch_name,
            })) || []
          }
          error={errors.branch_id}
          required
          ref={fieldRefs.branch_id}
          startIcon={<GitBranch size={18} />}
        />

        <SelectField
          label="Marital Status"
          name="user_married_status"
          value={formData.user_married_status}
          onChange={handleChange}
          options={MarriedStatus}
          error={errors.user_married_status}
          startIcon={<Heart size={18} />}
        />

        <InputField
          label="Date of Anniversary"
          type="date"
          name="user_doa"
          value={formData.user_doa}
          onChange={handleChange}
          startIcon={<Heart size={18} />}
        />

        {/* Group ID */}
        {/* <InputField
          label="MID"
          name="user_group_mid"
          value={formData.user_group_mid}
          onChange={handleChange}
          placeholder="Enter MID"
          startIcon={<Group size={18} />}
        /> */}
        <div className="md:col-span-2">
          <InputField
            label="Residential Address"
            name="resi_address"
            type="textarea"
            value={formData.resi_address}
            onChange={handleChange}
            placeholder="Enter your address"
            error={errors.resi_address}
            required
            ref={fieldRefs.resi_address}
          />
        </div>
      </div>

      {/* <button
        type="submit"
        disabled={submitLoading}
        className={`w-full mt-3 bg-yellow-500 hover:bg-yellow-600 text-white font-medium py-2 px-4 rounded-lg transition flex items-center justify-center gap-2 ${
          submitLoading ? "cursor-not-allowed opacity-70" : ""
        }`}
      >
        {submitLoading && <Loader className="w-5 h-5 animate-spin" />}
        {submitLoading ? "Submitting..." : "Register"}
      </button> */}
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
        {submitLoading ? "Submitting..." : "Register"}
      </button>
    </form>
  );
};

export default CommunityForm;
