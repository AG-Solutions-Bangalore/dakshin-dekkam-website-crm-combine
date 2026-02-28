import { BOOKING_FORM_LIST } from "@/api";
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
import { decryptId } from "@/crm/utils/encyrption/Encyrption";
import { useApiMutation } from "@/hooks/useApiMutation";

const useFetchBookingRoom = (id) => {
  return useGetApiMutation({
    url: `${BOOKING_FORM_LIST}/${id}`,
    queryKey: ["bookingRoomById"],
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

const BookingRoomEdit = () => {
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
    guest_email: "",
    guest_full_name: "",
    guest_native: "",
    guest_present_address: "",
    guest_mobile_number: "",
    guest_city: "",
    guest_no_people: "",
    guest_purpose_visit: "",
    guest_checkIn_date: "",
    guest_checkIn_time: "",
    guest_checkOut_date: "",
    guest_checkOut_time: "",
    guest_note: "",
    guest_status: "",
  });

  const { trigger: submitTrigger, loading: submitLoading } = useApiMutation();
  const { data: bookingRoomById, loading: isFetching } =
    useFetchBookingRoom(decryptedId);

  useEffect(() => {
    if (decryptedId && bookingRoomById?.data) {
      const raw = bookingRoomById.data;
      setFormData({
        guest_name: raw?.guest_name || "",
        guest_email: raw?.guest_email || "",
        guest_full_name: raw?.guest_full_name || "",
        guest_native: raw?.guest_native || "",
        guest_present_address: raw?.guest_present_address || "",
        guest_mobile_number: raw?.guest_mobile_number || "",
        guest_city: raw?.guest_city || "",
        guest_no_people: raw?.guest_no_people || "",
        guest_purpose_visit: raw?.guest_purpose_visit || "",
        guest_checkIn_date: raw?.guest_checkIn_date || "",
        guest_checkIn_time: raw?.guest_checkIn_time || "",
        guest_checkOut_date: raw?.guest_checkOut_date || "",
        guest_checkOut_time: raw?.guest_checkOut_time || "",
        guest_note: raw?.guest_note || "",
        guest_status: raw?.guest_status || "",
      });
    }
  }, [decryptedId, bookingRoomById]);

  const handleInputChange = (e, field) => {
    const value = e.target ? e.target.value : e;
    let updatedFormData = { ...formData, [field]: value };

    setFormData(updatedFormData);
  };

  useEffect(() => {
    const calculateProgress = () => {
      let formCopy = { ...formData };

      // Remove optional fields from progress calculation
      delete formCopy.guest_note;

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
    if (!formData.guest_name) missingFields.push("Guest Name");
    if (!formData.guest_email) missingFields.push("Email");
    if (!formData.guest_full_name) missingFields.push("Full Name");
    if (!formData.guest_native) missingFields.push("Native Place");
    if (!formData.guest_present_address) missingFields.push("Present Address");
    if (!formData.guest_mobile_number) missingFields.push("Mobile Number");
    if (!formData.guest_city) missingFields.push("City");
    if (!formData.guest_no_people) missingFields.push("Number of People");
    if (!formData.guest_purpose_visit) missingFields.push("Purpose of Visit");
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
        url: `${BOOKING_FORM_LIST}/${decryptedId}`,
        method: "put",
        data: formData,
      });

      if (response?.code === 201) {
        toast({
          title: "Success",
          description: response.message || "Room booking updated successfully",
          variant: "success",
        });
        navigate("/crm/booking-form");
      } else {
        toast({
          title: "Error",
          description: response.message || "Failed to update room booking",
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          error?.response?.data?.message || "Failed to update room booking",
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
              title="Update Room Booking"
              subtitle="room booking"
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
                      Full Name of the Guest
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_name}
                      onChange={(e) => handleInputChange(e, "guest_name")}
                      maxLength={100}
                      placeholder="Enter Full Name of the Guest"
                    />
                  </div>

                  {/* Guest Email */}
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

                  {/* Full Name */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Full Name of the person
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_full_name}
                      onChange={(e) => handleInputChange(e, "guest_full_name")}
                      maxLength={100}
                      placeholder="Enter full name"
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

                  {/* Native Place */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Native in Kutch<span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_native}
                      onChange={(e) => handleInputChange(e, "guest_native")}
                      maxLength={100}
                      placeholder="Enter Native in Kutch"
                    />
                  </div>

                  {/* City */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      City you are coming from
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_city}
                      onChange={(e) => handleInputChange(e, "guest_city")}
                      maxLength={100}
                      placeholder="Enter City"
                    />
                  </div>

                  {/* Number of People */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Total number of Guests
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      type="number"
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_no_people}
                      onChange={(e) => handleInputChange(e, "guest_no_people")}
                      min="1"
                      placeholder="Enter Total number of Guests"
                    />
                  </div>

                  {/* Purpose of Visit */}
                  <div>
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Purpose of the visit
                      <span className="text-red-500">*</span>
                    </label>
                    <Input
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_purpose_visit}
                      onChange={(e) =>
                        handleInputChange(e, "guest_purpose_visit")
                      }
                      maxLength={100}
                      placeholder="Enter Purpose of the visit"
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

                  {/* Present Address - Full width */}
                  <div className="md:col-span-2">
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Permanent Address of the Guest
                      <span className="text-red-500">*</span>
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_present_address}
                      onChange={(e) =>
                        handleInputChange(e, "guest_present_address")
                      }
                      maxLength={500}
                      placeholder="Enter Permanent Address of the Guest"
                      rows={3}
                    />
                  </div>

                  {/* Guest Note - Full width */}
                  <div className="md:col-span-2">
                    <label
                      className={`block ${ButtonConfig.cardLabel} text-sm mb-2 font-medium`}
                    >
                      Comments or any specific request
                    </label>
                    <Textarea
                      className="bg-white border border-gray-300 rounded-lg w-full focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      value={formData.guest_note}
                      onChange={(e) => handleInputChange(e, "guest_note")}
                      maxLength={1000}
                      placeholder="Enter any additional notes"
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

export default BookingRoomEdit;
