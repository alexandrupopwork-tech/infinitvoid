import Link from "next/link";
import { InstagramIcon, TiktokIcon } from "@/components/icons";
import { BUSINESS, SITE_NAME, SOCIALS } from "@/lib/config";

const LEGAL_LINKS = [
  { href: "/privacy", label: "Privacy" },
  { href: "/terms", label: "Terms" },
  { href: "/cookies", label: "Cookies" },
  { href: "/refunds", label: "Refunds" },
] as const;

export default function Footer() {
  const year = new Date().getFullYear();

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
            className="rounded-sm transition-colors duration-300 hover:text-cyan focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            <InstagramIcon />
          </a>
          <a
            href={SOCIALS.tiktok}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="INFINITVOID on TikTok"
            className="rounded-sm transition-colors duration-300 hover:text-violet focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-violet focus-visible:ring-offset-2 focus-visible:ring-offset-void"
          >
            <TiktokIcon />
          </a>
        </div>
      </div>

      <div className="mx-auto mt-8 flex max-w-6xl flex-col items-center gap-3 border-t border-white/5 pt-6 text-center text-xs text-ghost-dim/60 sm:flex-row sm:justify-between sm:text-left">
        <p>
          © {year} {BUSINESS.legalName}, trading as {SITE_NAME}. {BUSINESS.country}.
        </p>
        <nav aria-label="Legal" className="flex items-center gap-4">
          {LEGAL_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="rounded-sm underline-offset-2 transition-colors duration-300 hover:text-ghost hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan focus-visible:ring-offset-2 focus-visible:ring-offset-void"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </footer>
  );
}
