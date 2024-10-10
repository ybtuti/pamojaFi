import React from "react";
import { Skeleton } from "../../ui/skeleton";

function Resources() {
  return (
    <div className="p-2 md:p-10 md:rounded-tl-2xl border border-neutral-200 dark:border-neutral-700 h-screen bg-white dark:bg-neutral-900 flex flex-col gap-2 flex-1 w-full backdrop-blur-xl">
      <h1 className="font-semibold logo text-lg py-2">Resource Center</h1>
      <p className="title">The Resource center will be launched soon!</p>
      <div className="w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-2">
        {[...new Array(8)].map((i) => (
          <div className="flex flex-col space-y-3 items-center justify-center mx-1 my-4">
            <Skeleton className="h-[200px] md:w-[250px] w-full rounded-xl" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-[250px]" />
              <Skeleton className="h-4 w-[200px]" />
            </div>
          </div>
        ))}
      </div>
      <p className="title mt-4">
        Access all the resources you need to start your farming journey on
        pamojaFI
      </p>
    </div>
  );
}

export default Resources;
