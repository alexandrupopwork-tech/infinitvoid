"use client";

import { forwardRef, useRef, type ButtonHTMLAttributes, type MouseEvent } from "react";
import { motion, useMotionValue, useReducedMotion, useSpring } from "framer-motion";
import { cn } from "@/lib/utils";

type MagneticButtonProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onAnimationStart" | "onAnimationEnd" | "onDrag" | "onDragStart" | "onDragEnd"
> & {
  strength?: number;
};

const MagneticButton = forwardRef<HTMLButtonElement, MagneticButtonProps>(
  ({ children, className, strength = 0.35, ...props }, forwardedRef) => {
    const innerRef = useRef<HTMLButtonElement>(null);
    const reducedMotion = useReducedMotion();

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const springX = useSpring(x, { stiffness: 200, damping: 18, mass: 0.4 });
    const springY = useSpring(y, { stiffness: 200, damping: 18, mass: 0.4 });

    function handleMouseMove(event: MouseEvent<HTMLButtonElement>) {
      if (reducedMotion) return;
      const rect = innerRef.current?.getBoundingClientRect();
      if (!rect) return;
      const relX = event.clientX - (rect.left + rect.width / 2);
      const relY = event.clientY - (rect.top + rect.height / 2);
      x.set(relX * strength);
      y.set(relY * strength);
    }

    function handleMouseLeave() {
      x.set(0);
      y.set(0);
    }

    return (
      <motion.button
        ref={(node) => {
          innerRef.current = node;
          if (typeof forwardedRef === "function") forwardedRef(node);
          else if (forwardedRef) forwardedRef.current = node;
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ x: springX, y: springY }}
        className={cn(className)}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

MagneticButton.displayName = "MagneticButton";

export default MagneticButton;
