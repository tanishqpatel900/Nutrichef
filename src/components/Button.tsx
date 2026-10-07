import type { MouseEvent, ReactNode } from "react";
import { brand } from "../content";
import { openModal } from "../lib/modal";

type Props = {
  variant?: "primary" | "secondary";
  size?: "md" | "lg" | "menu";
  className?: string;
  children: ReactNode;
  icon?: boolean;
  href?: string;
  type?: "button" | "submit";
  disabled?: boolean;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
};

export function ArrowCircle() {
  return (
    <span className="btn-icon" aria-hidden="true">
      <svg viewBox="0 0 12 12" fill="none">
        <path
          d="M2 6h8M6.5 2.5 10 6 6.5 9.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  );
}

export function Button({
  variant = "primary",
  size = "md",
  className = "",
  children,
  icon = true,
  href,
  type = "button",
  disabled,
  onClick,
}: Props) {
  const cls = `btn btn-${variant} ${size === "lg" ? "btn-lg" : ""} ${size === "menu" ? "btn-menu" : ""} ${className}`;
  const content = (
    <>
      <span>{children}</span>
      {icon && <ArrowCircle />}
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        className={cls}
        onClick={(e) => {
          if (href === brand.ctaHref) {
            e.preventDefault();
            openModal();
          }
          onClick?.(e);
        }}
      >
        {content}
      </a>
    );
  }
  return (
    <button type={type} className={cls} disabled={disabled} onClick={onClick}>
      {content}
    </button>
  );
}
