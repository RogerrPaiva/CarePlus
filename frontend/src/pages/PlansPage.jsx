import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  ChevronRight,
  CircleHelp,
  Globe2,
  HeartPulse,
  Layers3,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Users,
} from "lucide-react";
import CarePlus from "../assets/branding/CarePlus.svg";
import "./PlansPage.css";

const planProfiles = [
  {
    audience: "10 a 29 vidas",
    badge: "Entrada premium",
    title: "Para empresas em formacao",
    value: "Comece com uma experiencia de saude mais qualificada, com baixa friccao na implantacao e leitura simples para o time.",
    highlights: [
      "Rede credenciada de alto padrao",
      "Experiencia digital leve para colaborador",
      "Implementacao mais simples para o RH",
      "Base preparada para crescer com a empresa",
    ],
  },
  {
    audience: "30 a 200 colaboradores",
    badge: "Mais aderente",
    title: "Para empresas em expansao",
    value: "Equilibra cobertura, suporte ao RH e boa experiencia assistencial para operacoes que precisam ganhar escala com clareza.",
    highlights: [
      "Suporte mais proximo ao RH",
      "Programas de saude complementares",
      "Jornada mais estruturada para uso",
      "Boa relacao entre escala e cuidado",
    ],
    featured: true,
  },
  {
    audience: "200+ vidas",
    badge: "Escala e governanca",
    title: "Para operacoes consolidadas",
    value: "Direcao mais estrategica para empresas que precisam de continuidade de cuidado, customizacao e visibilidade operacional.",
    highlights: [
      "Operacao desenhada para alta escala",
      "Leitura mais estrategica de uso",
      "Servicos customizaveis",
      "Experiencia premium consistente",
    ],
  },
];

const pillars = [
  {
    icon: HeartPulse,
    title: "Rede premium",
    description: "Hospitais, clinicas, laboratorios e especialistas que sustentam uma experiencia assistencial mais qualificada.",
  },
  {
    icon: Sparkles,
    title: "Saude digital",
    description: "Recursos digitais entram com naturalidade na jornada, sem parecer um adicional desconectado do cuidado.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Suporte ao RH",
    description: "A experiencia atende quem usa o beneficio e tambem quem precisa implantar, explicar e acompanhar a operacao.",
  },
  {
    icon: Globe2,
    title: "Evolucao com a empresa",
    description: "A narrativa da pagina mostra como o plano acompanha o crescimento sem exigir uma troca brusca de solucao.",
  },
];

const comparisonRows = [
  {
    title: "Para quem faz sentido",
    values: [
      "Empresas menores estruturando um beneficio premium",
      "Empresas em crescimento que querem equilibrio entre cuidado e operacao",
      "Empresas maiores com mais maturidade e necessidade de governanca",
    ],
  },
  {
    title: "Foco da experiencia",
    values: [
      "Comecar bem e reduzir atrito na entrada",
      "Ganhar escala sem perder clareza para o RH e para o colaborador",
      "Unificar experiencia premium, operacao e leitura estrategica",
    ],
  },
  {
    title: "Valor percebido",
    values: [
      "Premium logo no inicio da jornada",
      "Mais aderencia ao dia a dia da empresa",
      "Capacidade de customizacao e continuidade de cuidado",
    ],
  },
];

const serviceExtensions = [
  {
    icon: Stethoscope,
    title: "Medicina ocupacional",
    description: "Aproxima a rotina corporativa da experiencia assistencial sem aumentar a complexidade visual da jornada.",
  },
  {
    icon: Layers3,
    title: "Dental",
    description: "Complemento natural para ampliar o valor percebido do beneficio com uma extensao facil de entender.",
  },
  {
    icon: Users,
    title: "Programas de saude",
    description: "Blocos para prevencao, saude mental, maternidade e acompanhamento continuo com linguagem positiva.",
  },
  {
    icon: Building2,
    title: "Portal de gestao",
    description: "Um espaco mais claro para o RH acompanhar implantacao, uso e continuidade do beneficio.",
  },
];

const faqs = [
  {
    question: "Como escolher o perfil ideal para a empresa?",
    answer:
      "A leitura comeca pelo porte da operacao, mas a decisao final considera momento de crescimento, necessidade de suporte ao RH e nivel de maturidade desejado para a experiencia do colaborador.",
  },
  {
    question: "A CarePlus apoia a implantacao do beneficio?",
    answer:
      "Sim. A proposta da pagina ja parte da ideia de baixa friccao: linguagem clara, suporte ao RH e uma experiencia pensada para facilitar entendimento e adesao.",
  },
  {
    question: "Os planos podem evoluir junto com a empresa?",
    answer:
      "Sim. A estrutura foi desenhada para mostrar continuidade, nao ruptura. Conforme a operacao amadurece, a experiencia pode ganhar escala, servicos e governanca.",
  },
  {
    question: "Como funciona o suporte para RH e liderancas?",
    answer:
      "O suporte ao RH aparece como um pilar da proposta. Isso inclui mais clareza na escolha, implantacao mais organizada e melhores pontos de acompanhamento ao longo da jornada.",
  },
];

function PlansPage() {
  useEffect(() => {
    document.title = "Care Plus | Planos";
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="plans-page">
        <section className="plans-hero">
          <div className="container-fluid custom-container">
            <div className="plans-hero__layout">
              <div className="plans-hero__main">
                <Link to="/" className="plans-brand" aria-label="Voltar para a home do Care Plus">
                  <img src={CarePlus} alt="Care Plus" className="plans-brand__logo" />
                </Link>

                <span className="plans-eyebrow">Planos empresariais</span>
                <h1>O plano certo para cada fase da sua empresa.</h1>
                <p className="plans-hero__copy">
                  Escolha com clareza uma solucao de saude que combina rede premium, experiencia digital e suporte ao RH com
                  uma leitura humana e consultiva.
                </p>

                <div className="plans-hero__actions">
                  <Link to="/cadastro" className="plans-button plans-button--primary">
                    Solicitar proposta
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>

                  <a href="#plans-cards" className="plans-button plans-button--secondary">
                    Comparar perfis
                  </a>
                </div>

                <div className="plans-hero__trust">
                  <ShieldCheck size={18} aria-hidden="true" />
                  <p>Privacidade por design, linguagem positiva e baixa friccao desde a escolha do plano.</p>
                </div>
              </div>

              <aside className="plans-summary-card" aria-label="Resumo da proposta de valor">
                <span className="plans-summary-card__eyebrow">Visao rapida</span>
                <h2>Uma pagina consultiva, clara e confiavel.</h2>
                <p>
                  A CarePlus deve parecer acolhedora e segura. Por isso, a pagina organiza a decisao por contexto da empresa,
                  e nao por excesso de informacao.
                </p>

                <div className="plans-summary-card__metrics">
                  <div className="plans-summary-card__metric">
                    <strong>3</strong>
                    <span>perfis principais</span>
                  </div>
                  <div className="plans-summary-card__metric">
                    <strong>4</strong>
                    <span>pilares de valor</span>
                  </div>
                  <div className="plans-summary-card__metric">
                    <strong>1</strong>
                    <span>CTA principal dominante</span>
                  </div>
                </div>

                <div className="plans-summary-card__highlights">
                  <div className="plans-inline-point">
                    <Check size={16} aria-hidden="true" />
                    <span>Escolha guiada por porte da empresa</span>
                  </div>
                  <div className="plans-inline-point">
                    <Check size={16} aria-hidden="true" />
                    <span>Comparativo humano, sem tabela burocratica</span>
                  </div>
                  <div className="plans-inline-point">
                    <Check size={16} aria-hidden="true" />
                    <span>Continuidade visual com o ecossistema CarePlus</span>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="plans-section" id="plans-cards">
          <div className="container-fluid custom-container">
            <div className="plans-section__heading">
              <span className="plans-eyebrow">Escolha guiada</span>
              <h2>Comece pelo porte da empresa.</h2>
              <p>
                Em vez de abrir com uma tabela fria, a pagina apresenta tres perfis claros, cada um com publico, proposta de
                valor e highlights escaneaveis.
              </p>
            </div>

            <div className="plans-cards-grid">
              {planProfiles.map((plan) => (
                <article
                  key={plan.audience}
                  className={`plan-card ${plan.featured ? "plan-card--featured" : ""}`}
                  aria-label={`Perfil ${plan.audience}`}
                >
                  <div className="plan-card__header">
                    <span className="plan-card__badge">{plan.badge}</span>
                    <span className="plan-card__audience">{plan.audience}</span>
                  </div>

                  <h3>{plan.title}</h3>
                  <p className="plan-card__value">{plan.value}</p>

                  <div className="plan-card__highlights">
                    {plan.highlights.map((highlight) => (
                      <div key={highlight} className="plan-card__highlight">
                        <span className="plan-card__icon" aria-hidden="true">
                          <Check size={14} />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  <Link to="/cadastro" className="plan-card__link">
                    Quero este perfil
                    <ChevronRight size={16} aria-hidden="true" />
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plans-section plans-section--soft">
          <div className="container-fluid custom-container">
            <div className="plans-section__heading">
              <span className="plans-eyebrow">Pilares de valor</span>
              <h2>O que sustenta a proposta da CarePlus.</h2>
              <p>
                Este bloco reforca confianca e valor percebido sem competir com os cards de planos. A pagina vende serenidade,
                nao pressao comercial.
              </p>
            </div>

            <div className="plans-pillars-grid">
              {pillars.map(({ icon: Icon, title, description }) => (
                <article key={title} className="plans-pillar-card">
                  <div className="plans-pillar-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plans-section">
          <div className="container-fluid custom-container">
            <div className="plans-compare-layout">
              <div className="plans-compare-intro">
                <span className="plans-eyebrow">Comparativo humano</span>
                <h2>Entenda como cada perfil faz sentido na pratica.</h2>
                <p>
                  A comparacao foi desenhada para parecer uma conversa de escolha, nao uma grade burocratica. Cada criterio
                  ajuda a empresa e o RH a se reconhecerem com mais rapidez.
                </p>
              </div>

              <div className="plans-compare-list">
                {comparisonRows.map((row) => (
                  <article key={row.title} className="plans-compare-card">
                    <h3>{row.title}</h3>
                    <div className="plans-compare-card__values">
                      {row.values.map((value, index) => (
                        <div key={value} className="plans-compare-card__value">
                          <strong>{planProfiles[index].audience}</strong>
                          <span>{value}</span>
                        </div>
                      ))}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="plans-section plans-section--soft">
          <div className="container-fluid custom-container">
            <div className="plans-section__heading">
              <span className="plans-eyebrow">Servicos complementares</span>
              <h2>O plano pode evoluir com outras frentes de cuidado.</h2>
              <p>
                O fechamento intermediario mostra amplitude sem parecer oferta excessiva. A ideia e reforcar continuidade e
                maturidade da solucao.
              </p>
            </div>

            <div className="plans-services-grid">
              {serviceExtensions.map(({ icon: Icon, title, description }) => (
                <article key={title} className="plans-service-card">
                  <div className="plans-service-card__icon" aria-hidden="true">
                    <Icon size={18} />
                  </div>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plans-section">
          <div className="container-fluid custom-container">
            <div className="plans-faq-layout">
              <div className="plans-faq-intro">
                <span className="plans-eyebrow">Perguntas frequentes</span>
                <h2>Uma pagina que continua acolhedora ate o fim.</h2>
                <p>
                  O fechamento nao deve ser brusco. FAQ, reforco de confianca e CTA final mantem a sensacao de continuidade e
                  suporte consultivo.
                </p>
              </div>

              <div className="plans-faq-list">
                {faqs.map((faq) => (
                  <details key={faq.question} className="plans-faq-item">
                    <summary>
                      <span>{faq.question}</span>
                      <ChevronRight size={18} aria-hidden="true" />
                    </summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="plans-section plans-section--closing">
          <div className="container-fluid custom-container">
            <div className="plans-closing-card">
              <div className="plans-closing-card__copy">
                <span className="plans-eyebrow">Confianca e continuidade</span>
                <h2>Escolha com mais clareza. Evolua com menos atrito.</h2>
                <p>
                  A CarePlus comunica prevencao, privacidade por design e uma experiencia moderna, mas humana. O objetivo da
                  pagina e transformar complexidade em orientacao segura.
                </p>

                <div className="plans-closing-card__trust">
                  <div className="plans-inline-point">
                    <ShieldCheck size={16} aria-hidden="true" />
                    <span>Privacidade por design</span>
                  </div>
                  <div className="plans-inline-point">
                    <CircleHelp size={16} aria-hidden="true" />
                    <span>Linguagem clara e nao ansiosa</span>
                  </div>
                  <div className="plans-inline-point">
                    <Check size={16} aria-hidden="true" />
                    <span>Experiencia acessivel e inclusiva</span>
                  </div>
                </div>
              </div>

              <div className="plans-closing-card__actions">
                <Link to="/cadastro" className="plans-button plans-button--primary">
                  Falar com especialista
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>

                <Link to="/login" className="plans-button plans-button--text">
                  Ja tenho conta
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PlansPage;
