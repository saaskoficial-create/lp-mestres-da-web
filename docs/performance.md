# Auditoria local de SEO e performance — 02/10/2026

Lighthouse 13.5.0, preset mobile, CPU/rede simuladas, build de produção servido no localhost. Medição de laboratório; não representa dados reais de usuários ou garantia de ranking.

| Indicador | Antes | Depois |
| --- | ---: | ---: |
| Desempenho | 87 | 95 |
| SEO | 92 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| LCP simulado | 3.46 s | 2.88 s |
| CLS | 0.0016 | 0.0000 |

Mudanças: HTML completo pré-renderizado, CSS pequeno inline, preload de fontes Latin, prioridade baixa para hidratação, GSAP sob demanda, logos responsivas e cache de assets preparado para hospedagem. O HTML fica visível sem JavaScript. Canonical e sitemap dependem de SITE_URL no ambiente de build.

Logística: desempenho 96, SEO 100, acessibilidade 100 e boas práticas 100. LCP simulado 2.86 s, CLS 0. Não foi capturada uma auditoria anterior específica de Logística.

A medição final inclui o novo hero editorial e os contêineres GTM ativos: GTM-TCZC9VKB em Indústria e GTM-NMJVVJF7 em Logística. Os relatórios estão em `../Mestres da Web/lps-revisao-2026-10-02/audits/industria-gtm-final.json` e `logistica-gtm-final.json`. Carregamento HTTP 200 e inicialização de cada contêiner foram conferidos em Chrome. Os testes de HTML garantem que cada campanha não carrega o ID da outra.

As LPs permanecem independentes, sem navegação entre campanhas. Paleta testada: #121212 / #250638 / #542176. Animated Beam obtido pelo MCP da 21st.dev e adaptado.
