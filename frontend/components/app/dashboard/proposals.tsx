import React from "react";

function Proposals() {
  return (
    <div className="p-2 md:p-10 md:rounded-tl-2xl border border-benefits flex flex-col gap-2 flex-1 w-full h-full">
      <div className="flex items-center md:justify-between gap-4">
        <h1 className="text-lg logo hidden md:flex">Categories</h1>
        <div className="flex items-center justify-between">
          <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-xl py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            All
          </button>
          <button className="text-sm logo md:mx-4 mx-3 border-benefits border-[1px] rounded-xl py-2 md:px-4 px-2 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Livestock
          </button>
          <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-xl py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Crop Production
          </button>
          <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-xl py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Fish Farming
          </button>
          <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-xl py-2 md:px-4 px-1 hover:bg-benefits hover:text-hero transition-all duration-150 ">
            Other
          </button>
        </div>
      </div>
    </div>
  );
}

export default Proposals;
