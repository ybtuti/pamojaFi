import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div>
      {/*
  Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.

  Plugins:
    - @tailwindcss/forms
*/}

      <footer className="bg-white">
        <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center gap-4 rounded-lg bg-benefits p-6 shadow-lg sm:flex-row sm:justify-between">
            <strong className="text-xl text-hero sm:text-xl logo">
              {" "}
              Join our growing community!
            </strong>

            <Link
              className="inline-flex items-center gap-2 rounded-full border border-white bg-white px-8 py-3 hover:bg-transparent hover:text-white focus:outline-none focus:ring active:bg-white/90 border-key"
              to="/dashboard"
            >
              <span className="text-sm font-medium text-hero logo">
                {" "}
                Let's Get Started{" "}
              </span>

              <svg
                className="size-5 text-hero rtl:rotate-180"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M17 8l4 4m0 0l-4 4m4-4H3"
                />
              </svg>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-benefits logo">About Us</p>
              <ul className="mt-8 space-y-4 text-sm title">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    Our Story
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    {" "}
                    Meet the Team{" "}
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-benefits logo ">
                Our Services
              </p>

              <ul className="mt-8 space-y-4 text-sm title">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#benefits"
                  >
                    Community Driven Governance
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#benefits"
                  >
                    {" "}
                    Project Proposal Funding
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="#benefits"
                  >
                    {" "}
                    Transparent Resource Allocation
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-benefits logo">
                Resources
              </p>

              <ul className="mt-8 space-y-4 text-sm title">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    {" "}
                    Whitepaper
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    Github
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    {" "}
                    Demo Video
                  </a>
                </li>
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://github.com/ybtuti/pamojaFi"
                  >
                    {" "}
                    Contracts
                  </a>
                </li>
              </ul>
            </div>

            <div className="text-center sm:text-left">
              <p className="text-lg font-medium text-benefits logo">
                Helpful Links
              </p>

              <ul className="mt-8 space-y-4 text-sm title">
                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://www.base.org/ecosystem"
                  >
                    {" "}
                    Base Eco-system
                  </a>
                </li>

                <li>
                  <a
                    className="text-gray-700 transition hover:text-gray-700/75"
                    href="https://worldcoin.org/blog/worldcoin/what-is-worldcoin-how-does-it-work"
                  >
                    {" "}
                    WorldCoin
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-16">
            <div className="mt-16 sm:flex sm:items-center sm:justify-between">
              <div className="flex justify-center text-teal-600 sm:justify-start">
                <h1 className="text-2xl font-extrabold text-benefits logo ">
                  pamojaFI.
                </h1>
              </div>

              <p className="mt-4 text-center text-sm text-gray-500 sm:mt-0 sm:text-right">
                Copyright &copy; 2024. All rights reserved.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
