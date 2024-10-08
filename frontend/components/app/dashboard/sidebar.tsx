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
import logo from "../../../public/logo.jpg";

export function DashboardSidebar() {
  const links = [
    {
      label: "Proposals",
      href: "#",
      icon: (
        <IconPresentationFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Marketplace",
      href: "#",
      icon: (
        <IconBuildingStore className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Forums",
      href: "#",
      icon: (
        <IconMessageFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Resource Center",
      href: "#",
      icon: (
        <IconBooks className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
    {
      label: "Analytics",
      href: "#",
      icon: (
        <IconChartPieFilled className="text-neutral-700 dark:text-neutral-200 h-5 w-5 flex-shrink-0" />
      ),
    },
  ];
  const [open, setOpen] = useState(false);
  return (
    <div className="flex items-center justify-center w-full">
      <div
        className={cn(
          "rounded-md flex flex-col md:flex-row  w-[100%] flex-1 max-w-[96rem] overflow-hidden",
          "h-screen" // for your use case, use `h-screen` instead of `h-[60vh]`
        )}
      >
        <Sidebar open={open} setOpen={setOpen}>
          <SidebarBody className="justify-between gap-10">
            <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
              <div className="mt-8 flex flex-col gap-2">
                <h1 className="title text-lg my-4 md:hidden">Dashboard</h1>
                {links.map((link, idx) => (
                  <SidebarLink key={idx} link={link} />
                ))}
              </div>
            </div>
            <div>
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
        <Dashboard />
      </div>
    </div>
  );
}

const Dashboard = () => {
  return (
    <div className="flex flex-1">
      <div className="p-2 md:p-10 rounded-tl-2xl border-[1px] border-neutral-200 dark:border-neutral-700 bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full h-full">
        <div className="flex gap-2">
          {[...new Array(4)].map((i) => (
            <div
              key={"first-array" + i}
              className="h-20 w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
        <div className="flex gap-2 flex-1">
          {[...new Array(2)].map((i) => (
            <div
              key={"second-array" + i}
              className="h-full w-full rounded-lg  bg-gray-100 dark:bg-neutral-800 animate-pulse"
            ></div>
          ))}
        </div>
      </div>
    </div>
  );
};
