import React from "react";
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <div className="flex justify-between items-center">
      <div className="mx-2">
        <h1 className="text-2xl font-extrabold text-gray-700 logo ">
          pamojaFI.
        </h1>
      </div>
      <div className="hidden md:flex items-center justify-between text-gray-700 title gap-2">
        <Link
          to="/dashboard"
          className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150"
        >
          Dashboard
        </Link>

        <Link
          to="/create"
          className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150"
        >
          Create
        </Link>

        <Link
          to="/pending"
          className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150"
        >
          Pending
        </Link>

        <Link
          to="/community"
          className="text-lg mx-2 hover:border-b-[2px] py-1 hover:scale-95 ease-in-out duration-150"
        >
          Community
        </Link>
      </div>
      <div>
        <button className="text-red-500 text-sm title">Connect wallet</button>
      </div>
    </div>
  );
}

export default Navbar;
