import React from "react";
import { LazyLoadImage } from "react-lazy-load-image-component";

function CTA() {
  return (
    <div>
      <section>
        <div className="mx-auto max-w-screen-2xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="bg-blue-600 p-8 md:p-12 lg:px-16 lg:py-24">
              <div className="mx-auto max-w-xl text-center">
                <h2 className="text-2xl font-bold text-white md:text-3xl text-hero logo">
                  Become a part of our mission to revolutionize agriculture.
                </h2>

                <p className="hidden text-white/90 sm:mt-4 sm:block title text-hero">
                  Join us in creating a world where farmers are empowered to
                  make informed decisions. Stay informed about new projects and
                  funding opportunities.
                </p>

                <div className="mt-4 md:mt-8">
                  <a
                    href="#"
                    className="inline-block rounded border border-hero bg-white px-12 py-3 text-sm font-medium text-key"
                  >
                    Get Started Today
                  </a>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 md:grid-cols-1 lg:grid-cols-2">
              <LazyLoadImage
                alt=""
                src="https://scholarmedia.africa/wp-content/uploads/2023/07/A-happy-woman-holding-corn-cob-at-a-maize-farm.-PHOTO-Zafaran-Photography-Via-TechCrunch.jpg"
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />

              <LazyLoadImage
                alt=""
                src="https://img.freepik.com/premium-photo/happy-positive-african-farmer-his-banana-garden_521733-12829.jpg"
                className="h-40 w-full object-cover sm:h-56 md:h-full"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default CTA;
