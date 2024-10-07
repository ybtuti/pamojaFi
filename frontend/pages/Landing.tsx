import React from "react";
import Navbar from "../components/app/landing/Navbar";
import Hero from "../components/app/landing/Hero";

function Landing() {
  return (
    <div>
      <div className="bg-hero">
        <Navbar />
        <Hero />
      </div>
    </div>
  );
}

export default Landing;
