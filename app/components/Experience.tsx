'use client';

import { useExperience } from '../hooks/useExperience';

export default function Experience() {
  const { companies } = useExperience();

  return (
    <section id="experiencia" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
        <span className="w-12 h-px bg-primary-container" />
        Experiência
      </h2>

      <div className="relative ml-6 md:ml-8">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 -translate-x-1/2 bg-primary/30" />

        {companies.map((company, index) => (
          <div key={index} className="relative pl-10 pb-12 last:pb-0">
            <div
              className={`absolute left-0 -translate-x-1/2 rounded-full z-10 flex items-center justify-center ${
                company.isActive
                  ? '-top-3 w-10 h-10 bg-primary/20'
                  : 'top-0 w-5 h-5 bg-surface-elevated border-2 border-primary/50'
              }`}
            >
              {company.isActive && (
                <>
                  <span className="absolute w-8 h-8 rounded-full bg-primary/30 animate-ping" />
                  <span className="w-4 h-4 rounded-full bg-primary relative" />
                </>
              )}
            </div>

            <div className="bg-surface-container rounded-lg border border-border-subtle hover:border-primary-container transition-all duration-300 group overflow-hidden">
              <div className="p-5 border-b border-border-subtle bg-surface-container/50">
                <h3 className="text-xl font-bold text-primary-container group-hover:text-primary transition-colors">
                  {company.company}
                </h3>
              </div>

              <div className="p-5 space-y-6">
                {company.roles.map((role, roleIndex) => (
                  <div key={roleIndex} className={roleIndex !== company.roles.length - 1 ? 'pb-6 border-b border-border-subtle/50' : ''}>
                    <div className="flex flex-col md:flex-row md:items-center justify-between mb-2 gap-2">
                      <h4 className="text-base font-semibold text-text-primary">
                        {role.title}
                      </h4>
                      <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                        {role.period}
                      </span>
                    </div>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {role.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
