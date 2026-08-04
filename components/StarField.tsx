"use client";

import type { CSSProperties } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { useStarField, type AmbientStar } from "@/components/StarFieldProvider";

const TINT_COLOR: Record<AmbientStar["tint"], string> = {
  ghost: "#f2f2f4",
  cyan: "#7dfcff",
  violet: "#b98bff",
};

function AmbientStarDot({ star, boosted }: { star: AmbientStar; boosted: boolean }) {
  const color = TINT_COLOR[star.tint];

  return (
    <div
      className={`star ${boosted ? "star-boosted" : ""}`}
      style={
        {
          left: `${star.xPct}%`,
          top: `${star.yPct}%`,
          width: star.size,
          height: star.size,
          background: color,
          boxShadow: `0 0 ${star.size * 4}px ${star.size * 0.6}px ${color}55`,
          animationDuration: `${star.enterDuration}s, ${star.twinkleDuration}s`,
          animationDelay: `${star.enterDelay}s, ${star.enterDelay + star.enterDuration}s`,
          "--star-max-opacity": star.maxOpacity,
        } as CSSProperties
      }
    />
  );
}

export default function StarField() {
  const { ambientStars, launchedStars, pulses, boostedIds, celebrating } = useStarField();
  const reducedMotion = useReducedMotion();

  return (
    <div className="star-field-layer" aria-hidden>
      <motion.div
        className="absolute inset-0"
        animate={{ scale: celebrating && !reducedMotion ? 0.94 : 1 }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      >
      {ambientStars.map((star) => (
        <AmbientStarDot key={star.id} star={star} boosted={boostedIds.has(star.id)} />
      ))}

      {launchedStars.map((star) =>
        star.landed ? (
          <div
            key={star.id}
            className="star"
            style={
              {
                left: star.targetX,
                top: star.targetY,
                width: star.size,
                height: star.size,
                background: "#f2f2f4",
                boxShadow: `0 0 ${star.size * 5}px ${star.size}px rgba(125,252,255,0.5)`,
                animationDuration: "0.01s, 5s",
                animationDelay: "0s, 0s",
                "--star-max-opacity": 1,
              } as CSSProperties
            }
          />
        ) : (
          <motion.div
            key={star.id}
            className="absolute rounded-full"
            style={{
              background: "#f2f2f4",
              boxShadow: "0 0 24px 6px rgba(125,252,255,0.8), 0 0 60px 16px rgba(185,139,255,0.35)",
            }}
            initial={{ left: star.originX, top: star.originY, width: 3, height: 3, opacity: 0.3, scale: 0.4 }}
            animate={{
              left: star.targetX,
              top: star.targetY,
              width: star.size,
              height: star.size,
              opacity: 1,
              scale: [0.4, 1.4, 1],
            }}
            transition={
              reducedMotion
                ? { duration: 0.05 }
                : { duration: 1.15, ease: [0.16, 1, 0.3, 1], scale: { duration: 1.15, times: [0, 0.75, 1] } }
            }
          />
        )
      )}

      {pulses.map((pulse) => (
        <div
          key={pulse.id}
          className="pulse-ring"
          style={{ left: pulse.x, top: pulse.y, width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
        />
      ))}
      </motion.div>
    </div>
  );
}
