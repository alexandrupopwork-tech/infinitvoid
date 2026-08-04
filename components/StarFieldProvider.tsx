"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

type Tint = "ghost" | "cyan" | "violet";

export type AmbientStar = {
  id: string;
  xPct: number;
  yPct: number;
  size: number;
  enterDuration: number;
  enterDelay: number;
  twinkleDuration: number;
  maxOpacity: number;
  tint: Tint;
};

export type LaunchedStar = {
  id: string;
  originX: number;
  originY: number;
  targetX: number;
  targetY: number;
  size: number;
  landed: boolean;
};

export type Pulse = { id: string; x: number; y: number };

type StarFieldContextValue = {
  ambientStars: AmbientStar[];
  launchedStars: LaunchedStar[];
  pulses: Pulse[];
  boostedIds: Set<string>;
  justJoined: boolean;
  celebrating: boolean;
  launchStar: (origin: { x: number; y: number }) => void;
};

const StarFieldContext = createContext<StarFieldContextValue | null>(null);

const AMBIENT_CAP = 130;
const INITIAL_BATCH = 26;
const BOOST_RADIUS = 190;
const BOOST_DURATION = 900;

function pickTint(): Tint {
  const roll = Math.random();
  if (roll < 0.06) return "cyan";
  if (roll < 0.12) return "violet";
  return "ghost";
}

function makeAmbientStar(id: string, staggered: boolean): AmbientStar {
  return {
    id,
    xPct: 3 + Math.random() * 94,
    yPct: 4 + Math.random() * 90,
    size: 1.3 + Math.random() * 2,
    enterDuration: 1 + Math.random() * 0.8,
    enterDelay: staggered ? Math.random() * 2.2 : 0,
    twinkleDuration: 3 + Math.random() * 4.5,
    maxOpacity: 0.55 + Math.random() * 0.45,
    tint: pickTint(),
  };
}

export function StarFieldProvider({ children }: { children: ReactNode }) {
  const [ambientStars, setAmbientStars] = useState<AmbientStar[]>([]);
  const [launchedStars, setLaunchedStars] = useState<LaunchedStar[]>([]);
  const [pulses, setPulses] = useState<Pulse[]>([]);
  const [boostedIds, setBoostedIds] = useState<Set<string>>(new Set());
  const [justJoined, setJustJoined] = useState(false);
  const [celebrating, setCelebrating] = useState(false);
  const counterRef = useRef(0);
  const ambientStarsRef = useRef<AmbientStar[]>([]);

  useEffect(() => {
    ambientStarsRef.current = ambientStars;
  }, [ambientStars]);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const initial = Array.from({ length: INITIAL_BATCH }, () => {
      counterRef.current += 1;
      return makeAmbientStar(`s${counterRef.current}`, !reduced);
    });
    setAmbientStars(initial);

    if (reduced) return;

    const interval = setInterval(
      () => {
        setAmbientStars((prev) => {
          if (prev.length >= AMBIENT_CAP) return prev;
          counterRef.current += 1;
          return [...prev, makeAmbientStar(`s${counterRef.current}`, false)];
        });
      },
      2600 + Math.random() * 2000
    );

    return () => clearInterval(interval);
  }, []);

  const launchStar = useCallback((origin: { x: number; y: number }) => {
    counterRef.current += 1;
    const id = `launch${counterRef.current}`;

    const targetX = window.innerWidth * (0.12 + Math.random() * 0.76);
    const targetY = window.innerHeight * (0.1 + Math.random() * 0.55);

    setLaunchedStars((prev) => [
      ...prev,
      { id, originX: origin.x, originY: origin.y, targetX, targetY, size: 3.4, landed: false },
    ]);
    setJustJoined(true);
    setCelebrating(true);

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const flightMs = reduced ? 50 : 1150;

    window.setTimeout(() => {
      setLaunchedStars((prev) => prev.map((s) => (s.id === id ? { ...s, landed: true } : s)));

      const pulseId = `pulse${counterRef.current}`;
      setPulses((prev) => [...prev, { id: pulseId, x: targetX, y: targetY }]);
      window.setTimeout(() => {
        setPulses((prev) => prev.filter((p) => p.id !== pulseId));
      }, 950);

      const nearby = new Set(
        ambientStarsRef.current
          .filter((star) => {
            const sx = (star.xPct / 100) * window.innerWidth;
            const sy = (star.yPct / 100) * window.innerHeight;
            const dist = Math.hypot(sx - targetX, sy - targetY);
            return dist < BOOST_RADIUS;
          })
          .map((star) => star.id)
      );
      setBoostedIds(nearby);
      window.setTimeout(() => setBoostedIds(new Set()), BOOST_DURATION);
      window.setTimeout(() => setCelebrating(false), BOOST_DURATION);
    }, flightMs);
  }, []);

  return (
    <StarFieldContext.Provider
      value={{
        ambientStars,
        launchedStars,
        pulses,
        boostedIds,
        justJoined,
        celebrating,
        launchStar,
      }}
    >
      {children}
    </StarFieldContext.Provider>
  );
}

export function useStarField() {
  const ctx = useContext(StarFieldContext);
  if (!ctx) throw new Error("useStarField must be used within a StarFieldProvider");
  return ctx;
}
