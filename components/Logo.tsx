import Image from "next/image";
import { IMAGES, SITE_NAME } from "@/lib/config";

type LogoProps = {
  className?: string;
  glitch?: boolean;
  priority?: boolean;
  sizes?: string;
};

export default function Logo({ className = "", glitch = false, priority = false, sizes }: LogoProps) {
  return (
    <div className={`relative aspect-square ${className}`}>
      <Image
        src={IMAGES.logo}
        alt={`${SITE_NAME} logo`}
        fill
        priority={priority}
        sizes={sizes ?? "160px"}
        className={`object-contain ${glitch ? "logo-glitch" : ""}`}
        style={{ animationDelay: glitch ? "-1.4s" : undefined }}
      />
    </div>
  );
}
