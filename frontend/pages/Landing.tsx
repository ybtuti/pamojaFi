import React from "react";
import Navbar from "../components/app/landing/Navbar";
import Hero from "../components/app/landing/Hero";
import Benefits from "../components/app/landing/Benefits";

function Landing() {
  return (
    <div>
      <div className="bg-hero">
        <Navbar />
        <Hero />
      </div>
      <div className="bg-[#0B373D] py-2">
        <Benefits />
      </div>
    </div>
  );
}

export default Landing;
