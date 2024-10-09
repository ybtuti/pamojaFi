import React from "react";
import { cn } from "../lib/utils";

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-[#8C92AC]", className)}
      {...props}
    />
  );
}

export { Skeleton };
