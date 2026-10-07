import type { ReactNode } from "react";

export function Eyebrow({
  children,
  variant = "default",
  className = "",
  as: Tag = "p",
}: {
  children: ReactNode;
  variant?: "default" | "theme";
  className?: string;
  as?: "p" | "span" | "div";
}) {
  return <Tag className={`eyebrow ${variant === "theme" ? "eyebrow-theme" : ""} ${className}`}>{children}</Tag>;
}
