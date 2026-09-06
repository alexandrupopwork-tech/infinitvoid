import type { ReactNode } from "react";
import Link from "next/link";
import Logo from "@/components/Logo";

export default function LegalPage({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen bg-void text-ghost">
      <header className="flex items-center justify-between px-5 py-4 sm:px-8 sm:py-6">
        <Link href="/" aria-label="INFINITVOID home" className="block">
          <Logo className="h-9 w-9 sm:h-10 sm:w-10" sizes="40px" />
        </Link>
        <Link
          href="/"
          className="text-xs tracking-[0.2em] text-ghost-dim uppercase underline-offset-4 hover:text-ghost hover:underline"
        >
          Back to site
        </Link>
      </header>

      <main className="mx-auto max-w-2xl px-6 pt-8 pb-24 sm:px-8">
        <h1 className="font-display text-3xl tracking-wide text-ghost sm:text-4xl">{title}</h1>
        <p className="mt-2 text-xs tracking-[0.15em] text-ghost-dim uppercase">
          Last updated {updated}
        </p>

        <div className="legal-prose mt-10 flex flex-col gap-6 text-sm leading-relaxed text-ghost-dim sm:text-base">
          {children}
        </div>
      </main>
    </div>
  );
}
