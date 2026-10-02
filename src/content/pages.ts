export const segments = ['industria', 'logistica'] as const
export type Segment = (typeof segments)[number]

export const companySizes = ['Até 20 funcionários', '21 a 50 funcionários', '51 a 100 funcionários', '101 a 500 funcionários', 'Mais de 500 funcionários'] as const
export const revenueRanges = ['Até R$ 500 mil', 'R$ 500 mil a R$ 1 milhão', 'R$ 1 milhão a R$ 5 milhões', 'R$ 5 milhões a R$ 20 milhões', 'Acima de R$ 20 milhões', 'Prefiro não informar'] as const
export const projectStages = ['Estamos avaliando possibilidades', 'Precisamos resolver nos próximos 6 meses', 'Precisamos resolver nos próximos 3 meses', 'Projeto já aprovado internamente', 'Precisamos iniciar o quanto antes'] as const

export const pageContent = {
  industria: {
    name: 'Indústria',
    title: 'Software industrial sob medida | Mestres da Web',
    description: 'Integre ERP, produção, estoque e gestão com software industrial sob medida. Conte seu desafio à Mestres da Web e solicite um diagnóstico.',
    context: 'Software sob medida para indústria',
    headline: 'Sua operação ficou complexa demais para software pronto.',
    introduction: 'Desenvolvemos software industrial sob medida para integrar ERP, produção, estoque, dados e processos que hoje não conversam.',
    cta: 'Solicitar diagnóstico',
    image: 'industria',
    imageAlt: 'Dois profissionais com equipamentos de proteção conferem bobinas de aço em uma fábrica.',
    imageCaption: 'Da produção à gestão. A mesma informação.',
    flow: ['ERP', 'Produção', 'Estoque', 'Gestão'],
    problemTitle: 'Seu ERP resolve o padrão. Sua operação exige mais.',
    problemIntro: 'Quando a indústria cresce, começam os desvios.',
    problems: [
      { title: 'Planilhas paralelas', description: 'Controles fora do sistema para manter a operação funcionando.' },
      { title: 'Processos manuais', description: 'Pessoas fazendo a ponte entre ferramentas e áreas.' },
      { title: 'Sistemas desconectados', description: 'Dados que não acompanham o fluxo da produção.' },
      { title: 'Informação espalhada', description: 'Produção, estoque, financeiro e gestão com versões diferentes.' },
    ],
    problemConclusion: 'E quanto maior a operação, mais caro fica depender desse improviso.',
    problemAbout: 'A Mestres da Web desenvolve software para indústria, integração ERP indústria e sistemas personalizados para operações que precisam ir além das limitações de uma ferramenta pronta.',
    solutions: [
      'Integração ERP indústria', 'Integração de sistemas industriais', 'Software para controle de produção', 'Automação de processos industriais', 'Sistemas internos', 'Dashboards operacionais', 'Aplicações web e mobile', 'IoT e integração com equipamentos', 'Modernização de sistemas legados', 'Sistema industrial personalizado',
    ],
    solutionGroups: [
      { title: 'Conectar a operação', description: 'ERP, produção, estoque e equipamentos trabalhando no mesmo fluxo.', icon: 'connect', items: [0, 1, 7] },
      { title: 'Simplificar os processos', description: 'Sistemas construídos para as regras que são próprias da sua indústria.', icon: 'workflow', items: [2, 3, 4, 9] },
      { title: 'Evoluir a tecnologia', description: 'Informação útil para a gestão e uma base que acompanha o crescimento.', icon: 'develop', items: [5, 6, 8] },
    ],
    integrationTitle: 'Pare de adaptar sua operação ao sistema.',
    integrationParagraphs: [
      'Se sua equipe precisa mudar processos porque o software não atende, o problema está invertido.',
      'A tecnologia deveria acompanhar sua operação. Não o contrário.',
      'Desenvolvemos sistema personalizado para indústria com base nos processos, regras e integrações que sua empresa realmente precisa.',
    ],
    diagramLabels: ['ERP', 'Produção', 'Estoque', 'Equipamentos'],
    fitTitle: 'Quando um software sob medida faz sentido?',
    fitItems: [
      'Sua indústria já utiliza ERP, mas ainda depende de planilhas.',
      'Produção, estoque e gestão trabalham com informações diferentes.',
      'Sua equipe precisa copiar dados entre sistemas.',
      'Existem processos específicos que o ERP não atende.',
      'O sistema atual não acompanhou o crescimento da operação.',
      'Existe um projeto estratégico que a equipe interna não consegue assumir.',
    ],
    fitConclusion: 'Se algum desses cenários faz parte da sua realidade, vale analisar uma solução sob medida.',
    formTitle: 'Sua operação ficou complexa demais para software pronto?',
    formIntro: 'Preencha os dados abaixo para entendermos o cenário da sua empresa e o tipo de projeto que precisa ser desenvolvido.',
    challenges: ['Integrar ERP com outros sistemas', 'Automatizar processos manuais', 'Criar um sistema interno', 'Modernizar um sistema legado', 'Integrar produção, estoque e gestão', 'IoT / integração com equipamentos', 'Outro'],
    systems: ['SAP', 'TOTVS', 'Sankhya', 'Senior', 'Sistema próprio', 'Outro', 'Não sei informar'],
  },
  logistica: {
    name: 'Logística',
    title: 'Software para logística e integrações | Mestres da Web',
    description: 'Conecte TMS, ERP, rastreamento, financeiro e operação com integrações sob medida. Avalie sua logística com a Mestres da Web.',
    context: 'Software sob medida para logística',
    headline: 'Sua operação não pode depender de sistemas que não conversam.',
    introduction: 'Desenvolvemos software para transportadora e integrações entre TMS, ERP, rastreamento, financeiro e operação.',
    cta: 'Avaliar minha operação',
    image: 'logistica',
    imageAlt: 'Profissional de um armazém confere caixas com um leitor e um tablet.',
    imageCaption: 'Do armazém à entrega. Tudo conectado.',
    flow: ['TMS', 'ERP', 'Rastreamento', 'Operação'],
    problemTitle: 'O problema não é ter muitos sistemas.',
    problemIntro: 'É eles funcionarem separados.',
    problems: [
      { title: 'TMS em uma tela', description: 'ERP em outra. Rastreamento em outra.' },
      { title: 'Planilhas no meio', description: 'Controles manuais preenchendo o espaço entre sistemas.' },
      { title: 'WhatsApp para fechar a informação', description: 'Atualizações da operação que dependem de uma conversa.' },
      { title: 'Fragmentação que custa', description: 'Quanto maior a operação, maior o custo dessa fragmentação.' },
    ],
    problemConclusion: 'Sua equipe não deveria ser a integração.',
    problemAbout: 'A Mestres da Web atua com desenvolvimento de sistema para logística e integração de sistemas logísticos para conectar os diferentes pontos da operação.',
    solutions: [
      'Integração TMS ERP', 'Software para transportadora', 'Software para operador logístico', 'Sistemas internos', 'Aplicativos para motoristas', 'Portal de clientes', 'Dashboards operacionais', 'Integrações via API', 'Automação de processos', 'Sistema logístico personalizado',
    ],
    solutionGroups: [
      { title: 'Conectar os sistemas', description: 'TMS, ERP e rastreamento trocando informações entre as áreas.', icon: 'connect', items: [0, 7, 8] },
      { title: 'Aproximar campo e gestão', description: 'Motoristas, clientes e operação com acesso ao que precisam.', icon: 'workflow', items: [4, 5, 6] },
      { title: 'Desenvolver para sua logística', description: 'Regras e processos próprios, respeitando a realidade da operação.', icon: 'develop', items: [1, 2, 3, 9] },
    ],
    integrationTitle: 'Talvez você não precise trocar seu TMS.',
    integrationParagraphs: [
      'Muitas transportadoras já possuem bons sistemas. O problema aparece quando essas ferramentas não conversam com o restante da empresa.',
      'Em vez de substituir toda a infraestrutura, podemos desenvolver integração TMS ERP, conectar rastreamento, financeiro, clientes e outras plataformas utilizadas pela operação.',
      'O objetivo não é adicionar mais um sistema. É fazer os sistemas existentes trabalharem juntos.',
    ],
    diagramLabels: ['TMS', 'ERP', 'Rastreamento', 'Financeiro'],
    fitTitle: 'Para quem essa solução faz sentido.',
    fitItems: [
      'Transportadoras de médio e grande porte.', 'Operadores logísticos.', 'Empresas com frota própria.', 'Operações com múltiplos centros de distribuição.', 'Empresas que precisam integrar TMS e ERP.', 'Operações com processos manuais entre campo e backoffice.', 'Empresas procurando desenvolvimento de plataforma para logística.',
    ],
    fitConclusion: 'Tecnologia para conectar a operação, do campo ao backoffice.',
    formTitle: 'Sua logística já é complexa. Seus sistemas não precisam tornar isso pior.',
    formIntro: 'Preencha os dados abaixo para entendermos como sua operação funciona hoje e onde está o principal gargalo.',
    challenges: ['Integrar TMS com ERP', 'Centralizar sistemas da operação', 'Criar aplicativo para motoristas', 'Criar portal para clientes', 'Automatizar processos', 'Modernizar sistema atual', 'Integrar rastreamento e operação', 'Outro'],
    systems: ['TMS', 'ERP', 'WMS', 'Sistema próprio', 'Mais de um sistema', 'Outro', 'Não sei informar'],
  },
} as const

export type PageContent = (typeof pageContent)[Segment]
export const certifications = [
  { name: 'ISO 9001', area: 'Gestão da qualidade' },
  { name: 'ISO 20000-1', area: 'Gestão de serviços de TI' },
  { name: 'ISO 27001', area: 'Segurança da informação' },
  { name: 'ISO 27701', area: 'Gestão da privacidade' },
  { name: 'ISO 14001', area: 'Gestão ambiental' },
] as const
