import React from "react";
import { Button } from "../../ui/button";

function Hero() {
  return (
    <div className="bg-hero">
      <div className="flex items-center justify-center flex-col mt-16">
        <h1 className="md:text-5xl text-2xl mt-16 mb-8 logo font-bold text-gray-800 md:w-[8-0%] w-full text-center text-benefits">
          Empowering Farmers with Community-Driven Solutions One Farm at a Time
        </h1>
        <p className="text-lg title text-center mb-16 text-benefits">
          Join PamojaFi to enhance agricultural productivity through
          decentralized governance and resource allocation.36+
        </p>
        <div className="flex flex-col md:flex-row gap-2 w-[80%] items-center justify-center">
          <Button className="font-bold title md:text-lg bg-benefits text-hero w-full md:w-[20%]">
            Get Started
          </Button>
          <Button className="border-benefits text-benefits border-2 text-lg title w-full md:w-[20%]">
            Explore
          </Button>
        </div>
      </div>
      <div></div>
    </div>
  );
}

export default Hero;
