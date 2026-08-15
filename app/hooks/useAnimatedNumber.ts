'use client';

import { useState, useEffect } from 'react';

export function useAnimatedNumber(value: number, trigger: boolean, duration = 2000) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    if (!trigger) {
      setDisplayValue(0);
      return;
    }

    let startTime: number;
    let animationFrame: number;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      setDisplayValue(Math.floor(easeOutQuart * value));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationFrame);
  }, [trigger, value, duration]);

  return displayValue;
}
