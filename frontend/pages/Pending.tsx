import React from "react";
import Navbar from "../components/app/landing/Navbar";
import PendingProposals from "../components/app/pending/pending-proposals";

function Pending() {
  return (
    <div>
      <Navbar />
      <PendingProposals />
    </div>
  );
}

export default Pending;
