import { BOOKING_HALL_LIST } from "@/api";
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
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";

import { useApiMutation } from "@/hooks/useApiMutation";
import { decryptId } from "@/crm/utils/encyrption/Encyrption";

const useFetchBookingHall = (id) => {
  return useGetApiMutation({
    url: `${BOOKING_HALL_LIST}/${id}`,
    queryKey: ["bookingHallById"],
    options: {
      enabled: !!id,
    },
  });
};

const statusOptions = [
  {
    value: "Pending",
    label: "Pending",
  },
  {
    value: "Confirmed",
    label: "Confirmed",
  },
  {
    value: "CheckIn",
    label: "Check In",
  },
  {
    value: "CheckOut",
    label: "Check Out",
  },
  {
    value: "Cancel",
    label: "Cancel",
  },
];

const BookingHallEdit = () => {
  const { id } = useParams();
  let decryptedId = null;

  if (id) {
    try {
      const rawId = decodeURIComponent(id);
      decryptedId = decryptId(rawId);
    } catch (err) {
      console.error("Failed to decrypt ID:", err.message);
    }
  }

  const { toast } = useToast();
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);

  const [formData, setFormData] = useState({
    guest_name: "",
    company_name: "",
    guest_mobile_number: "",
    guest_landline_number: "",
    guest_address: "",
    guest_email: "",
    function_type: "",
    no_of_guest: "",
    guest_no_days: "",
    guest_checkIn_date: "",
    guest_checkIn_time: "",
    guest_checkOut_date: "",
    guest_checkOut_time: "",
    special_instructions: "",
    guest_status: "",
  });

  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: bookingHallById, loading: isFetching } =
    useFetchBookingHall(decryptedId);

  useEffect(() => {
    if (decryptedId && bookingHallById?.data) {
      const raw = bookingHallById.data;
      setFormData({
        guest_name: raw?.guest_name || "",
        company_name: raw?.company_name || "",
        guest_mobile_number: raw?.guest_mobile_number || "",
        guest_landline_number: raw?.guest_landline_number || "",
        guest_address: raw?.guest_address || "",
        guest_email: raw?.guest_email || "",
        function_type: raw?.function_type || "",
        no_of_guest: raw?.no_of_guest || "",
        guest_no_days: raw?.guest_no_days || "",
        guest_checkIn_date: raw?.guest_checkIn_date || "",
        guest_checkIn_time: raw?.guest_checkIn_time || "",
        guest_checkOut_date: raw?.guest_checkOut_date || "",
        guest_checkOut_time: raw?.guest_checkOut_time || "",
        special_instructions: raw?.special_instructions || "",
        guest_status: raw?.guest_status || "",
      });
    }
  }, [decryptedId, bookingHallById]);

  const handleInputChange = (e, field) => {
    const value = e.target ? e.target.value : e;
    let updatedFormData = { ...formData, [field]: value };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    const calculateProgress = () => {
      let formCopy = { ...formData };

      // Remove non-required fields from progress calculation
      delete formCopy.company_name;
      delete formCopy.guest_landline_number;
      delete formCopy.special_instructions;

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
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const missingFields = [];

    // Required fields validation
    if (!formData.guest_name) missingFields.push("Guest's Full Name");
    if (!formData.guest_mobile_number) missingFields.push("Mobile Number");
    if (!formData.guest_address) missingFields.push("Address");
    if (!formData.guest_email) missingFields.push("Email");
    if (!formData.function_type) missingFields.push("Function Type");
    if (!formData.no_of_guest) missingFields.push("Number of Guests");
    if (!formData.guest_no_days) missingFields.push("Number of Days");
    if (!formData.guest_checkIn_date) missingFields.push("Check-in Date");
    if (!formData.guest_checkIn_time) missingFields.push("Check-in Time");
    if (!formData.guest_checkOut_date) missingFields.push("Check-out Date");
    if (!formData.guest_checkOut_time) missingFields.push("Check-out Time");
    if (!formData.guest_status) missingFields.push("Status");

    if (missingFields.length > 0) {
      toast({
        title: "Validation Error",
        description: (
          <div>
            <p>Please fill in the following required fields:</p>
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
      const response = await submitTrigger({
        url: `${BOOKING_HALL_LIST}/${decryptedId}`,
        method: "put",
        data: formData,
      });

      if (response?.code === 201) {
        toast({
          title: "Success",
          description: response.message || "Booking updated successfully",
          variant: "success",
        });
        navigate("/crm/booking-hall");
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update booking",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to update booking",
        variant: "destructive",
      });
    }
  };

  if (isFetching) {
    return <LoaderComponent />;
  }

  return (
    <Page>
      <div className="p-0">
        <div className="">
          <form onSubmit={handleSubmit} className="w-full">
            <PageHeaders
              title="Update Hall Booking"
              subtitle="hall booking"
              progress={progress}
              mode="edit"
            />
            <Card className={`mb-6 ${ButtonConfig.cardColor}`}>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                  {/* Guest Name */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Guest's Full Name
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_name}
                      onChange={(e) => handleInputChange(e, "guest_name")}
                      maxLength={100}
                      placeholder="Enter guest name"
                    />
                  </div>

                  {/* Company Name */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Company Name
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.company_name}
                      onChange={(e) => handleInputChange(e, "company_name")}
                      maxLength={100}
                      placeholder="Enter company name"
                    />
                  </div>

                  {/* Mobile Number */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Mobile Number<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_mobile_number}
                      onChange={(e) =>
                        handleInputChange(e, "guest_mobile_number")
                      }
                      maxLength={10}
                      placeholder="Enter mobile number"
                    />
                  </div>

                  {/* Landline Number */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Landline Number
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_landline_number}
                      onChange={(e) =>
                        handleInputChange(e, "guest_landline_number")
                      }
                      maxLength={15}
                      placeholder="Enter landline number"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Email<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="email"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_email}
                      onChange={(e) => handleInputChange(e, "guest_email")}
                      maxLength={100}
                      placeholder="Enter email address"
                    />
                  </div>

                  {/* Function Type */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Function Type<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.function_type}
                      onChange={(e) => handleInputChange(e, "function_type")}
                      maxLength={100}
                      placeholder="Enter function type"
                    />
                  </div>

                  {/* Number of Guests */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Number of Guests<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.no_of_guest}
                      onChange={(e) => handleInputChange(e, "no_of_guest")}
                      min="1"
                      placeholder="Enter number of guests"
                    />
                  </div>

                  {/* Number of Days */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Number of Days<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_no_days}
                      onChange={(e) => handleInputChange(e, "guest_no_days")}
                      min="1"
                      placeholder="Enter number of days"
                    />
                  </div>

                  {/* Check-in Date */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Check-in Date<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_checkIn_date}
                      onChange={(e) =>
                        handleInputChange(e, "guest_checkIn_date")
                      }
                    />
                  </div>

                  {/* Check-in Time */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Check-in Time<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_checkIn_time}
                      onChange={(e) =>
                        handleInputChange(e, "guest_checkIn_time")
                      }
                    />
                  </div>

                  {/* Check-out Date */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Check-out Date<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="date"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_checkOut_date}
                      onChange={(e) =>
                        handleInputChange(e, "guest_checkOut_date")
                      }
                    />
                  </div>

                  {/* Check-out Time */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Check-out Time<span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="time"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_checkOut_time}
                      onChange={(e) =>
                        handleInputChange(e, "guest_checkOut_time")
                      }
                    />
                  </div>

                  {/* Status Dropdown */}
                  <div className="mb-4">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className={`text-sm font-medium ${ButtonConfig.cardLabel}`}
                      >
                        Status <span className="text-red-500">*</span>
                      </label>
                    </div>
                    <MemoizedSelect
                      value={formData.guest_status}
                      onChange={(e) => handleInputChange(e, "guest_status")}
                      options={statusOptions}
                      placeholder="Select Status"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Address
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_address}
                      onChange={(e) => handleInputChange(e, "guest_address")}
                      maxLength={500}
                      placeholder="Enter complete address"
                      rows={3}
                    />
                  </div>

                  {/* Special Instructions - Full width */}
                  <div className="md:col-span-2">
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Special Instructions
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.special_instructions}
                      onChange={(e) =>
                        handleInputChange(e, "special_instructions")
                      }
                      maxLength={1000}
                      placeholder="Enter any special instructions or requirements"
                      rows={3}
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-row items-center gap-2 justify-end">
              <Button
                type="submit"
                className={`${ButtonConfig.backgroundColor} ${ButtonConfig.hoverBackgroundColor} ${ButtonConfig.textColor} flex items-center mt-2`}
                disabled={submitLoading}
              >
                {submitLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Updating...
                  </>
                ) : (
                  "Update"
                )}
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

export default BookingHallEdit;
