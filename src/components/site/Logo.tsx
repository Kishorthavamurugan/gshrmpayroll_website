import React from "react";
import officialLogoImg from "@/assets/logo.png";

interface LogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg" | "xl";
  light?: boolean;
}

export function LogoIcon({
  className = "h-9 w-9 md:h-11 md:w-11",
}: {
  className?: string;
}) {
  return (
    <img
      src={officialLogoImg}
      alt="Great Supports Official Logo"
      className={`object-contain select-none shrink-0 ${className}`}
      style={{ aspectRatio: "1/1" }}
      loading="eager"
      decoding="async"
    />
  );
}

export function Logo({
  className = "",
  iconOnly = false,
  size = "md",
  light = false,
}: LogoProps) {
  // Desktop height around 40-50px (h-11 = 44px, h-12 = 48px)
  // Mobile height around 32-40px (h-8.5 = 34px, h-9 = 36px, h-10 = 40px)
  const sizeMap = {
    sm: { img: "h-8 w-8 md:h-9 md:w-9", text: "text-sm tracking-wider" },
    md: { img: "h-9 w-9 md:h-11 md:w-11", text: "text-base md:text-lg tracking-wider" },
    lg: { img: "h-11 w-11 md:h-14 md:w-14", text: "text-lg md:text-xl tracking-wider" },
    xl: { img: "h-14 w-14 md:h-20 md:w-20", text: "text-2xl md:text-3xl tracking-widest" },
  };

  const { img, text } = sizeMap[size];

  return (
    <div className={`inline-flex items-center gap-2.5 font-display font-black ${className}`}>
      <LogoIcon className={img} />
      {!iconOnly && (
        <span
          className={`uppercase font-extrabold select-none ${text} ${
            light ? "text-white" : "text-[#004d40] dark:text-[#38e2b6]"
          }`}
          style={{ letterSpacing: "0.08em" }}
        >
          GREAT SUPPORTS
        </span>
      )}
    </div>
  );
}

export default Logo;
