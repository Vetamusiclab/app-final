import * as React from "react";

export function Card({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white shadow ${className || ""}`}
      {...props}
    >
      {children}
    </div>
  );
}

export function CardContent({ children, className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={`p-4 ${className || ""}`} {...props}>
      {children}
    </div>
  );
}
