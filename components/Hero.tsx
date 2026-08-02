import Logo from "@/components/Logo";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import ThreeVoidBackground from "@/components/ThreeVoidBackground";
import { SITE_NAME, TAGLINE, TAGLINE_SUB } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-8 overflow-hidden px-6 pt-28 pb-16 text-center sm:gap-10">
      <ThreeVoidBackground />

      <Logo className="h-24 w-24 sm:h-32 sm:w-32" glitch priority sizes="(min-width: 640px) 128px, 96px" />

      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-5xl leading-none tracking-[0.04em] text-ghost sm:text-7xl md:text-8xl">
          {SITE_NAME}
        </h1>
        <p className="max-w-md text-sm text-ghost-dim sm:text-base">
          {TAGLINE}
          <br className="hidden sm:block" /> {TAGLINE_SUB}
        </p>
      </div>

      <CountdownTimer />

      <WaitlistForm />
    </section>
  );
}
