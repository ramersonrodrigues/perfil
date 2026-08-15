export default function Experience() {
  const experiences = [
    {
      title: 'Professor',
      company: 'SEDUC PI',
      period: '2018 - Presente',
      isActive: true,
      description: 'Professor do Curso Técnico em Desenvolvimento de Sistemas integrado ao Ensino Médio na rede estadual de ensino. Responsável por ministrar disciplinas técnicas, orientar projetos práticos, preparar estudantes para o mercado de trabalho e acompanhar a construção de sistemas durante a formação.',
    },
    {
      title: 'Engenheiro de Software',
      company: 'Empreender',
      period: '2023 - Presente',
      isActive: false,
      description: 'Liderança técnica na definição de arquiteturas escaláveis, padrões de código, pipelines de integração contínua e revisões técnicas. Atuação estratégica em projetos de alto impacto, conectando soluções técnicas às necessidades do negócio.',
    },
    {
      title: 'Programador Full Stack Pleno',
      company: 'Empreender',
      period: '2020 - 2023',
      isActive: false,
      description: 'Construção e manutenção de aplicações completas, do frontend ao backend. Desenvolvimento de APIs, integração de serviços, otimização de banco de dados e entrega de funcionalidades com qualidade e performance.',
    },
    {
      title: 'Programador Frontend Júnior',
      company: 'Empreender',
      period: '2018 - 2020',
      isActive: false,
      description: 'Desenvolvimento de interfaces responsivas, implementação de componentes e apoio na evolução de produtos digitais. Fase de consolidação em boas práticas, versionamento de código e trabalho colaborativo com squads.',
    },
    {
      title: 'Supervisor de Suporte',
      company: 'Central IT',
      period: '2016 - 2017',
      isActive: false,
      description: 'Gestão da equipe de suporte, distribuição e priorização de chamados, acompanhamento de indicadores de atendimento, treinamento de novos analistas e garantia da qualidade do suporte ao cliente.',
    },
    {
      title: 'Técnico de Suporte Remoto',
      company: 'Central IT',
      period: '2015 - 2016',
      isActive: false,
      description: 'Suporte técnico remoto, instalação e configuração de softwares, resolução de problemas de acesso e redes, atendimento via telefone e acesso remoto, contribuindo para a estabilidade do ambiente.',
    },
    {
      title: 'Suporte Remoto',
      company: 'Central IT',
      period: '2014 - 2015',
      isActive: false,
      description: 'Primeira experiência na área de TI com atendimento ao usuário, abertura e acompanhamento de chamados, orientações de primeiro nível e apoio na resolução de incidentes de forma ágil.',
    },
    {
      title: 'Técnico de Suporte Remoto',
      company: 'Stefanini',
      period: '2017 - 2018',
      isActive: false,
      description: 'Atendimento remoto a usuários corporativos, diagnóstico de incidentes de infraestrutura, resolução de chamados críticos e manutenção de estações de trabalho em ambiente de alta demanda.',
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
                  ? 'w-8 h-8 bg-bg-deep'
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
              <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-text-primary group-hover:text-primary-container transition-colors">
                    {exp.title} <span className="text-primary-container/50 mx-1 font-light">|</span> <span className="text-primary-container">{exp.company}</span>
                  </h3>
                </div>
                <span className="text-xs font-semibold text-text-muted uppercase tracking-widest">
                  {exp.period}
                </span>
              </div>

              <p className="text-text-secondary text-sm leading-relaxed">
                {exp.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
