import React from "react";
import { useParams } from "react-router-dom";
import proposals, { Proposal } from "../../lib/active-proposals";
import Navbar from "../landing/Navbar";
import { Button } from "../../ui/button";

function ProposalDetail() {
  const { id } = useParams<{ id: string }>();
  const proposal = proposals.find((p) => p.id.toString() === id);

  if (!proposal) {
    return <div>Proposal not found</div>;
  }
  const handleClick = (action: string) => {
    if (action === "fund") {
      console.log("Funding project");
    } else {
      console.log("Voting for project");
    }
  };

  return (
    <div className="">
      <Navbar />
      <div className="max-w-7xl md:mx-auto mx-2 my-0 mb-10">
        <div className="my-4">
          <img
            src={proposal.headerImageLink}
            alt={proposal.name}
            className="w-full h-96 object-fill rounded-lg shadow-lg"
          />
        </div>
        <div className="flex justify-between items-center my-4 mb-8">
          <div>
            <h1 className="logo font-bold md:text-2xl text-lg text-benefits flex flex-col">
              {proposal.name}
              <span className="text-sm title ml-8 text-[#808080] cursor-pointer hover:text-[#0000ee]">
                By {proposal.authorNamespace}
              </span>
              <a
                href={`https://sepolia.etherscan.io/search?f=0&q=${proposal.walletAddress}`}
                target="_blank"
                rel="noreferrer"
                className="-mt-2"
              >
                <span className="text-sm title ml-8 text-[#808080] cursor-pointer hover:text-[#0000ee]">
                  Wallet Address {proposal.walletAddress.substring(0, 12)}...
                </span>
              </a>
            </h1>
            <div className="flex items-center gap-4 mt-4">
              <a href={proposal.link} target="_blank" rel="noreferrer">
                <Button className="bg-benefits text-hero title">
                  Live Project
                </Button>
              </a>
              <a href={proposal.otherLinks[0]} target="_blank" rel="noreferrer">
                <Button className="bg-benefits text-hero title">
                  Project Socials
                </Button>
              </a>
            </div>
          </div>
          <div className="flex flex-col items-start justify-between text-xs md:text-sm title text-[#808080]">
            <p className="text-sm title text-[#808080]">
              Category: {proposal.category}
            </p>
            {proposal.active ? (
              <p>Raised {proposal.raised} ETH</p>
            ) : (
              <p>{proposal.votes} Votes</p>
            )}
            <p>Target {proposal.target} ETH</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h1 className="logo text-lg font-semibold text-benefits">
              Description
            </h1>
            <p className="text-base leading-relaxed title">{proposal.desc}</p>
          </div>
          <div>
            <h1 className="logo text-lg font-semibold text-benefits">
              Meet the Team
            </h1>
            <p className="text-base leading-relaxed title">{proposal.team}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
          <div>
            <h1 className="logo text-lg font-semibold text-benefits">
              Additional Details
            </h1>
            <p className="text-base leading-relaxed title">
              {proposal.moreDetails}
            </p>
          </div>
          <div className="mt-4">
            {proposal.active ? (
              <div className="flex items-center justify-center flex-col md:flex-row gap-2">
                <img
                  src="https://images-platform.99static.com/pULAgn-AED8QzzPGS40V0GCDOEk=/0x0:1000x1000/500x500/top/smart/99designs-contests-attachments/130/130378/attachment_130378088"
                  alt="cool-nft"
                  className="w-96 h-72 object-fill rounded-lg shadow-lg"
                />
                <p className="text-lg title md:mt-0 mt-2">
                  Fund this project and get this NFT!
                </p>
              </div>
            ) : (
              <div className="flex items-center justify-center flex-col md:flex-row gap-2">
                <img
                  src="https://www.farmafrica.org/wp-content/uploads/2024/09/RS15686_IMG_7111_lpr.jpg"
                  alt="support"
                  className="w-96 h-72 object-fill rounded-lg shadow-lg"
                />
                <p className="text-lg title md:mt-0 mt-2">
                  Help bring this project to life by voting!
                </p>
              </div>
            )}
          </div>
        </div>
        {proposal.active ? (
          <Button
            className="bg-benefits w-full text-hero title mt-8 mb-1"
            onClick={() => handleClick("fund")}
          >
            Fund Project
          </Button>
        ) : (
          <Button
            className="bg-benefits w-full text-hero title mt-8 mb-1"
            onClick={() => handleClick("vote")}
          >
            Vote for this Project
          </Button>
        )}
      </div>
    </div>
  );
}

export default ProposalDetail;
