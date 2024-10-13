import React from "react";
import Navbar from "../components/app/landing/Navbar";
import CreateProposalForm from "../components/app/create-proposal/create";

function CreateProposal() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-0">
        <CreateProposalForm />
      </div>
    </div>
  );
}

export default CreateProposal;
