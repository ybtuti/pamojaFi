import React from "react";
import { HiUserGroup } from "react-icons/hi";
import { BsCashCoin } from "react-icons/bs";
import { GiReceiveMoney } from "react-icons/gi";
import { GiFarmTractor } from "react-icons/gi";
import { RiProfileFill } from "react-icons/ri";
import { MdOutlineArrowOutward } from "react-icons/md";

const benefits = [
  {
    id: 1,
    title: "Decentralized Governance",
    desc: "Empower communities with a governance model that encourages active participation and transparency.",
    icon: <HiUserGroup size={32} />,
  },
  {
    id: 2,
    title: "Automated Fund Distribution",
    desc: "Utilize smart contracts for secure and efficient fund management.",
    icon: <BsCashCoin size={32} />,
  },
  {
    id: 3,
    title: "Collective Project Funding",
    desc: "Unlock the potential of community-driven funding through collective pools.",
  },
  {
    id: 4,
    title: "Sustainable Agricultural Practices",
    desc: "PamojaFi is committed to promoting sustainable agriculture by supporting eco-friendly projects.",
    icon: <GiFarmTractor size={32} />,
  },
  {
    id: 5,
    title: "Community Engagement and Feedback",
    desc: "Foster a culture of collaboration through community engagement.",
    icon: <GiFarmTractor size={32} />,
  },
  {
    id: 6,
    title: "Reputation and Incentive System",
    desc: "Recognize and reward active community members through a reputation-based system. ",
    icon: <RiProfileFill size={32} />,
  },
];

function Benefits() {
  return (
    <div className="max-w-[1190px] mx-auto my-0">
      <h1 className="logo text-xl lg:text-2xl text-center  text-hero">
        Efficient and Integrated Agricultural Services
      </h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-16">
        {benefits.map((benefit) => (
          <div key={benefit.id} className="rounded-lg py-4 bg-[#153E44] m-2">
            <div className="text-hero flex items-center justify-between mx-2 mb-16">
              {benefit.icon}
              <MdOutlineArrowOutward size={32} />
            </div>
            <div>
              <h1 className="logo text-lg py-2 mx-2 font-semibold text-hero">
                {benefit.title}
              </h1>
              <p className="title font-light mx-2 leading-relaxed text-hero">
                {benefit.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Benefits;
