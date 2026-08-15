export default function Academic() {
  const academicItems = [
    {
      title: 'Pós-Graduação em Arquitetura de Software',
      institution: 'Universidade de Tecnologia',
      period: '2022 - 2023',
      description: 'Especialização voltada para design de sistemas escaláveis, padrões arquiteturais, microsserviços e computação em nuvem.',
    },
    {
      title: 'Pós-Graduação em Gestão de Projetos',
      institution: 'Faculdade de Administração',
      period: '2020 - 2021',
      description: 'Foco em metodologias ágeis, liderança de equipes, gestão de produtos digitais e entrega de valor para stakeholders.',
    },
    {
      title: 'Bacharelado em Ciência da Computação',
      institution: 'Universidade Federal',
      period: '2014 - 2018',
      description: 'Formação sólida em algoritmos, estruturas de dados, engenharia de software, banco de dados e redes de computadores.',
    },
    {
      title: 'Técnico em Informática',
      institution: 'Instituto Técnico Estadual',
      period: '2011 - 2013',
      description: 'Primeiro contato com lógica de programação, montagem e manutenção de computadores, redes e desenvolvimento web básico.',
    },
  ];

  return (
    <section id="academico" className="py-20 scroll-mt-24">
      <h2 className="text-3xl font-bold text-text-primary mb-8 flex items-center gap-4">
        <span className="w-12 h-px bg-primary-container" />
        Acadêmico
      </h2>

      <div className="relative ml-6 md:ml-8">
        <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-border-subtle" />

        {academicItems.map((item, index) => (
          <div key={index} className="relative pl-10 pb-10 last:pb-0">
            <div
              className="absolute left-0 -top-1 w-4 h-4 rounded-full border-4 border-bg-deep -translate-x-1/2 z-10 bg-outline"
            />

            <div className="bg-surface-container p-5 rounded-lg border border-border-subtle hover:border-primary-container transition-all duration-300 group">
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-container transition-colors">
                    {item.title} <span className="text-primary-container/50 mx-1 font-light">|</span> <span className="text-primary-container">{item.institution}</span>
                  </h3>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mt-1 md:mt-0">
                  {item.period}
                </span>
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
