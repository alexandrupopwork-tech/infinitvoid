import type { CSSProperties } from "react";
import Image from "next/image";
import { IMAGES, SITE_NAME } from "@/lib/config";

type LogoProps = {
  className?: string;
  variant?: "wide" | "mark";
  glitch?: boolean;
  priority?: boolean;
  sizes?: string;
};

const maskStyle: CSSProperties = {
  WebkitMaskImage: `url(${IMAGES.logo})`,
  maskImage: `url(${IMAGES.logo})`,
  WebkitMaskSize: "contain",
  maskSize: "contain",
  WebkitMaskRepeat: "no-repeat",
  maskRepeat: "no-repeat",
  WebkitMaskPosition: "center",
  maskPosition: "center",
};

export default function Logo({
  className = "",
  variant = "mark",
  glitch = false,
  priority = false,
  sizes,
}: LogoProps) {
  const aspectClass = variant === "wide" ? "aspect-[1652/591]" : "aspect-square";

  return (
    <div className={`relative ${aspectClass} ${className} ${glitch ? "logo-breathe" : ""}`}>
      <Image
        src={IMAGES.logo}
        alt={`${SITE_NAME} logo`}
        fill
        priority={priority}
        sizes={sizes ?? "160px"}
        className={`object-contain ${glitch ? "logo-glitch-base" : ""}`}
      />

      {glitch && (
        <>
          <div
            aria-hidden
            className="logo-glitch-cyan pointer-events-none absolute inset-0"
            style={{ ...maskStyle, background: "#7dfcff", mixBlendMode: "screen" }}
          />
          <div
            aria-hidden
            className="logo-glitch-violet pointer-events-none absolute inset-0"
            style={{ ...maskStyle, background: "#b98bff", mixBlendMode: "screen" }}
          />
        </>
      )}
    </div>
  );
}
