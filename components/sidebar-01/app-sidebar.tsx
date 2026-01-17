"use client";

import { Sidebar, SidebarContent } from "@/components/ui/sidebar";
import {
  IconAd2,
  IconAi,
  IconBellRinging,
  IconCalendar,
  IconCalendarStats,
  IconHome,
  IconListDetails,
  IconMail,
  IconNews,
  IconNotebook,
  IconPlane,
  IconPlaneInflight,
  IconPlus,
  IconProgressCheck,
  IconSend,
  IconSettings,
  IconSettingsCode,
  IconTemplate,
  IconTrash,
} from "@tabler/icons-react";
import { LayoutDashboard, Package } from "lucide-react";
import { NavCollapsible } from "@/components/sidebar-01/nav-collapsible";
import { NavFooter } from "@/components/sidebar-01/nav-footer";
import { NavHeader } from "@/components/sidebar-01/nav-header";
import { NavMain } from "@/components/sidebar-01/nav-main";
import type { SidebarData } from "./types";

const data: SidebarData = {
  user: {
    name: "ephraim",
    email: "ephraim@blocks.so",
    avatar: "/avatar-01.jpg",
  },
  navMain: [
    {
      id: "overview",
      title: "Overview",
      url: "#",
      icon: LayoutDashboard,
      isActive: true,
    },
    {
      id: "home",
      title: "Home",
      url: "#",
      icon: IconHome,
    },
    {
      id: "meetings",
      title: "Meetings",
      url: "#",
      icon: IconCalendarStats,
    },
    {
      id: "notes",
      title: "Notes",
      url: "#",
      icon: IconNotebook,
    },
    {
      id: "calendar",
      title: "Calendar",
      url: "#",
      icon: IconCalendar,
    },
    {
      id: "inbox",
      title: "Inbox",
      url: "#",
      icon: IconMail,
    },
    {
      id: "notifications",
      title: "Notifications",
      url: "#",
      icon: IconBellRinging,
    },
    {
      id: "ai",
      title: "Mindscrawl AI",
      url: "#",
      icon: IconAi,
    },
  ],
  navCollapsible: {
    favorites: [
      {
        id: "design",
        title: "Design",
        href: "#",
        color: "bg-green-400 dark:bg-green-300",
      },
      {
        id: "development",
        title: "Development",
        href: "#",
        color: "bg-blue-400 dark:bg-blue-300",
      },
      {
        id: "workshop",
        title: "Workshop",
        href: "#",
        color: "bg-orange-400 dark:bg-orange-300",
      },
      {
        id: "personal",
        title: "Personal",
        href: "#",
        color: "bg-red-400 dark:bg-red-300",
      },
    ],
    shared: [
      {
        id: "collaborating",
        title: "Start Collaborating",
        icon: IconPlus,
      },
    ],
    apps: [
      {
        id: "mail",
        title: "Mindscrawl Mail",
        icon: IconSend,
      },
      {
        id: "calender",
        title: "Mindscrawl Calender",
        icon: IconCalendar,
      },
    ],
    options: [
      {
        id: "settings",
        title: "Settings",
        icon: IconSettings,
      },
      {
        id: "templates",
        title: "Templates",
        icon: IconTemplate,
      },
      {
        id: "trash",
        title: "Trash",
        icon: IconTrash,
      },
    ],
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <NavHeader data={data} />
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavCollapsible
          favorites={data.navCollapsible.favorites}
          shared={data.navCollapsible.shared}
          apps={data.navCollapsible.apps}
          options={data.navCollapsible.options}
        />
      </SidebarContent>
      <NavFooter user={data.user} />
    </Sidebar>
  );
}
