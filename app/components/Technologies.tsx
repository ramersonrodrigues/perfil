'use client';

import { useTechnologies } from '../hooks/useTechnologies';

export default function Technologies() {
  const { technologies } = useTechnologies();

  return (
    <section id="tecnologias" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
        <span className="w-12 h-px bg-primary-container" />
        Tecnologias
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
        {technologies.map((tech, index) => (
          <div
            key={index}
            className="group bg-surface-container p-4 rounded-lg border border-border-subtle hover:border-primary-container transition-all duration-300 hover:bg-surface-elevated hover:-translate-y-0.5"
          >
            <div className="w-9 h-9 rounded-md bg-primary-container/10 border border-primary-container/20 flex items-center justify-center mb-3 group-hover:bg-primary-container group-hover:border-primary-container transition-colors duration-300">
              <span className="material-symbols-outlined text-lg text-primary-container group-hover:text-text-primary transition-colors duration-300">
                {tech.icon}
              </span>
            </div>
            <h3 className="text-base font-semibold text-text-primary group-hover:text-primary transition-colors duration-300">
              {tech.name}
            </h3>
          </div>
        ))}
      </div>
    </section>
  );
}
