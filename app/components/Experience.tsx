export default function Experience() {
  const experiences = [
    {
      title: 'Engenheiro de Software Sênior',
      company: 'TechCorp',
      period: 'Jan 2021 - Presente',
      isActive: true,
      responsibilities: [
        'Escrever código moderno, performático e de fácil manutenção para uma gama diversificada de projetos internos e de clientes',
        'Trabalhar com uma variedade de linguagens, plataformas, frameworks e sistemas de gerenciamento de conteúdo diferentes',
        'Comunicar-se com equipes multidisciplinares de engenheiros, designers, produtores e clientes diariamente',
      ],
    },
    {
      title: 'Engenheiro de Software',
      company: 'StartupInc',
      period: 'Jul 2018 - Dez 2020',
      isActive: false,
      responsibilities: [
        'Desenvolveu e enviou aplicativos web altamente interativos',
        'Arquitetou e implementou o front-end do produto principal',
        'Orientou desenvolvedores juniores e conduziu revisões de código',
      ],
    },
    {
      title: 'Desenvolvedor Web Júnior',
      company: 'AgencyX',
      period: 'Mar 2016 - Jun 2018',
      isActive: false,
      responsibilities: [
        'Construiu temas e plugins WordPress personalizados para clientes',
        'Garantiu compatibilidade e capacidade de resposta entre navegadores',
        'Colaborou com designers para dar vida a modelos',
      ],
    },
  ];

  return (
    <section id="experiencia" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
        <span className="w-12 h-px bg-primary-container" />
        Experiência
      </h2>
      
      <div className="relative ml-6 md:ml-8">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border-subtle" />
        
        {experiences.map((exp, index) => (
          <div key={index} className="relative pl-10 pb-10 last:pb-0">
            <div
              className={`absolute left-0 -top-1 rounded-full border-4 border-bg-deep -translate-x-1/2 z-10 flex items-center justify-center ${
                exp.isActive
                  ? 'w-8 h-8 bg-bg-deep animate-pulse-ring'
                  : 'w-4 h-4 bg-outline'
              }`}
            >
              {exp.isActive && (
                <>
                  <span className="absolute w-7 h-7 rounded-full border border-primary/60" />
                  <span className="w-3 h-3 rounded-full bg-primary" />
                </>
              )}
            </div>
            
            <div className="bg-surface-container p-5 rounded-lg border border-border-subtle hover:border-primary-container transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-container transition-colors">
                    {exp.title} <span className="text-primary-container/50 mx-1 font-light">|</span> <span className="text-primary-container">{exp.company}</span>
                  </h3>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mt-1 md:mt-0">
                  {exp.period}
                </span>
              </div>
              
              <ul className="list-disc list-inside space-y-2 text-text-secondary text-sm">
                {exp.responsibilities.map((resp, respIndex) => (
                  <li key={respIndex}>{resp}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
