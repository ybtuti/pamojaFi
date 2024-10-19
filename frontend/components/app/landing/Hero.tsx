import React from "react";
import { Button } from "../../ui/button";
import { PiUsersThreeFill } from "react-icons/pi";
import { IoMdAdd } from "react-icons/io";
import { HeroStats } from "./HeroStats";
import { FcDocument } from "react-icons/fc";
import { PiFarmFill } from "react-icons/pi";
import { BsStars } from "react-icons/bs";
import { PiArrowCircleUpLeftDuotone } from "react-icons/pi";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="bg-hero relative pb-4">
      <div className="flex items-center justify-center flex-col mt-[2rem] mb-8 pb-4">
        <h1 className="md:text-5xl text-2xl mt-[3rem] mb-8 logo font-bold text-gray-800 md:w-[8-0%] w-full text-center text-benefits">
          Empowering Farmers with Community-Driven Solutions One Farm at a Time
        </h1>
        <p className="text-lg title text-center mb-16 text-benefits">
          Join PamojaFi to enhance agricultural productivity through
          decentralized governance and resource allocation.
        </p>
        <div className="flex flex-col md:flex-row gap-2 w-[80%] items-center justify-center">
          <Button className="font-bold title md:text-lg bg-benefits text-hero w-full md:w-[20%]">
            <Link
              to="/dashboard"
              className="w-full h-full flex items-center justify-center"
            >
              Get Started
            </Link>
          </Button>

          <Button className="border-benefits text-benefits border-2 dark:border-transparent dark:text-hero text-lg title w-full md:w-[20%]">
            <Link
              to="/community"
              className="w-full h-full flex items-center justify-center"
            >
              Explore
            </Link>
          </Button>
        </div>
      </div>
      <HeroStats />
      <div className="hidden md:block">
        <div className="absolute bottom-96 left-24 ">
          <FcDocument size={44} />
        </div>
        <div className="absolute bottom-[28rem] left-44 ">
          <PiFarmFill size={40} />
        </div>
        <div className="absolute bottom-[28rem] right-44">
          <BsStars size={44} />
        </div>
        <div className="absolute bottom-96 right-24">
          <PiArrowCircleUpLeftDuotone size={44} />
        </div>
      </div>
    </div>
  );
}

export default Hero;
