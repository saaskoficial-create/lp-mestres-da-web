# Mestres da Web — LPs de Indústria e Logística

Duas landing pages em React + TypeScript + Vite + Tailwind, com componentes reais shadcn/ui, Framer Motion e GSAP. Identidade escura em roxo e ciano; Space Grotesk e DM Sans locais; fotografias reais; diagrama conceitual de integração.

## Rodar

Node.js 24 e npm:

```bash
npm ci
npm run dev
```

- Indústria: http://127.0.0.1:4179/industria/
- Logística: http://127.0.0.1:4179/logistica/
- A raiz abre Indústria. A porta 4179 preserva a prévia da DELM na porta 4178.

```bash
npm run verify
npx playwright install chromium
npm run test:e2e
npm run build
npm run preview
```

No Windows, os testes também podem usar o Chrome instalado: `$env:PLAYWRIGHT_CHANNEL='chrome'; npm run test:e2e`.

O build gera HTML próprio para `/industria/` e `/logistica/`, com título e descrição específicos de cada campanha. Não inclui a terceira copy, conforme instrução do usuário.

## Conteúdo e identidade

`src/content/pages.ts` centraliza as duas copies e suas opções. Briefing: cliente ClickUp `86e3gzgg7`. Logo e paleta recuperadas dos materiais anteriores. DOCX original e briefing privado não são publicados. Os textos institucionais foram conferidos no site oficial. Fotografia de equipe é material real do cliente; fotografias dos setores são ilustrativas e licenciadas. Fontes, licenças e referências: `docs/assets.md` e `public/fonts-LICENSE.txt`.

O DOCX contém as faixas intermediárias de faturamento como equações do Word. Elas foram recuperadas como `R$ 500 mil a R$ 1 milhão`, `R$ 1 milhão a R$ 5 milhões` e `R$ 5 milhões a R$ 20 milhões`. A seleção de sistemas permite múltiplas opções mantendo a lista de cada copy.

## Captação

Copie `.env.example` para `.env.local` e configure `LEAD_WEBHOOK_URL` com o destino de CRM/automação. Reinicie o servidor e confirme o recebimento de um lead de teste. A URL fica apenas no servidor, sem prefixo `VITE_`.

Sem webhook, a API declara indisponibilidade e o formulário não simula sucesso. `GET /api/leads` informa disponibilidade; `POST /api/leads` valida novamente os campos e confirma somente após HTTP 2xx do destino. Falhas preservam os campos. O servidor limita o corpo a 16 KiB e aguarda o destino por até 12 segundos.

O webhook recebe `{ source: "lp-mestres-da-web", submittedAt, lead }`. O lead contém `segment`, `name`, `email`, `phone` (somente dígitos), `company`, `companySize`, `monthlyRevenue`, `challenge`, `projectStage` e `currentSystems` (array). O segmento identifica a LP e a API valida suas escolhas específicas. Não há persistência em localStorage.

Os testes de integração usam um webhook HTTP local; testes de interface usam respostas simuladas. Recebimento real depende da configuração do destino.

## Hospedagem e rastreamento

A configuração Vercel entrega `dist` e o endpoint serverless `/api/leads`; definir `LEAD_WEBHOOK_URL` no servidor. Hospedagem puramente estática precisa de uma API separada. Domínio, publicação em hospedagem e rastreamento deste cliente não foram configurados. O contêiner GTM da DELM não é reutilizado.

## Verificação

CI `Quality`: instalação limpa, lint, testes do servidor, TypeScript, build e Playwright. As duas LPs são verificadas em 360, 390, 768 e 1440 px, com navegação mobile por teclado, CTAs, fontes, overflow, indisponibilidade, validação, envio em andamento, erro com retenção e confirmação após sucesso. Animações têm entrada, saída, retorno e respeito ao movimento reduzido.
