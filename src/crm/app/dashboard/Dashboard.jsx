import { DASHBOARD } from "@/api";
import Page from "@/crm/app/page/page";
import {
  ErrorComponent,
  LoaderComponent,
} from "@/crm/components/LoaderComponent/LoaderComponent";
import { Card, CardContent } from "@/crm/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/crm/components/ui/select";
import { useGetApiMutation } from "@/hooks/useGetApiMutation";
import { Settings2, Users } from "lucide-react";
import moment from "moment";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import EventChart from "./EventChart";
import { encryptId } from "@/crm/utils/encyrption/Encyrption";
const colors = [
  "bg-blue-600",
  "bg-green-600",
  "bg-purple-600",
  "bg-pink-600",
  "bg-orange-600",
  "bg-indigo-600",
];

const Dashboard = () => {
  const {
    data: dashboard,
    isLoading,
    isError,
    refetch,
  } = useGetApiMutation({
    url: DASHBOARD,
    queryKey: ["dashboard"],
  });
  const userType = useSelector((state) => state.auth.user_type);
  const [formData, setFormData] = useState({
    branch_id: "",
  });

  const authBranchId = useSelector((state) => state.auth.branch_id);
  const authUserId = useSelector((state) => state.auth?.id);
  const navigate = useNavigate();

  useEffect(() => {
    if (userType == 1 && authUserId) {
      navigate(
        `/crm/member-form/${encodeURIComponent(encryptId(authUserId))}`
      );
    }
  }, [userType, authUserId, navigate]);

  const branchOptions = useMemo(() => {
    if (!dashboard?.branch) return [{ value: 0, label: "All Branches" }];

    return [
      { value: 0, label: "All Branches" },
      ...dashboard.branch.map((b) => ({
        value: b.id,
        label: b.branch_name || `Branch ${b.id}`,
      })),
    ];
  }, [dashboard]);

  useEffect(() => {
    if (branchOptions.length > 0) {
      const defaultBranch =
        branchOptions.find((b) => b.value === authBranchId) || branchOptions[0];
      setFormData((prev) => ({ ...prev, branch_id: defaultBranch.value }));
    }
  }, [branchOptions, authBranchId]);

  const handleInputChange = (value, field) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  if (isLoading) {
    return <LoaderComponent name="Dashboard Data" />;
  }

  if (isError) {
    return (
      <ErrorComponent
        message="Error Fetching Dashboard Data"
        refetch={refetch}
      />
    );
  }

  const stats = [
    {
      label: "Active Events",
      value: dashboard?.totalActiveEvent || 0,
      icon: <Settings2 className="h-6 w-6 text-blue-600" />,
      color: "from-blue-100 to-blue-200",
    },
    {
      label: "Active Members",
      value: dashboard?.totalActiveMember || 0,
      icon: <Users className="h-6 w-6 text-green-600" />,
      color: "from-green-100 to-green-200",
    },
  ];

  const eventImageBase =
    dashboard?.image_url?.find((i) => i.image_for === "Event")?.image_url || "";

  const filteredEvents =
    formData.branch_id && formData.branch_id !== 0
      ? dashboard.upcomingEvent.filter(
          (event) => event.branch_id === formData.branch_id,
        )
      : dashboard.upcomingEvent;

  return (
    <Page>
      <div className="space-y-6">
        {/* Header */}
        <div>
          <h2 className="text-2xl font-bold">Dashboard</h2>
          <p className="text-muted-foreground">Overview of your events</p>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* LEFT SIDE */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {stats.map((item, idx) => (
                <Card
                  key={idx}
                  className="rounded-xl border border-gray-200 shadow-md hover:shadow-lg transition"
                >
                  <CardContent className="p-6 flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">
                        {item.label}
                      </p>
                      <p className="text-3xl font-bold text-gray-900">
                        {item.value}
                      </p>
                    </div>
                    <div
                      className={`p-4 rounded-full bg-gradient-to-br ${item.color} shadow-sm`}
                    >
                      {item.icon}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Chart Placeholder */}
            {userType === 3 && (
              <Card className="h-64 flex items-center justify-center">
                <EventChart />
              </Card>
            )}
          </div>

          {/* RIGHT SIDE */}
          <div className="space-y-4  py-2 px-1">
            <div className="flex justify-between">
              <h3 className="text-md font-semibold">Upcoming Events</h3>
              {userType === 3 && filteredEvents?.length > 0 && (
                <div className="mb-4">
                  <Select
                    value={String(formData.branch_id)}
                    onValueChange={(value) =>
                      handleInputChange(Number(value), "branch_id")
                    }
                  >
                    <SelectTrigger className="w-full md:w-48 h-9 text-sm border rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500">
                      <SelectValue placeholder="Select Branch" />
                    </SelectTrigger>
                    <SelectContent>
                      {branchOptions.map((option) => (
                        <SelectItem
                          key={option.value}
                          value={String(option.value)}
                        >
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            </div>

            <div className="space-y-4 overflow-y-auto max-h-screen">
              {filteredEvents?.length > 0 ? (
                filteredEvents.map((event, index) => {
                  const eventDate = moment(event.event_from_date);
                  const day = eventDate.format("DD");
                  const month = eventDate.format("MMM");
                  const badgeColor = colors[index % colors.length];
                  return (
                    <Card
                      key={event.id}
                      className="overflow-hidden shadow-md hover:shadow-lg transition "
                    >
                      <div className="flex">
                        {/* Event Image */}
                        <div className="relative w-32 h-28 shrink-0">
                          <img
                            src={`${eventImageBase}${event.event_image}`}
                            alt={event.event_name}
                            className="object-cover w-full h-full"
                          />
                          {/* Date Badge */}
                          <div
                            className={`absolute top-2 left-2 ${badgeColor} text-white rounded-md px-2 py-1 text-center`}
                          >
                            <span className="block text-sm font-bold leading-tight">
                              {day}
                            </span>
                            <span className="block text-[10px] uppercase">
                              {month}
                            </span>
                          </div>
                        </div>

                        {/* Event Info */}
                        <CardContent className="p-4 flex flex-col justify-center">
                          <p className="font-semibold text-gray-800 text-sm">
                            {event.event_name}
                          </p>
                          <p className="text-sm text-muted-foreground line-clamp-2">
                            {event.event_description}
                          </p>
                          <span
                            className="mt-2 inline-block text-xs font-medium text-blue-600 cursor-pointer"
                            onClick={() => navigate("/crm/event")}
                          >
                            View Details →
                          </span>
                        </CardContent>
                      </div>
                    </Card>
                  );
                })
              ) : (
                <p className="text-sm text-gray-500">No upcoming events</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
};

export default Dashboard;
