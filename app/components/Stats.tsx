'use client';

import { useState, useEffect, useRef } from 'react';

function AnimatedNumber({ value, suffix, duration = 2000, trigger }: { value: number; suffix: string; duration?: number; trigger: boolean }) {
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

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const stats = [
    { number: 10, suffix: '+', label: 'Anos de Experiência' },
    { number: 20, suffix: '+', label: 'Projetos Desenvolvidos' },
    { number: 7, suffix: '+', label: 'Anos como Programador' },
    { number: 2, suffix: '+', label: 'Anos como Professor' },
  ];

  return (
    <section ref={sectionRef} id="stats" className="py-12 border-y border-border-subtle mb-20 scroll-mt-24">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-primary-container mb-2 tabular-nums">
              <AnimatedNumber value={stat.number} suffix={stat.suffix} trigger={isVisible} />
            </h2>
            <p className="text-xs font-semibold text-text-secondary uppercase tracking-wider">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
