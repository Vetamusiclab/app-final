// components/ui/Button.tsx
import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & { variant?: "primary" | "ghost" };
export default function Button({ className, variant = "primary", ...props }: Props) {
  return <button {...props} className={clsx("btn", variant === "primary" ? "btn-primary" : "btn-ghost", className)} />;
}
