import { verify } from "../../actions/verify";
import React from "react";
import { VerificationLevel, IDKitWidget, useIDKit } from "@worldcoin/idkit";
import type { ISuccessResult } from "@worldcoin/idkit";
import Image from "next/image";
import { useNavigate } from "react-router-dom";

export default function WORLDid() {
  const navigate = useNavigate();

  // TODO: Calls your implemented server route
  const verifyProof = async (proof) => {
    throw new Error("TODO: verify proof server route");
  };

  // TODO: Functionality after verifying
  const onSuccess = () => {
    console.log("Success");
  };

  return (
    <div className="py-2">
      <IDKitWidget
        app_id="app_staging_bbb0778723a04c0239ef1525016b16c6"
        action="pamojafi"
        false
        verification_level={VerificationLevel.Device}
        handleVerify={verifyProof}
        onSuccess={onSuccess}
      >
        {({ open }) => <button onClick={open}>Verify with World ID</button>}
      </IDKitWidget>
      {/* <button
        className=" bg-black text-white rounded w-fit"
        onClick={() => setOpen(true)}
      >
        <div
          className={`flex items-center px-6 p-3 gap-x-6 text-lg font-medium`}
        >
          <img
            src="https://cryptologos.cc/logos/worldcoin-org-wld-logo.png?v=035"
            alt="alt"
            width={500}
            height={500}
            className="size-6"
          />
          Verify with World ID
        </div>
      </button> */}
    </div>
  );
}
