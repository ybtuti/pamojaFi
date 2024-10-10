import React from "react";
import Navbar from "../components/app/landing/Navbar";
import LeaderBoard from "../components/app/community/leaderboard";

function Community() {
  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto my-0">
        <LeaderBoard />
      </div>
    </div>
  );
}

export default Community;
