"use client";

import NextLink from "next/link";
import { usePathname } from "next/navigation";

export const Link = ({ to, href, children, ...props }) => {
  const destination = href ?? to;

  // Some places used react-router Link as a button (no `to`).
  if (!destination) {
    return (
      <button type="button" {...props}>
        {children}
      </button>
    );
  }

  return (
    <NextLink href={destination} {...props}>
      {children}
    </NextLink>
  );
};

export const NavLink = ({ to, className, children, ...props }) => {
  const pathname = usePathname();
  const isActive = pathname === to;

  // `className` in react-router can be a function; we support both.
  const resolvedClassName =
    typeof className === "function" ? className({ isActive }) : className;

  return (
    <NextLink href={to} className={resolvedClassName} {...props}>
      {children}
    </NextLink>
  );
};
