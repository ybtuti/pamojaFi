import React from "react";
import { IconList, IconTableFilled } from "@tabler/icons-react";

function LeaderBoard() {
  return (
    <div>
      <div className="flex flex-col gap-2 mx-2 mb-4">
        <h1 className="logo text-xl font-semibold lg:text-2xl">
          Community Leader board
        </h1>
        <p className="title text-benefits leading-relaxed w-full md:max-w-[40%]">
          View the top projects in the community based on their farming
          activities impact as voted by you.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-center md:justify-between">
        <div className="flex items-center justify-normal">
          <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-2 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            All
          </button>
          <button className="text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-2 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Livestock
          </button>
          <button className="text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Crop Farming{" "}
          </button>
          <button className="text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Fish Farming
          </button>
          <button className="text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Other
          </button>
        </div>
        <div className="md:flex items-center justify-between gap-2 hidden">
          <div className="flex bg-hero rounded-md py-2 px-2 items-center cursor-pointer">
            <IconList size={25} stroke={1.5} color="#FF0000" />
            <h1 className="logo text-sm">List</h1>
          </div>
          <div className="flex bg-benefits text-hero rounded-md py-2 px-2 items-center cursor-pointer">
            <IconTableFilled size={25} stroke={1.5} color="#FF0000" />
            <h1 className="logo text-sm">Card</h1>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeaderBoard;
