import { GET_STATES, MEMBER_LIST } from "@/api";
import Page from "@/crm/app/page/page";
import { MemoizedSelect } from "@/crm/components/common/MemoizedSelect";
import PageHeaders from "@/crm/components/common/PageHeaders";
import { LoaderComponent } from "@/crm/components/LoaderComponent/LoaderComponent";
import { Button } from "@/crm/components/ui/button";
import { Card, CardContent } from "@/crm/components/ui/card";
import { Input } from "@/crm/components/ui/input";
import { Textarea } from "@/crm/components/ui/textarea";
import { ButtonConfig } from "@/crm/config/ButtonConfig";
import { useToast } from "@/hooks/use-toast";
import {
  useFetchBloodGroup,
  useFetchBranch,
  useFetchCity,
  useFetchNative,
  useFetchOccupation,
  useFetchState,
} from "@/hooks/useApi";
import {
  Book,
  Briefcase,
  Calendar,
  CheckCircle2,
  GitBranch,
  Heart,
  Home,
  Loader,
  Loader2,
  Locate,
  LogOut,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  User,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { decryptId } from "@/crm/utils/encyrption/Encyrption";
import { useApiMutation } from "@/hooks/useApiMutation";
import useLogout from "@/hooks/useLogout";
import InputField from "@/website/components/common/InputField";
import SelectField from "@/website/components/common/SelectField";
import generateYearOptions from "@/website/utils/generateYearOptions";
const useFetchMaterial = (id) => {
  return useGetApiMutation({
    url: `${MEMBER_LIST}/${id}`,
    queryKey: ["materialbyid", id],
    options: {
      enabled: !!id,
    },
  });
};
const MarriedStatus = [
  {
    value: "Married",
    label: "Married",
  },
  {
    value: "Unmarried",
    label: "Unmarried",
  },
];
const status = [
  {
    value: "Active",
    label: "Active",
  },
  {
    value: "Inactive",
    label: "Inactive",
  },
];
const MemberForm = () => {
  const authUserId = useSelector((state) => state.auth?.id);
  const userType = useSelector((state) => state.auth?.user_type);
  const handleLogout = useLogout();

  const { id } = useParams();
  let decryptedId = null;
  const isEdit = Boolean(id);

  if (isEdit) {
    try {
      const rawId = decodeURIComponent(id);
      decryptedId = decryptId(rawId);
    } catch (err) {
      console.error("Failed to decrypt ID:", err.message);
    }
  }

  const targetMemberId = userType == 1 && !decryptedId ? authUserId : decryptedId;
  const isEditMode = Boolean(targetMemberId);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [imagePreview, setImagePreview] = useState("");
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const fileInputRef = useRef(null);
  const yearOptions = generateYearOptions(1950);

  const [formData, setFormData] = useState({
    first_name: "",
    middle_name: "",
    last_name: "",
    user_dob: "",
    user_city: "",
    user_age: "",
    mobile: "",
    user_whatsapp: "",
    email: "",
    user_occupation: "",
    user_education: "",
    resi_address: "",
    branch_id: "",
    native_place: "",
    user_doa: "",
    user_married_status: "",
    user_group_mid: "",
    user_status: isEditMode ? "" : "Active",
    user_state: "",
    user_pincode: "",
    user_image: null,
  });
  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: materialByid, loading: isFetching, refetch } =
    useFetchMaterial(targetMemberId);
  useEffect(() => {
    if (targetMemberId && materialByid?.data) {
      const raw = materialByid.data;
      const birthYear = Number(raw?.user_dob);
      const currentYear = new Date().getFullYear();
      const calculatedAge =
        birthYear && birthYear <= currentYear
          ? String(currentYear - birthYear)
          : raw?.user_age || "";

      const rawImage =
        raw?.user_image ||
        raw?.image ||
        raw?.profile_image ||
        raw?.photo ||
        raw?.member_image;

      if (rawImage) {
        let imageBase = "";
        if (Array.isArray(materialByid?.image_url)) {
          const matched = materialByid.image_url.find((img) =>
            /member|community|user|profile/i.test(img.image_for || "")
          );
          const fallbackImg = materialByid.image_url.find(
            (img) => img.image_for && img.image_for !== "No Image"
          );
          imageBase =
            matched?.image_url ||
            fallbackImg?.image_url ||
            materialByid.image_url[0]?.image_url ||
            "";
        } else if (typeof materialByid?.image_url === "string") {
          imageBase = materialByid.image_url;
        }

        if (!imageBase) {
          const apiBase = import.meta.env.VITE_API_BASE_URL || "";
          imageBase = apiBase.replace(/\/api\/?$/, "");
        }

        let previewUrl = rawImage;
        if (
          typeof rawImage === "string" &&
          (rawImage.startsWith("http://") ||
            rawImage.startsWith("https://") ||
            rawImage.startsWith("blob:") ||
            rawImage.startsWith("data:"))
        ) {
          previewUrl = rawImage;
        } else if (typeof rawImage === "string") {
          const cleanBase = imageBase.replace(/\/+$/, "");
          const cleanPath = rawImage.replace(/^\/+/, "");
          previewUrl = `${cleanBase}/${cleanPath}`;
        }
        setImagePreview(previewUrl);
      }

      setFormData({
        first_name: raw?.first_name || "",
        middle_name: raw?.middle_name || "",
        last_name: raw?.last_name || "",
        user_dob: raw?.user_dob || "",
        user_city: raw?.user_city || raw?.city || raw?.city_name || "",
        user_age: calculatedAge,
        mobile: raw?.mobile || "",
        user_whatsapp: raw?.user_whatsapp || "",
        email: raw?.email || "",
        user_occupation: raw?.user_occupation || "",
        user_education: raw?.user_education || "",
        resi_address: raw?.resi_address || "",
        branch_id: raw?.branch_id ? String(raw.branch_id) : "",
        native_place: raw?.native_place || "",
        user_doa: raw?.user_doa || "",
        user_married_status: raw?.user_married_status || "",
        user_state: raw?.user_state || raw?.state || raw?.state_name || "",
        user_pincode: raw?.user_pincode || raw?.pincode || raw?.pin || raw?.pin_code || "",
        user_group_mid: raw?.user_group_mid || "",
        user_status: raw?.user_status || "Active",
        user_image: rawImage || null,
      });
    }
  }, [targetMemberId, materialByid]);

  const { data: branchdata } = useFetchBranch();
  const { data: blodGroupdata, isLoading: loadingbloodgroup } =
    useFetchBloodGroup();
  const { data: citydata, isLoading: loadingcity } = useFetchCity();
  const { data: statedata, isLoading: loadingstate } = useFetchState();
  const { data: nativedata, isLoading: loadingnative } = useFetchNative();
  const { data: occupationdata, isLoading: loadingoccupation } =
    useFetchOccupation();

  const handleInputChange = (e, fieldName) => {
    if (e?.target?.type === "file") {
      const field = fieldName || e?.target?.name || "user_image";
      const file = e?.target?.files?.[0] || null;
      setFormData((prev) => ({ ...prev, [field]: file }));
      if (file) {
        setImagePreview(URL.createObjectURL(file));
      }
      return;
    }

    const field = fieldName || e?.target?.name;
    let value = e?.target ? e.target.value : e;
    if (
      ["user_age", "mobile", "user_whatsapp", "user_pincode"].includes(field)
    ) {
      value = typeof value === "string" ? value.replace(/\D/g, "") : value;
    }

    let updatedFormData = { ...formData, [field]: value };

    if (field === "user_dob") {
      const birthYear = Number(value);
      const currentYear = new Date().getFullYear();
      if (birthYear && birthYear <= currentYear) {
        updatedFormData.user_age = String(currentYear - birthYear);
      } else {
        updatedFormData.user_age = "";
      }
    }

    setFormData(updatedFormData);
  };
  useEffect(() => {
    const calculateProgress = () => {
      let formCopy = { ...formData };

      if (isEditMode) {
        delete formCopy.user_group_mid;
      }

      const totalFormFields = Object.keys(formCopy).length;

      const filledFormFields = Object.values(formCopy).filter((value) => {
        if (value === null || value === undefined) return false;
        return value.toString().trim() !== "";
      }).length;

      const totalFields = totalFormFields;
      const filledFields = filledFormFields;

      const percentage =
        totalFields === 0 ? 0 : Math.round((filledFields / totalFields) * 100);

      setProgress(percentage);
    };

    calculateProgress();
  }, [formData, isEditMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];
    if (!formData.first_name) missingFields.push("First Name");
    if (!formData.middle_name) missingFields.push("Middle Name");
    if (!formData.last_name) missingFields.push("Last Name");
    if (!formData.user_dob) missingFields.push("Born Year");
    if (!formData.user_age) missingFields.push("Age");
    if (!formData.mobile) missingFields.push("Mobile");
    if (!formData.email?.trim()) missingFields.push("Email");
    if (!formData.user_occupation) missingFields.push("Occupation");
    if (!formData.resi_address) missingFields.push("Address");
    if (userType != 1 && !formData.user_group_mid && !isEditMode)
      missingFields.push("Group MID");
    if (userType != 1 && !formData.user_status && isEditMode)
      missingFields.push("Status is Required");
    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <div>
            <p>Please fill in the following fields:</p>
            <ul className="list-disc pl-5">
              {missingFields.map((field, i) => (
                <li key={i}>{field}</li>
              ))}
            </ul>
          </div>
        ),
        variant: "destructive",
      });
      return;
    }

    try {
      const targetId = isEditMode ? (targetMemberId || decryptedId) : null;
      const isFile = formData.user_image instanceof File;

      let payload;
      let method = isEditMode ? "put" : "post";
      let url = isEditMode ? `${MEMBER_LIST}/${targetId}` : MEMBER_LIST;

      if (isFile) {
        payload = new FormData();
        Object.entries(formData).forEach(([key, value]) => {
          if (value === null || value === undefined || value === "") return;
          if (key === "user_image" && value instanceof File) {
            payload.append("user_image", value);
          } else if (key !== "user_image") {
            payload.append(key, value);
          }
        });
        if (isEditMode) {
          payload.append("_method", "PUT");
          url = `${MEMBER_LIST}/${targetId}?_method=PUT`;
          method = "post";
        }
      } else {
        payload = { ...formData };
        if (typeof payload.user_image === "string" || !payload.user_image) {
          delete payload.user_image;
        }
      }

      const response = await submitTrigger({
        url,
        method,
        data: payload,
        headers: isFile ? { "Content-Type": "multipart/form-data" } : {},
      });
      if (response?.code == 200 || response?.code == 201) {
        toast({
          title: "Success",
          description: response.message || "Member details updated successfully",
        });
        if (userType == 1) {
          if (refetch) await refetch();
          setShowUpdateSuccessModal(true);
        } else {
          navigate("/crm/member");
        }
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update member",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to save member details",
        variant: "destructive",
      });
    }
  };

  if (
    isFetching ||
    loadingbloodgroup ||
    loadingoccupation ||
    loadingcity ||
    loadingstate ||
    loadingnative
  ) {
    return <LoaderComponent />;
  }

  if (userType == 1) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col">
        {/* Header with Dakshin Ekkam brand */}
        <header className="bg-white border-b border-gray-200 py-3.5 px-6 sm:px-12 flex items-center justify-between shadow-xs sticky top-0 z-40">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-gray-800">Dakshin Ekkam</h1>
            <span className="text-xs bg-red-100 text-[#db2920] font-semibold px-2.5 py-0.5 rounded-full">
              Member Profile
            </span>
          </div>
        </header>

        {/* Member Update Form matching Website Signup UI */}
        <main className="flex-1 py-8 px-4 sm:px-6 lg:px-8">
          <form
            onSubmit={handleSubmit}
            className="max-w-6xl mx-auto bg-white rounded-2xl shadow-sm border border-gray-100 p-6 sm:p-10"
          >
            <h2 className="text-4xl font-bold mb-6 text-gray-800 border-b pb-4 flex items-center justify-center">
              Update Your Profile
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <InputField
                label="First Name"
                name="first_name"
                value={formData.first_name}
                onChange={handleInputChange}
                placeholder="Enter first name"
                startIcon={<User size={18} />}
                required
              />
              <InputField
                label="Middle Name"
                name="middle_name"
                value={formData.middle_name}
                onChange={handleInputChange}
                startIcon={<User size={18} />}
                placeholder="Enter middle name"
                required
              />
              <InputField
                label="Last Name"
                name="last_name"
                value={formData.last_name}
                onChange={handleInputChange}
                startIcon={<User size={18} />}
                placeholder="Enter last name"
                required
              />
              <SelectField
                label="Born Year"
                name="user_dob"
                value={formData.user_dob}
                onChange={handleInputChange}
                options={yearOptions}
                placeholder="Select Born Year"
                required
              />
              <InputField
                label="Age"
                name="user_age"
                value={formData.user_age}
                disabled
                readOnly
                placeholder="Auto-calculated from Born Year"
                startIcon={<Calendar size={18} />}
                required
                maxLength={3}
              />
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Enter email"
                startIcon={<Mail size={18} />}
                required
              />
              <InputField
                label="Mobile"
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
                placeholder="Enter 10-digit number"
                startIcon={<Phone size={18} />}
                required
                maxLength={10}
              />
              <InputField
                label="WhatsApp"
                type="text"
                name="user_whatsapp"
                value={formData.user_whatsapp}
                onChange={handleInputChange}
                placeholder="Enter WhatsApp number"
                startIcon={<MessageCircle size={18} />}
                maxLength={10}
              />
              <InputField
                label="Education"
                name="user_education"
                value={formData.user_education}
                onChange={handleInputChange}
                placeholder="Enter education"
                startIcon={<Book size={18} />}
              />
              <SelectField
                label="Occupation"
                name="user_occupation"
                value={formData.user_occupation}
                onChange={handleInputChange}
                options={
                  occupationdata?.data?.map((occupation) => ({
                    value: occupation.occupation,
                    label: occupation.occupation,
                  })) || []
                }
                required
                startIcon={<Briefcase size={18} />}
              />
              <SelectField
                label="Marital Status"
                name="user_married_status"
                value={formData.user_married_status}
                onChange={handleInputChange}
                options={MarriedStatus}
                startIcon={<Heart size={18} />}
              />
              <InputField
                label="Date of Anniversary"
                type="date"
                name="user_doa"
                value={formData.user_doa}
                onChange={handleInputChange}
                startIcon={<Heart size={18} />}
              />
              <SelectField
                label="Native Place in Kutch"
                name="native_place"
                value={formData.native_place}
                onChange={handleInputChange}
                options={
                  nativedata?.data?.map((native_place) => ({
                    value: native_place.native_place,
                    label: native_place.native_place,
                  })) || []
                }
                startIcon={<MapPin size={18} />}
              />
              <SelectField
                label="Branch"
                name="branch_id"
                value={formData.branch_id}
                onChange={handleInputChange}
                options={
                  branchdata?.data?.map((branchdata) => ({
                    value: String(branchdata.id),
                    label: branchdata.branch_name,
                  })) || []
                }
                startIcon={<GitBranch size={18} />}
              />

              {/* Address, City, State, Pin all together in two rows */}
              <div className="md:col-span-2 lg:col-span-3">
                <InputField
                  label="Address"
                  name="resi_address"
                  type="textarea"
                  value={formData.resi_address}
                  onChange={handleInputChange}
                  placeholder="Enter full address"
                  startIcon={<Home size={18} />}
                  required
                />
              </div>
              {/* <SelectField
                label="City"
                name="user_city"
                value={formData.user_city}
                onChange={handleInputChange}
                options={
                  citydata?.data?.map((city) => ({
                    value: city.city,
                    label: city.city,
                  })) || []
                }
                startIcon={<MapPin size={18} />}
              /> */}
              {/* <SelectField
                label="State"
                name="user_state"
                value={formData.user_state}
                onChange={handleInputChange}
                options={
                  statedata?.data?.map((state) => ({
                    value: state.state_name,
                    label: state.state_name,
                  })) || []
                }
                startIcon={<Home size={18} />}
              /> */}
              {/* <InputField
                label="Pincode"
                name="user_pincode"
                value={formData.user_pincode}
                onChange={handleInputChange}
                startIcon={<Locate size={18} />}
                maxLength={6}
              /> */}

              {/* Photo Upload & Preview */}
              <div className="md:col-span-2 lg:col-span-3">
                <div className="max-w-md">
                  <InputField
                    ref={fileInputRef}
                    label="Photo"
                    type="file"
                    name="user_image"
                    onChange={handleInputChange}
                    startIcon={<User size={18} />}
                    accept="image/*"
                  />
                  {imagePreview && (
                    <div className="mt-2 flex items-center gap-3 p-2 bg-gray-50 border border-gray-200 rounded-lg">
                      <img
                        src={imagePreview}
                        alt="Profile Preview"
                        className="w-14 h-14 object-cover rounded-md border border-gray-300"
                        onError={(e) => {
                          e.target.style.display = "none";
                        }}
                      />
                      <div className="text-xs text-gray-500">
                        <p className="font-medium text-gray-700">Member Photo</p>
                        <p>Upload a new file to change</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={submitLoading}
              className={`w-full mt-6 text-white font-medium py-3 px-4 rounded-xl transition flex items-center justify-center gap-2 text-base shadow-sm ${submitLoading ? "cursor-not-allowed opacity-70" : ""
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
              {submitLoading ? "Updating..." : "Update"}
            </button>
          </form>
        </main>

        {/* Post-update popup modal */}
        {showUpdateSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-xs">
            <div className="bg-white rounded-2xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-gray-100 text-center transform transition-all animate-in zoom-in-95">
              <div className="mx-auto w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 size={36} />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Profile Updated!
              </h3>
              <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                Your details have been successfully saved. Would you like to sign out or do you still need to update anything else?
              </p>

              <div className="flex flex-col-reverse sm:flex-row gap-3">
                <button
                  type="button"
                  onClick={() => setShowUpdateSuccessModal(false)}
                  className="flex-1 px-4 py-2.5 rounded-xl border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition text-sm cursor-pointer"
                >
                  Still Need to Update
                </button>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex-1 px-4 py-2.5 rounded-xl text-white font-medium transition text-sm shadow-sm cursor-pointer"
                  style={{ background: "#db2920" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background = "#9b1c15")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background = "#db2920")
                  }
                >
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <Page>
      <div className="p-0">
        <div className="">
          <form onSubmit={handleSubmit} className="w-full ">
            <PageHeaders
              title={isEditMode ? "Update Member" : "Create Member"}
              subtitle="member"
              progress={progress}
              mode={isEditMode ? "edit" : "create"}
            />
            <Card className={`mb-6 ${ButtonConfig.cardColor}`}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2">
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      First Name<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.first_name}
                      onChange={(e) => handleInputChange(e, "first_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Middle Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.middle_name}
                      onChange={(e) => handleInputChange(e, "middle_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.last_name}
                      onChange={(e) => handleInputChange(e, "last_name")}
                      maxLength={50}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Born Year <span className="text-red-500">*</span>
                    </label>
                    {/* <Input
                      className="bg-white"
                      value={formData.user_dob}
                      onChange={(e) => handleInputChange(e, "user_dob")}
                      type="date"
                    /> */}
                    <MemoizedSelect
                      value={formData.user_dob}
                      onChange={(e) => handleInputChange(e, "user_dob")}
                      options={yearOptions}
                      placeholder="Select Born Year"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Age <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-gray-100 cursor-not-allowed border border-gray-300 rounded-lg w-full focus:ring-0 text-gray-700"
                      value={formData.user_age}
                      disabled
                      readOnly
                      placeholder="Auto-calculated from Born Year"
                    />
                  </div>{" "}
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Email <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.email}
                      onChange={(e) => handleInputChange(e, "email")}
                      maxLength={50}
                    />
                  </div>
                  {/* <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Blood Group <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_blood_group}
                      onChange={(e) => handleInputChange(e, "user_blood_group")}
                      options={
                        blodGroupdata?.data?.map((blood) => ({
                          value: blood.blood_group,
                          label: blood.blood_group,
                        })) || []
                      }
                      placeholder="Select Blood Group"
                    />
                  </div> */}
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Mobile<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.mobile}
                      onChange={(e) => handleInputChange(e, "mobile")}
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Whatsapp
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_whatsapp}
                      onChange={(e) => handleInputChange(e, "user_whatsapp")}
                      maxLength={10}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Education
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_education}
                      onChange={(e) => handleInputChange(e, "user_education")}
                      maxLength={50}
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Occupation <span className="text-red-500">*</span>
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_occupation}
                      onChange={(e) => handleInputChange(e, "user_occupation")}
                      options={
                        occupationdata?.data?.map((occupation) => ({
                          value: occupation.occupation,
                          label: occupation.occupation,
                        })) || []
                      }
                      placeholder="Select Occupation"
                    />
                  </div>
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Marital Status
                      </label>
                    </div>

                    <MemoizedSelect
                      value={formData.user_married_status}
                      onChange={(e) =>
                        handleInputChange(e, "user_married_status")
                      }
                      options={MarriedStatus}
                      placeholder="Select  Marital Status"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Date of Anniversary
                    </label>
                    <Input
                      type="date"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.user_doa}
                      onChange={(e) => handleInputChange(e, "user_doa")}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Native Place in Kutch
                    </label>

                    <MemoizedSelect
                      value={formData.native_place}
                      onChange={(e) => handleInputChange(e, "native_place")}
                      options={
                        nativedata?.data?.map((native_place) => ({
                          value: native_place.native_place,
                          label: native_place.native_place,
                        })) || []
                      }
                      placeholder="Select Native"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Branch
                    </label>

                    <MemoizedSelect
                      value={formData.branch_id}
                      onChange={(e) => handleInputChange(e, "branch_id")}
                      options={
                        branchdata?.data?.map((branch) => ({
                          value: String(branch.id),
                          label: branch.branch_name,
                        })) || []
                      }
                      placeholder="Select Branch"
                    />
                  </div>
                  <div className="md:col-span-2 lg:col-span-3 xl:col-span-4">
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Address <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                      value={formData.resi_address}
                      onChange={(e) => handleInputChange(e, "resi_address")}
                      placeholder="Enter full address"
                      maxLength={800}
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      City
                    </label>

                    <MemoizedSelect
                      value={formData.user_city}
                      onChange={(e) => handleInputChange(e, "user_city")}
                      options={
                        citydata?.data?.map((city) => ({
                          value: city.city,
                          label: city.city,
                        })) || []
                      }
                      placeholder="Select City"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      State
                    </label>
                    <MemoizedSelect
                      value={formData.user_state}
                      onChange={(e) => handleInputChange(e, "user_state")}
                      options={
                        statedata?.data?.map((state) => ({
                          value: state.state_name,
                          label: state.state_name,
                        })) || []
                      }
                      placeholder="Select State"
                    />
                  </div>
                  <div>
                    <label
                      className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                    >
                      Pincode
                    </label>
                    <Input
                      className="bg-white"
                      value={formData.user_pincode}
                      onChange={(e) => handleInputChange(e, "user_pincode")}
                      maxLength={6}
                    />
                  </div>
                  {!isEditMode && (
                    <div>
                      <label
                        className={`block  ${ButtonConfig.cardLabel} text-sm mb-2 font-medium `}
                      >
                        Member ID<span className="text-red-500">*</span>
                      </label>
                      <Input
                        className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 "
                        value={formData.user_group_mid}
                        onChange={(e) => handleInputChange(e, "user_group_mid")}
                      />
                    </div>
                  )}
                  {isEditMode && (
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <label
                          className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                        >
                          Status <span className="text-red-500">*</span>
                        </label>
                      </div>

                      <MemoizedSelect
                        value={formData.user_status}
                        onChange={(e) => handleInputChange(e, "user_status")}
                        options={
                          status?.map((status) => ({
                            value: status.value,
                            label: status.label,
                          })) || []
                        }
                        placeholder="Select Status"
                      />
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
            <div className="flex flex-row items-center gap-2 justify-end ">
              <Button
                type="submit"
                className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center mt-2`}
                disabled={submitLoading}
                loading={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isEditMode ? "Updating..." : "Creating..."}
                  </>
                ) : isEditMode ? (
                  "Update"
                ) : (
                  "Submit"
                )}{" "}
              </Button>

              <Button
                type="button"
                onClick={() => {
                  navigate(-1);
                }}
                className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center mt-2`}
              >
                Go Back
              </Button>
            </div>
          </form>
        </div>
      </div>
    </Page>
  );
};

export default MemberForm;
