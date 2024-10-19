import React from "react";
import { IconList, IconTableFilled } from "@tabler/icons-react";

type TDisplayStyle = "list" | "card";

function LeaderBoard() {
  const [displayStyle, setDisplayStyle] = React.useState<TDisplayStyle>("card");

  const handleDisplayStyle = (style: TDisplayStyle) => {
    setDisplayStyle(style);
  };
  return (
    <div>
      <div className="flex flex-col gap-2 mx-2 mb-4">
        <h1 className="logo text-xl font-semibold lg:text-2xl dark:text-neutral-200">
          Community Leader board
        </h1>
        <p className="title text-benefits leading-relaxed w-full md:max-w-[40%] dark:text-hero">
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
          <div
            className={`flex ${
              displayStyle === "list"
                ? "bg-benefits text-hero"
                : "bg-hero text-benefits"
            } rounded-md py-2 px-2 items-center cursor-pointer translate-all duration-100 ease-in-out`}
            onClick={() => handleDisplayStyle("list")}
          >
            <IconList size={25} stroke={1.5} color="#FF0000" />
            <h1 className="logo text-sm">List</h1>
          </div>
          <div
            className={`flex ${
              displayStyle === "card"
                ? "bg-benefits text-hero "
                : "bg-hero text-benefits"
            } rounded-md py-2 px-2 items-center cursor-pointer translate-all duration-100 ease-in-out`}
            onClick={() => handleDisplayStyle("card")}
          >
            <IconTableFilled size={25} stroke={1.5} color="#FF0000" />
            <h1 className="logo text-sm">Card</h1>
          </div>
        </div>
      </div>
      <div>
        <h1 className="logo text-xl text-center text-benefits mt-8 dark:text-neutral-100">
          Nothing here yet.
        </h1>
      </div>
    </div>
  );
}

export default LeaderBoard;
