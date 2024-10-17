import React from "react";
import { Link } from "react-router-dom";

function ErrorPage() {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-benefits logo">404</h1>

          <p className="text-2xl font-bold tracking-tight text-benefits sm:text-4xl title">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500 title">We can't find that page.</p>

          <Link
            to="/"
            className="mt-6 inline-block rounded px-5 py-3 text-sm font-medium text-hero bg-benefits"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
}

export default ErrorPage;
