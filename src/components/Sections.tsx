import { Check, Code2, ShieldCheck } from 'lucide-react'
import { certifications, type PageContent, type Segment } from '@/content/pages'
import { Cta, Reveal } from './common'
import { IntegrationDiagram } from './IntegrationDiagram'
import { ServiceIllustration } from './ServiceIllustration'

export function Problem({ page, segment }: { page: PageContent; segment: Segment }) {
  return <section className="section problem-section" id="operacao" aria-labelledby="problem-title"><div className="container"><Reveal className="problem-heading"><h2 id="problem-title">{page.problemTitle}</h2><p>{page.problemIntro}</p></Reveal><div className="problem-list">{page.problems.map(item => <div key={item.title}><span className="problem-mark" aria-hidden="true" /><h3>{item.title}</h3><p>{item.description}</p></div>)}</div><Reveal className="problem-bottom"><h3>{page.problemConclusion}</h3><div><p>{page.problemAbout}</p>{segment === 'logistica' && <p>Quando um colaborador precisa copiar informação do TMS para o ERP, conferir rastreamento em outra plataforma e atualizar o cliente manualmente, existe um gargalo claro. A tecnologia deveria fazer essa conexão. Desenvolvemos sistemas e integrações sob medida para reduzir retrabalho e centralizar informações.</p>}</div></Reveal></div></section>
}

export function Solutions({ page }: { page: PageContent }) {
  return <section className="section solutions-section" id="solucoes" aria-labelledby="solutions-title"><div className="container"><Reveal className="section-heading"><h2 id="solutions-title">O que podemos desenvolver.</h2><p>Uma solução construída a partir dos seus processos, regras e integrações.</p></Reveal><div className="solution-columns">{page.solutionGroups.map(group => { return <article key={group.title}><ServiceIllustration kind={group.icon} /><h3>{group.title}</h3><p>{group.description}</p><ul>{group.items.map(index => <li key={page.solutions[index]}><Check size={16} aria-hidden="true" />{page.solutions[index]}</li>)}</ul></article> })}</div><div className="solutions-cta"><Cta>{page.cta}</Cta><p>Não começamos pelo sistema.<br />Começamos pelo que sua operação precisa.</p></div></div></section>
}

export function Integration({ page, segment }: { page: PageContent; segment: Segment }) {
  return <section className="section integration-section" id="integracoes" aria-labelledby="integration-title"><div className="container integration-layout"><Reveal><h2 id="integration-title">{page.integrationTitle}</h2>{page.integrationParagraphs.map((p, i) => <p key={p} className={i === page.integrationParagraphs.length - 1 ? 'integration-last' : ''}>{p}</p>)}<Cta secondary>{page.cta}</Cta></Reveal><IntegrationDiagram page={page} segment={segment} /></div></section>
}

export function Fit({ page }: { page: PageContent }) {
  return <section className="section fit-section" id="para-quem" aria-labelledby="fit-title"><div className="container fit-layout"><Reveal><h2 id="fit-title">{page.fitTitle}</h2><p>{page.fitConclusion}</p><Cta secondary>{page.cta}</Cta></Reveal><ul className="fit-list">{page.fitItems.map(item => <li key={item}><span><Check size={18} aria-hidden="true" /></span>{item}</li>)}</ul></div></section>
}

export function Experience() {
  return <section className="section experience-section" id="experiencia" aria-labelledby="experience-title"><div className="container"><div className="experience-layout"><Reveal><p className="experience-context">Mestres da Web</p><h2 id="experience-title">Tecnologia para operações complexas.<br />Feita por pessoas.</h2><p>Mais de 1.000 projetos desenvolvidos. Mais de uma década de mercado. Experiência com sistemas corporativos, integrações, IoT e plataformas complexas.</p><p>Cases com grandes empresas e uma equipe multidisciplinar para entender, desenvolver e evoluir seu projeto.</p><a className="text-link" href="https://www.mestresdaweb.com.br/" target="_blank" rel="noreferrer">Conheça a Mestres da Web<Code2 size={18} aria-hidden="true" /></a></Reveal><figure className="team-photo"><img src="/images/equipe-mestres.webp" alt="Equipe da Mestres da Web reunida no escritório, conforme fotografia do site oficial." width="1100" height="569" loading="lazy" /><figcaption>A equipe por trás dos projetos.<span>Foto oficial da Mestres da Web.</span></figcaption></figure></div><div className="certification-intro"><ShieldCheck size={23} aria-hidden="true" /><h3>Cinco certificações ISO.</h3><p>Qualidade e responsabilidade em diferentes frentes.</p></div><ul className="certification-list">{certifications.map(cert => <li key={cert.name}><strong>{cert.name}</strong><span>{cert.area}</span></li>)}</ul></div></section>
}
