import React from "react";
import Navbar from "../components/app/landing/Navbar";
import Hero from "../components/app/landing/Hero";
import Benefits from "../components/app/landing/Benefits";
import Works from "../components/app/landing/Works";
import Footer from "../components/app/landing/footer";
import CTA from "../components/app/landing/cta";

function Landing() {
  return (
    <div>
      <div className="bg-hero">
        <Navbar />
        <Hero />
      </div>
      <div className="bg-[#0B373D] py-4" id="benefits">
        <Benefits />
      </div>
      <div className="bg-works py-2">
        <Works />
      </div>
      <div className="bg-benefits py-2">
        <CTA />
      </div>
      <div className="bg-footer py-2">
        <Footer />
      </div>
    </div>
  );
}

export default Landing;
