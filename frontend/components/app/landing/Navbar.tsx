import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="hidden md:flex justify-between items-center bg-red-500">
      <div>
        <h1 className="text-5xl font-extrabold text-gray-700 logo ">
          pamojaFI.
        </h1>
      </div>
      <div className="flex items-center justify-between">
        <Link to="/dashboard">Dashboard</Link>

        <Link to="/create">Create</Link>

        <Link to="/pending">Pending</Link>

        <Link to="/community">Community</Link>
      </div>
      <div></div>
    </div>
  );
}

export default Navbar;
