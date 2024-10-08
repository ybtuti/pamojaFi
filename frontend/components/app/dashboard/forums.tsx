import React from "react";
import { Skeleton } from "../../ui/skeleton";

function Forums() {
  return (
    <div className="p-2 md:p-10 md:rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 h-screen bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full backdrop-blur-xl">
      <h1 className="font-semibold logo text-lg py-2">Forums</h1>
      <p className="title">Community forums will be launched soon!</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {[...new Array(8)].map((i) => (
          <div className="flex flex-col space-y-3">
            <Skeleton className="h-[125px] w-[250px] rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
      <p className="title mt-4">
        Engage with the community on the pamojaFI forums
      </p>
    </div>
  );
}

export default Forums;
