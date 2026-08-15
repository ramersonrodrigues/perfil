'use client';

import { useAcademic } from '../hooks/useAcademic';

export default function Academic() {
  const { academicItems } = useAcademic();

  return (
    <section id="academico" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
        <span className="w-12 h-px bg-primary-container" />
        Acadêmico
      </h2>

      <div className="relative ml-6 md:ml-8">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-primary/30" />

        {academicItems.map((item, index) => (
          <div key={index} className="relative pl-10 pb-10 last:pb-0">
            <div
              className="absolute left-0 -translate-x-1/2 top-0 w-5 h-5 rounded-full z-10 bg-surface-elevated border-2 border-primary/50"
            />

            <div className="bg-surface-container p-5 rounded-lg border border-border-subtle hover:border-primary-container transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-start justify-between mb-3 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-container transition-colors">
                    {item.title} <span className="text-primary-container/50 mx-1 font-light">|</span> <span className="text-primary-container">{item.institution}</span>
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <span className="inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider bg-surface-container text-primary border border-primary/40 shadow-sm">
                    {item.level}
                  </span>
                  <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                    {item.period}
                  </span>
                </div>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
