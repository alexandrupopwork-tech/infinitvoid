import Logo from "@/components/Logo";
import CountdownTimer from "@/components/CountdownTimer";
import WaitlistForm from "@/components/WaitlistForm";
import ThreeVoidBackground from "@/components/ThreeVoidBackground";
import { SITE_NAME, TAGLINE, TAGLINE_SUB } from "@/lib/config";

export default function Hero() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center gap-6 overflow-hidden px-6 pt-24 pb-16 text-center sm:gap-8">
      <ThreeVoidBackground />

      <Logo
        variant="wide"
        className="w-[88vw] max-w-xl sm:max-w-2xl lg:max-w-3xl"
        glitch
        priority
        sizes="(min-width: 1024px) 768px, (min-width: 640px) 640px, 88vw"
      />

      <div className="flex flex-col items-center gap-4">
        <h1 className="font-display text-xl tracking-[0.35em] text-ghost sm:text-2xl md:text-3xl">
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
