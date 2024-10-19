import React from "react";
import proposals from "../../lib/active-proposals";
import ActiveCard from "./active-proposal-card";
import { useReadContract } from "thirdweb/react";
import { contract } from "../../../src/client";
import { IProposal } from "./active-proposal-card";

function Proposals() {
  const { data, isPending } = useReadContract({
    contract,
    method:
      "function getAllProposals() view returns ((uint256 proposalId, string name, uint256 targetEth, string projectLink, address projectWalletAddress, string imageUrl, string teamInformation, string category, string relevantLinks, string shortDescription, string additionalDetails, uint8 status, uint256 totalFunded, uint256 funderCount)[])",
    params: [],
  });

  if (isPending) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-ring loading-lg"></span>
      </div>
    );
  }
  if (!data) {
    return (
      <div className="flex items-center h-screen logo justify-center text-lg text-center text-neutral-400">
        No proposals found.
      </div>
    );
  }

  const activeProposals: IProposal[] = data.filter(
    (proposal: IProposal) => proposal.status === 1
  );

  if (activeProposals.length === 0) {
    return (
      <div className="flex items-center h-screen logo justify-center text-lg text-center text-neutral-400">
        No active proposals found.
      </div>
    );
  }

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
        <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
          {data &&
            activeProposals.map((proposal) => (
              <ActiveCard
                proposal={proposal}
                key={Number(proposal.proposalId)}
              />
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
