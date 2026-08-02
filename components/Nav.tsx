import Link from "next/link";
import Logo from "@/components/Logo";
import { InstagramIcon, TiktokIcon } from "@/components/icons";
import { SOCIALS } from "@/lib/config";

export default function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <nav className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <Link href="/" aria-label="INFINITVOID home" className="block">
          <Logo className="h-9 w-9 sm:h-10 sm:w-10" sizes="40px" />
        </Link>

        <div className="flex items-center gap-4 text-ghost-dim sm:gap-5">
          <a
            href={SOCIALS.instagram}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="INFINITVOID on Instagram"
            className="transition-colors duration-300 hover:text-cyan"
          >
            <InstagramIcon />
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="INFINITVOID on TikTok"
            className="transition-colors duration-300 hover:text-violet"
          >
            <TiktokIcon />
          </a>
        </div>
      </nav>
    </header>
  );
}
