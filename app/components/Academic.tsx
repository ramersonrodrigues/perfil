export default function Academic() {
  const academicItems = [
    {
      title: 'Banco de Dados',
      institution: 'Faculdade Focus',
      level: 'Pós-graduação',
      period: '2022 - 2023',
      description: 'Aprofundamento em modelagem de dados, administração de SGBDs, otimização de consultas, replicação, backup, segurança da informação e arquitetura de dados para grandes volumes.',
    },
    {
      title: 'Engenharia de Software',
      institution: 'Faculdade Focus',
      level: 'Pós-graduação',
      period: '2020 - 2021',
      description: 'Estudo avançado em processos de desenvolvimento, padrões de projeto, arquitetura de software, qualidade, testes, integração contínua e gestão de produtos digitais.',
    },
    {
      title: 'Análise e Desenvolvimento de Sistemas',
      institution: 'FACIPLAC',
      level: 'Superior',
      period: '2014 - 2018',
      description: 'Formação prática voltada para o ciclo completo de desenvolvimento de software, abrangendo análise de requisitos, programação, banco de dados, redes e metodologias ágeis.',
    },
    {
      title: 'Desenvolvimento de Software',
      institution: 'Instituto Federal do Piauí',
      level: 'Técnico',
      period: '2011 - 2013',
      description: 'Primeiro contato com a área de tecnologia, desenvolvendo lógica de programação, redes, banco de dados e aplicações usando linguagens como Java e PHP.',
    },
    {
      title: 'Green IT',
      institution: 'Faculdade Focus',
      level: 'Certificação',
      period: '2021',
      description: 'Certificação focada em práticas sustentáveis de TI, redução de consumo energético, gestão de resíduos eletrônicos, virtualização e infraestrutura com menor impacto ambiental.',
    },
    {
      title: 'ITIL',
      institution: 'Faculdade Focus',
      level: 'Certificação',
      period: '2021',
      description: 'Fundamentos da biblioteca ITIL para gestão de serviços de TI, abordando processos, melhoria contínua, ciclo de vida de serviços e alinhamento entre TI e negócios.',
    },
    {
      title: 'Montagem e Manutenção de Computadores',
      institution: 'SENAI',
      level: 'Curso',
      period: '2010',
      description: 'Curso prático voltado ao diagnóstico de hardware, montagem de estações de trabalho, instalação de componentes, configuração de BIOS e resolução de problemas físicos de computadores.',
    },
    {
      title: 'Sistema Operacional Linux',
      institution: 'SENAI',
      level: 'Curso',
      period: '2010',
      description: 'Introdução ao ambiente Linux, linha de comando, gerenciamento de usuários, permissões, instalação de pacotes, serviços de rede e configuração básica de servidores.',
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
