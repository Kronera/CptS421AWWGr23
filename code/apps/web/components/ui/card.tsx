import React from "react";
export function Card({ className="", ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`rounded-2xl border bg-white ${className}`} />;
}
