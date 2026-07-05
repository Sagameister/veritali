"use client";

import { useEffect, useState, useRef } from "react";
import { useMotionValue, animate, useInView } from "framer-motion";

export default function Counter({ value }: { value: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-15% 0px" });

  // Extract number and suffix/prefix from the value string (e.g. "1.5%" -> number 1.5, suffix "%")
  const numberMatch = value.match(/[\d.]+/);
  const numberVal = numberMatch ? parseFloat(numberMatch[0]) : 0;
  const isDecimal = numberMatch ? numberMatch[0].includes(".") : false;

  const numberIndex = numberMatch && numberMatch.index !== undefined ? numberMatch.index : 0;
  const prefix = value.substring(0, numberIndex);
  const suffix = value.substring(numberIndex + (numberMatch ? numberMatch[0].length : 0));

  const motionValue = useMotionValue(0);
  const [displayValue, setDisplayValue] = useState(() => {
    // Initial static render state
    return prefix + "0" + suffix;
  });

  useEffect(() => {
    if (isInView) {
      const controls = animate(motionValue, numberVal, {
        duration: 2.0,
        ease: [0.22, 1, 0.36, 1], // Soft deceleration curve (EASE)
        onUpdate: (latest) => {
          let formattedValue: string | number = latest;
          if (isDecimal) {
            formattedValue = latest.toFixed(1);
          } else {
            formattedValue = Math.round(latest);
          }
          setDisplayValue(prefix + formattedValue + suffix);
        },
      });
      return () => controls.stop();
    }
  }, [isInView, numberVal, isDecimal, prefix, suffix, motionValue]);

  return <span ref={ref}>{displayValue}</span>;
}
