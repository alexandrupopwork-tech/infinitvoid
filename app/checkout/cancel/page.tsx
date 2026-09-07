import Link from "next/link";
import type { Metadata } from "next";
import Logo from "@/components/Logo";

export const metadata: Metadata = {
  title: "Checkout Cancelled",
  robots: { index: false, follow: false },
};

export default function CheckoutCancelPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 bg-void px-6 py-24 text-center">
      <Logo className="h-12 w-12" sizes="48px" />
      <div className="flex max-w-md flex-col gap-4">
        <h1 className="font-display text-chrome text-4xl tracking-wide sm:text-5xl">Checkout cancelled.</h1>
        <p className="text-sm leading-relaxed text-ghost-dim sm:text-base">
          Nothing was charged. Your piece is still waiting, whenever you&rsquo;re ready.
        </p>
      </div>
      <Link
        href="/#collection"
        className="border border-ghost/30 bg-ghost px-7 py-4 font-display text-sm tracking-[0.15em] text-void transition-colors duration-300 hover:border-cyan"
      >
        Back to the piece
      </Link>
    </div>
  );
}
