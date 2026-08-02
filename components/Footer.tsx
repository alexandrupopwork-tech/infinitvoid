import { InstagramIcon, TiktokIcon } from "@/components/icons";
import { SITE_NAME, SOCIALS } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-10 sm:px-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-center sm:flex-row sm:text-left">
        <p className="font-display text-sm tracking-[0.2em] text-ghost-dim">
          {SITE_NAME} <span className="text-ghost-dim/60">— est. 2026</span>
        </p>

        <div className="flex items-center gap-5 text-ghost-dim">
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
      </div>
    </footer>
  );
}
