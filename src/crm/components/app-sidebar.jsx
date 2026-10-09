import {
  AudioWaveform,
  ChartColumnDecreasing,
  Command,
  Factory,
  House,
  Settings2,
  Users,
} from "lucide-react";

import { NavMain } from "@/crm/components/nav-main";
import { NavUser } from "@/crm/components/nav-user";
import { TeamSwitcher } from "@/crm/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/crm/components/ui/sidebar";
import { useSelector } from "react-redux";
import Logo from "./common/Logo";
import { encryptId } from "@/crm/utils/encyrption/Encyrption";

export function AppSidebar({ ...props }) {
  const nameL = useSelector((state) => state.auth.name);
  const emailL = useSelector((state) => state.auth.email);
  const authUserId = useSelector((state) => state.auth?.id);
  const userType = useSelector((state) => state.auth?.user_type);

  const initialData = {
    user: {
      name: `${nameL}`,
      email: `${emailL}`,
      avatar: "/avatars/shadcn.jpg",
    },
    teams: [
      {
        name: "Dakshin Ekkam",
        logo: Logo,
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Dashboard",
        url: "/crm/home",
        icon: House,
        isActive: false,
      },
      ...(authUserId && userType != 2 && userType != 3
        ? [
            {
              title: "My Profile",
              url: `/crm/member-form/${encodeURIComponent(encryptId(authUserId))}`,
              icon: Users,
              isActive: false,
            },
          ]
        : []),

      {
        title: "Member",
        url: "#",
        isActive: false,
        icon: Users,
        items: [
          {
            title: "New Register",
            url: "/crm/new-register",
          },
          {
            title: "All",
            url: "/crm/member",
          },
          // {
          //   title: "Active",
          //   url: "/crm/active-member",
          // },
          // {
          //   title: "Inactive",
          //   url: "/crm/inactive-member",
          // },
        ],
      },
      {
        title: "Event",
        url: "#",
        isActive: false,
        icon: Settings2,
        items: [
          {
            title: "Event",
            url: "/crm/event",
          },

          // {
          //   title: "Event Register",
          //   url: "/crm/event-register",
          // },
          // {
          //   title: "Event Track",
          //   url: "/crm/event-track",
          // },
        ],
      },
      {
        title: "Room Bookings",
        url: "/crm/booking-form",
        icon: House,
        isActive: false,
      },
      {
        title: "Hall Bookings",
        url: "/crm/booking-hall",
        icon: House,
        isActive: false,
      },
      {
        title: "Loan Form",
        url: "/crm/loan",
        icon: House,
        isActive: false,
      },
      {
        title: "AGM Report",
        url: "/crm/report-agm",
        icon: House,
        isActive: false,
      },
      {
        title: "Report",
        url: "#",
        isActive: false,
        icon: ChartColumnDecreasing,

        items: [
          {
            title: "Event",
            url: "/crm/report-event",
          },
          {
            title: "Member",
            url: "/crm/report-member",
          },
          // {
          //   title: "Event Summary",
          //   url: "/crm/report-event-summary",
          // },
        ],
      },
    ],
  };

  const data = {
    ...initialData,
    navMain: initialData.navMain,
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent className="sidebar-content">
        {/* <NavProjects projects={data.projects} /> */}
        <NavMain items={data.navMain} />
        {/* <NavMainUser projects={data.userManagement} /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
