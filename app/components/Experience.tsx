export default function Experience() {
  const companies = [
    {
      company: 'SEDUC PI',
      isActive: true,
      roles: [
        {
          title: 'Professor',
          period: '2025 - Presente',
          description: 'Professor do Curso Técnico em Desenvolvimento de Sistemas integrado ao Ensino Médio. Ministra disciplinas técnicas, orienta projetos práticos e acompanha estudantes na construção de sistemas.',
        },
      ],
    },
    {
      company: 'Empreender',
      isActive: true,
      roles: [
        {
          title: 'Engenheiro de Software',
          period: '2025 - Presente',
          description: 'Liderança técnica na definição de arquiteturas escaláveis, padrões de código, pipelines de integração contínua e revisões técnicas. Atuação estratégica em projetos de alto impacto.',
        },
        {
          title: 'Programador Full Stack Pleno',
          period: '2023 - 2025',
          description: 'Construção e manutenção de aplicações completas, do frontend ao backend. Desenvolvimento de APIs, integração de serviços, otimização de banco de dados e entrega com qualidade.',
        },
        {
          title: 'Programador Frontend Júnior',
          period: '2021 - 2023',
          description: 'Desenvolvimento de interfaces responsivas, implementação de componentes e apoio na evolução de produtos digitais. Consolidação em boas práticas e versionamento.',
        },
      ],
    },
    {
      company: 'Stefanini',
      isActive: false,
      roles: [
        {
          title: 'Técnico de Suporte Remoto',
          period: '2017 - 2018',
          description: 'Atendimento remoto a usuários corporativos, diagnóstico de incidentes de infraestrutura, resolução de chamados críticos e manutenção de estações de trabalho.',
        },
      ],
    },
    {
      company: 'Central IT',
      isActive: false,
      roles: [
        {
          title: 'Supervisor de Suporte',
          period: '2016 - 2017',
          description: 'Gestão da equipe de suporte, distribuição e priorização de chamados, acompanhamento de indicadores, treinamento de novos analistas e garantia da qualidade do atendimento.',
        },
        {
          title: 'Técnico de Suporte Remoto',
          period: '2015 - 2016',
          description: 'Suporte técnico remoto, instalação e configuração de softwares, resolução de problemas de acesso e redes, atendimento via telefone e acesso remoto.',
        },
        {
          title: 'Suporte Remoto',
          period: '2014 - 2015',
          description: 'Primeira experiência na área de TI com atendimento ao usuário, abertura e acompanhamento de chamados, orientações de primeiro nível e resolução ágil de incidentes.',
        },
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

        {companies.map((company, index) => (
          <div key={index} className="relative pl-10 pb-12 last:pb-0">
            <div
              className={`absolute left-0 -top-1 rounded-full border-4 border-bg-deep -translate-x-1/2 z-10 flex items-center justify-center ${
                company.isActive
                  ? 'w-8 h-8 bg-bg-deep'
                  : 'w-4 h-4 bg-outline'
              }`}
            >
              {company.isActive && (
                <>
                  <span className="absolute w-7 h-7 rounded-full border border-primary/60" />
                  <span className="w-3 h-3 rounded-full bg-primary" />
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
