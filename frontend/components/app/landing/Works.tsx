import { LazyLoadImage } from "react-lazy-load-image-component";

import React from "react";
import { Timeline } from "../../../components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "Submit Proposals",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal mb-8 title">
            Farmers detail their project needs. They can include images, videos,
            and other media to help the community understand their proposal.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LazyLoadImage
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcMfLokXUWtwkYA4TfWVFmAkj0LxQtKZNNGg&s"
              alt="startup template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Community Voting",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal title">
            All registered farmers and stakeholders can vote on the proposal
            created using a hybrid voting system consisting of quadratic voting
            and token-weighted voting.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal mb-8 title">
            The proposal with the most votes will be selected for funding. And
            will go on to be listed on the dashboard for further funding.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LazyLoadImage
              src="https://www.wilsonvillelibrary.org/sites/default/files/styles/gallery500/public/imageattachments/lib/page/124711/voting_people_-_freepik_rawpixel.jpg?itok=TyQ2aTaR"
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Smart Contracts Execute",
      content: (
        <div>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal title">
            Once the proposal is selected, the smart contract will automatically
            execute the funding. The funds will be transferred to the farmer's
            wallet.
          </p>
          <p className="text-neutral-800 dark:text-neutral-200 font-normal mb-8 title">
            The farmer will receive the funds on the Base network which they
            used to connect to the platform. And are obligated to use the funds
            for the intended purpose and share achieved milestone along the way.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <LazyLoadImage
              src="https://media.istockphoto.com/id/1279130654/vector/social-support-concept.jpg?s=612x612&w=0&k=20&c=4ijYE0QV2SB9VEBpYjj0Itehg9rWyh5v84eTrjGaunw="
              alt="hero template"
              width={500}
              height={500}
              className="rounded-lg object-cover h-20 md:h-44 lg:h-60 w-full shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset]"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="w-full">
      <Timeline data={data} />
    </div>
  );
}
