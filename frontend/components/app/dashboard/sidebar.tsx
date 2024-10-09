"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "../../ui/sidebar";
import {
  IconUserFilled,
  IconChartPieFilled,
  IconPresentationFilled,
  IconMessageFilled,
  IconBooks,
  IconBuildingStore,
} from "@tabler/icons-react";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "../../lib/utils";
//@ts-ignore
import logo from "../../../public/logo.jpg";
import Proposals from "./proposals";
import Market from "./marketplace";
import Forums from "./forums";
import Resources from "./resource-center";
import Analytics from "./analytics";

export function DashboardSidebar() {
  const [dashboardContent, setDashboardContent] = useState<string | undefined>(
    "proposals"
  );

  const links = [
    {
      label: "Proposals",
      href: "#",
      icon: <IconPresentationFilled className="h-5 w-5 flex-shrink-0" />,
      dashboardContent: "proposals",
    },
    {
      label: "Marketplace",
      href: "#",
      icon: <IconBuildingStore className="h-5 w-5 flex-shrink-0" />,
      dashboardContent: "marketplace",
    },
    {
      label: "Forums",
      href: "#",
      icon: <IconMessageFilled className="h-5 w-5 flex-shrink-0" />,
      dashboardContent: "forums",
    },
    {
      label: "Resource Center",
      href: "#",
      icon: <IconBooks className="h-5 w-5 flex-shrink-0" />,
      dashboardContent: "resources",
    },
    {
      label: "Analytics",
      href: "#",
      icon: (
        <IconChartPieFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
      dashboardContent: "analytics",
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row  w-[100%] flex-1 max-w-[102rem] overflow-hidden",
          "" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                <h1 className="title text-lg my-4 md:hidden">Dashboard</h1>
                {links.map((link, idx) => (
                  <SidebarLink
                    key={idx}
                    link={link}
                    dashboardContent={link.dashboardContent}
                    setDashboardContent={setDashboardContent}
                  />
                ))}
              </div>
            </div>
            <div className="">
              <SidebarLink
                link={{
                  label: "sylus.base",
                  href: "#",
                  icon: <IconUserFilled className="h-5 w-5 flex-shrink-0" />,
                }}
              />
            </div>
          </SidebarBody>
        </Sidebar>
        <Dashboard dashboardContent={dashboardContent} />
      </div>
    </div>
  );
}

const Dashboard = ({
  dashboardContent,
}: {
  dashboardContent: string | undefined;
}) => {
  if (dashboardContent === undefined || dashboardContent === "proposals") {
    return <Proposals />;
  } else if (dashboardContent === "marketplace") {
    return <Market />;
  } else if (dashboardContent === "forums") {
    return <Forums />;
  } else if (dashboardContent === "resources") {
    return <Resources />;
  } else {
    return <Analytics />;
  }
};
