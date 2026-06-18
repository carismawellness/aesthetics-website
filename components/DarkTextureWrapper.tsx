"use client";
import { useEffect } from "react";

/**
 * Adds the `dark-texture-page` class to <body> while mounted.
 * Triggers the full-page dark stone texture background defined in globals.css.
 * Used on: hair-regrowth, pico-laser, medical-weight-loss, and package pages.
 */
export default function DarkTextureWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    document.body.classList.add("dark-texture-page");
    return () => {
      document.body.classList.remove("dark-texture-page");
    };
  }, []);

  return <>{children}</>;
}
