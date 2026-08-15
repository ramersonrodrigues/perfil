'use client';

import { useInView } from '../hooks/useInView';
import { useAnimatedNumber } from '../hooks/useAnimatedNumber';

import { stats } from '../data/stats';

function AnimatedNumber({ value, suffix, trigger }: { value: number; suffix: string; trigger: boolean }) {
  const displayValue = useAnimatedNumber(value, trigger);

  return (
    <span>
      {displayValue}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const [ref, isVisible] = useInView<HTMLElement>(0.3);

  return (
    <section ref={ref} id="stats" className="py-12 border-y border-border-subtle mb-20 scroll-mt-24">
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
