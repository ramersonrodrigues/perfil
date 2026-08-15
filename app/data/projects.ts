export interface Project {
  title: string;
  description: string;
  icon: string;
  technologies: string[];
  images: string[];
  imageLabels: string[];
  videoThumbnail: string;
  layout: 'normal' | 'reverse';
}

export const projects: Project[] = [
  {
    title: 'Painel FinTech',
    description: 'Uma plataforma financeira completa para gestão de investimentos, despesas e acompanhamento de patrimônio em tempo real. Inclui visualizações interativas com D3.js, integração com múltiplas instituições financeiras e relatórios personalizados. O sistema foi desenvolvido com foco em performance e usabilidade, processando milhares de transações por segundo.',
    icon: 'account_balance_wallet',
    technologies: ['React', 'D3.js', 'Node.js'],
    images: [
      'https://placehold.co/100x100/8257e5/ffffff?text=Re',
      'https://placehold.co/100x100/3b82f6/ffffff?text=D3',
      'https://placehold.co/100x100/10b981/ffffff?text=No',
    ],
    imageLabels: ['React', 'D3.js', 'Node.js'],
    videoThumbnail: 'https://placehold.co/800x500/1a1625/d0bcff?text=FinTech+Dashboard',
    layout: 'normal',
  },
  {
    title: 'E-commerce API',
    description: 'API robusta para e-commerce moderno, com gestão completa de produtos, pedidos, pagamentos e logística. Implementa autenticação JWT, cache com Redis, processamento assíncrono de pedidos e integração com gateways de pagamento. A arquitetura escalável suporta alta demanda durante picos de vendas e promoções sazonais.',
    icon: 'shopping_cart',
    technologies: ['Node.js', 'PostgreSQL', 'Redis'],
    images: [
      'https://placehold.co/100x100/8257e5/ffffff?text=No',
      'https://placehold.co/100x100/3b82f6/ffffff?text=PG',
      'https://placehold.co/100x100/10b981/ffffff?text=Re',
    ],
    imageLabels: ['Node.js', 'PostgreSQL', 'Redis'],
    videoThumbnail: 'https://placehold.co/800x500/1a1625/d0bcff?text=E-commerce+API',
    layout: 'reverse',
  },
  {
    title: 'Real-time Chat App',
    description: 'Aplicativo de mensagens em tempo real com suporte a conversas privadas e em grupo, compartilhamento de arquivos e notificações push. Utiliza WebSockets para comunicação instantânea e arquitetura escalável para suportar milhares de usuários simultâneos. Interface responsiva e acessível desenvolvida com React e Tailwind CSS.',
    icon: 'chat',
    technologies: ['WebSockets', 'React', 'Node.js'],
    images: [
      'https://placehold.co/100x100/8257e5/ffffff?text=WS',
      'https://placehold.co/100x100/3b82f6/ffffff?text=Re',
      'https://placehold.co/100x100/10b981/ffffff?text=No',
    ],
    imageLabels: ['WebSockets', 'React', 'Node.js'],
    videoThumbnail: 'https://placehold.co/800x500/1a1625/d0bcff?text=Chat+App',
    layout: 'normal',
  },
];
