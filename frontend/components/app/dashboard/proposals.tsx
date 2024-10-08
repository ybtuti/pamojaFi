import React from "react";
import activeProposals from "../../lib/active-proposals";
import ActiveCard from "./active-proposal-card";
import { Button } from "../../ui/button";

function Proposals() {
  const [onViewProposals, setOnViewProposals] = React.useState([]);
  return (
    <div className="p-2 md:p-10 md:rounded-tl-2xl border border-benefits flex flex-col gap-2 flex-1 w-full h-full">
      <div>
        <div className="flex items-center md:justify-between gap-4 my-2">
          <h1 className="text-lg logo hidden md:flex">Categories</h1>
          <div className="flex items-center justify-between">
            <button className="md:text-sm text-xs logo md:mx-4 mx-1 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-2 hover:bg-benefits hover:text-hero transition-all duration-150 ">
              All
            </button>
            <button className="text-xs logo md:mx-4 mx-3 border-benefits border-[1px] rounded-lg py-2 md:px-4 px-2 hover:bg-benefits hover:text-hero transition-all duration-150 ">
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
        </div>
        <div className="w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-2">
          {activeProposals.map((proposal) => (
            <ActiveCard proposal={proposal} key={proposal.id} />
          ))}
        </div>
      </div>
      {/* <div className="w-full items-center justify-center my-4">
        <Button className="bg-benefits text-hero title">Load More</Button>
      </div> */}
    </div>
  );
}

export default Proposals;
