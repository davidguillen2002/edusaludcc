import * as React from "react";
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("container mx-auto max-w-6xl", className)}>{children}</div>
  );
}
