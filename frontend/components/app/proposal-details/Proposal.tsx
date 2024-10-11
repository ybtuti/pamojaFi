import React from "react";
import { useParams } from "react-router-dom";
import proposals, { Proposal } from "../../lib/active-proposals";

function ProposalDetail() {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id.toString() === id);

  if (!proposal) {
    return <div>Proposal not found</div>;
  }

  return (
    <div className="proposal-detail">
      <h1>{proposal.name}</h1>
      <img src={proposal.headerImageLink} alt={proposal.name} />
      <p>{proposal.desc}</p>
      {/* Add more details as needed */}
    </div>
  );
}

export default ProposalDetail;
