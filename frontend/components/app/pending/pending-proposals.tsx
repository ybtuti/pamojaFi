import React from "react";
import ActiveCard from "../dashboard/active-proposal-card";
import proposals from "../../lib/active-proposals";
import { useReadContract } from "thirdweb/react";
import { contract } from "../../../src/client";
import { IProposal } from "../dashboard/active-proposal-card";

function PendingProposals() {
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

  const inactiveProposals: IProposal[] = data.filter(
    (proposal: IProposal) => proposal.status === 0
  );

  if (inactiveProposals.length === 0) {
    return (
      <div className="flex items-center h-screen logo justify-center text-lg text-center text-neutral-400">
        No inactive proposals found.
      </div>
    );
  }
  return (
    <div className="max-w-7xl mx-auto my-0">
      <div className="flex flex-col gap-2 mx-2">
        <h1 className="logo text-xl font-semibold lg:text-2xl">
          Pending Proposals
        </h1>
        <p className="title text-benefits leading-relaxed w-full md:max-w-[40%] dark:text-neutral-200">
          These are proposals from farmers across the continent that are still
          being voted on by the community.
        </p>
      </div>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2 mt-4">
        {inactiveProposals.map((proposal) => (
          <ActiveCard proposal={proposal} key={Number(proposal.proposalId)} />
        ))}
      </div>
    </div>
  );
}

export default PendingProposals;
