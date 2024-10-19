import React from "react";
import ActiveCard from "../dashboard/active-proposal-card";
import proposals from "../../lib/active-proposals";

function PendingProposals() {
  const inactiveProposals = proposals.filter((proposal) => !proposal.active);
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
          <ActiveCard proposal={proposal} key={proposal.id} />
        ))}
      </div>
    </div>
  );
}

export default PendingProposals;
