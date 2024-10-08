import React from "react";
import { Link, useLocation } from "react-router-dom";
import { client } from "../../../src/clent";
import { ConnectButton } from "thirdweb/react";
import { IoMenu } from "react-icons/io5";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../../../components/ui/drawer";
import { Button } from "../../../components/ui/button";
import { MdDashboardCustomize } from "react-icons/md";
import { MdOutlinePendingActions } from "react-icons/md";
import { IoIosCreate } from "react-icons/io";
import { TiGroup } from "react-icons/ti";

function Navbar() {
  const location = useLocation();
  const currentPath = location.pathname;
  console.log(currentPath);
  return (
    <div className="flex justify-between items-center max-w-[1190px] mx-auto my-0 py-8">
      <Link to="/" className="mx-2">
        <h1 className="text-2xl font-extrabold text-benefits logo ">
          pamojaFI.
        </h1>
      </Link>
      <div className="hidden md:flex items-center justify-between text-gray-700 title gap-2">
        <Link
          to="/dashboard"
          className={`text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 ${
            currentPath === "/dashboard"
              ? "border-b-[2px]  border-benefits"
              : ""
          }`}
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className={`text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 ${
            currentPath === "/create" ? "border-b-[2px]  border-benefits" : ""
          }`}
        >
          Create
        </Link>

        <Link
          to="/pending"
          className={`text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 ${
            currentPath === "/pending" ? "border-b-[2px]  border-benefits" : ""
          }`}
        >
          Pending
        </Link>

        <Link
          to="/community"
          className={`text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 ${
            currentPath === "/community"
              ? "border-b-[2px]  border-benefits"
              : ""
          }`}
        >
          Community
        </Link>
      </div>
      <div className="logo hidden md:flex">
        <ConnectButton client={client} />
      </div>
      <div className="flex md:hidden mx-4">
        <Drawer>
          <DrawerTrigger>
            <IoMenu className="text-xl" size={44} />
          </DrawerTrigger>
          <DrawerContent className="bg-hero">
            <DrawerHeader>
              <DrawerTitle>
                <div className="mx-2">
                  <h1 className="text-2xl font-extrabold text-gray-700 logo ">
                    pamojaFI.
                  </h1>
                </div>
              </DrawerTitle>
              <DrawerDescription>
                <p className="text-sm title text-gray-500">
                  Empowering Africa, one farm at a time
                </p>
              </DrawerDescription>
            </DrawerHeader>
            <div className="flex-col flex text-gray-700 title gap-4 my-4">
              <Link
                to="/dashboard"
                className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 flex gap-2"
              >
                <MdDashboardCustomize className="text-xl" size={24} />
                Dashboard
              </Link>

              <Link
                to="/create"
                className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 flex gap-2"
              >
                <IoIosCreate className="text-xl" size={24} />
                Create
              </Link>

              <Link
                to="/pending"
                className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 flex gap-2"
              >
                <MdOutlinePendingActions className="text-xl" size={24} />
                Pending
              </Link>

              <Link
                to="/community"
                className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150 flex gap-2"
              >
                <TiGroup className="text-xl" size={24} />
                Community
              </Link>
            </div>
            <DrawerFooter>
              <div className="flex justify-between items-center">
                <div className="logo">
                  <ConnectButton client={client} />
                </div>
                <DrawerClose>
                  <Button variant="outline" className="py-4">
                    Close
                  </Button>
                </DrawerClose>
              </div>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>
    </div>
  );
}

export default Navbar;
