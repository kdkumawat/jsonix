"use client";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 24, className = "" }: LogoProps) {
  return (
    <span
      className={`inline-block shrink-0 text-primary ${className}`}
      style={{
        width: size,
        height: size,
        mask: "url(/logo.svg) no-repeat center",
        maskSize: "contain",
        WebkitMask: "url(/logo.svg) no-repeat center",
        WebkitMaskSize: "contain",
        backgroundColor: "currentColor",
      }}
      aria-hidden
    />
  );
}
