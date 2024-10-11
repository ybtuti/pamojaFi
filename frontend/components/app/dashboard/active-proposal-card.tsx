import React from "react";
import { Proposal } from "../../lib/active-proposals";
import { LazyLoadImage } from "react-lazy-load-image-component";
import { useNavigate } from "react-router-dom";
import {
  IconHeartFilled,
  IconWallet,
  IconCircleCheck,
} from "@tabler/icons-react";

function ActiveCard({ proposal }: { proposal: Proposal }) {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/proposals/${proposal.id}`);
  };

  return (
    <div
      className="shadow rounded-md hover:scale-95 ease-in-out duration-500 cursor-pointer p-2 my-4 md:my-2"
      onClick={handleClick}
    >
      <div>
        <LazyLoadImage
          src={proposal.headerImageLink}
          alt={proposal.name}
          className="w-full h-48 object-cover rounded-lg"
        />
      </div>
      <div className="flex flex-col gap-2 my-2 mb-4">
        <div className="flex items-center justify-between mx-2 mt-2">
          <h1 className="logo text-[#000] font-semibold text-lg">
            {proposal.name}
          </h1>
          {proposal.active && (
            <div className="flex gap-1">
              <p className="text-sm logo">{proposal.votes}</p>
              <IconHeartFilled size={20} stroke={1.5} color="#FF0000" />
            </div>
          )}
        </div>
        <p className="text-sm text-benefits title leading-relaxed px-2">
          {proposal.desc}
        </p>
      </div>
      {proposal.active && (
        <div className="w-full border-t-benefits border-b-benefits border-[1px] border-r-0 border-l-0 py-4 flex justify-between items-center">
          <div className="flex px-0 gap-1 items-center">
            <IconWallet size={20} stroke={1.5} color="#FF0000" />
            <p className="text-sm logo">
              {proposal.walletAddress.substring(0, 12)}...
            </p>
          </div>
          <div className="flex px-0 items-center">
            <p className="text-xs logo text-center">
              {proposal.authorNamespace}
            </p>
            <IconCircleCheck size={15} stroke={1.5} color="#FF0000" />
          </div>
        </div>
      )}
      <div className="w-full py-4 flex justify-between items-center">
        <div className="flex-col px-0 gap-1 items-center">
          <h1 className="text-sm font-semibold logo">TARGET</h1>
          <p className="text-sm title">
            {proposal.target.toLocaleString("en-US", {
              style: "currency",
              currency: "KES",
            })}
          </p>
        </div>
        <div className="flex-col px-0 items-center">
          <h1 className="text-sm font-semibold logo">CATEGORY</h1>
          <p className="text-xs logo text-center">{proposal.category}</p>
        </div>
      </div>
    </div>
  );
}

export default ActiveCard;
