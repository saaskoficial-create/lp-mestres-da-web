# Auditoria local de SEO e performance — 02/10/2026

Lighthouse 13.5.0, preset mobile, CPU/rede simuladas, build de produção servido no localhost. Medição de laboratório; não representa dados reais de usuários ou garantia de ranking.

| Indicador | Antes | Depois |
| --- | ---: | ---: |
| Desempenho | 87 | 93 |
| SEO | 92 | 100 |
| Acessibilidade | 100 | 100 |
| Boas práticas | 100 | 100 |
| LCP simulado | 3.46 s | 3.23 s |
| CLS | 0.0016 | 0.0000 |

Mudanças: HTML completo pré-renderizado, CSS pequeno inline, preload de fontes Latin, prioridade baixa para hidratação, GSAP sob demanda, logos responsivas e cache de assets preparado para hospedagem. O HTML fica visível sem JavaScript. Canonical e sitemap dependem de SITE_URL no ambiente de build.

Logística: desempenho 94, SEO 100, acessibilidade 100 e boas práticas 100. CLS 0. Não foi capturada uma auditoria anterior específica de Logística.

As LPs permanecem independentes, sem navegação entre campanhas. Paleta testada: #121212 / #250638 / #542176. Animated Beam obtido pelo MCP da 21st.dev e adaptado.
