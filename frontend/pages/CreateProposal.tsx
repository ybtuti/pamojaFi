import React from "react";
import Navbar from "../components/app/landing/Navbar";
import CreateProposalForm from "../components/app/create-proposal/create";
import { Toaster } from "react-hot-toast";

function CreateProposal() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-0">
        <CreateProposalForm />
      </div>
      <Toaster />
    </div>
  );
}

export default CreateProposal;
