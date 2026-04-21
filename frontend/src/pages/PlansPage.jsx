import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
  Compass,
  Globe2,
  HeartPulse,
  Layers3,
  MoveRight,
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
    title: "Comeco premium para empresas em formacao",
    summary:
      "Ideal para times menores que querem uma entrada mais qualificada em saude, com linguagem clara e boa percepcao de valor.",
    highlights: [
      "Rede credenciada de alto padrao",
      "Experiencia digital para colaborador",
      "Implementacao mais leve",
      "Base preparada para crescer",
    ],
    badge: "Entrada premium",
    tone: "is-soft",
  },
  {
    audience: "30 a 200 colaboradores",
    title: "Equilibrio entre cobertura e gestao",
    summary:
      "Faixa pensada para empresas em expansao que precisam combinar qualidade assistencial, leitura simples e apoio ao RH.",
    highlights: [
      "Suporte mais proximo ao RH",
      "Programas de saude complementares",
      "Jornada mais estruturada para uso",
      "Boa relacao entre escala e cuidado",
    ],
    badge: "Mais aderente",
    tone: "is-featured",
  },
  {
    audience: "200+ vidas",
    title: "Gestao premium para operacoes consolidadas",
    summary:
      "Direcao mais estrategica para companhias que precisam de maturidade operacional, continuidade de cuidado e capacidade de customizacao.",
    highlights: [
      "Operacao desenhada para alta escala",
      "Leitura mais estrategica de uso",
      "Servicos customizaveis",
      "Experiencia premium consistente",
    ],
    badge: "Escala e governanca",
    tone: "is-deep",
  },
];

const pillars = [
  {
    icon: HeartPulse,
    title: "Rede premium",
    description: "Hospitais, clinicas, laboratorios e especialistas que sustentam uma experiencia mais qualificada.",
  },
  {
    icon: Sparkles,
    title: "Saude digital",
    description: "Recursos digitais entram como parte da jornada, sem parecer um adicional isolado.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Suporte ao RH",
    description: "A pagina conversa com quem contrata o beneficio e com quem cuida dele depois.",
  },
  {
    icon: Globe2,
    title: "Visao de crescimento",
    description: "A narrativa mostra como o plano pode evoluir com a empresa sem trocar de linguagem.",
  },
];

const comparisonCards = [
  {
    title: "Para quem faz sentido",
    eyebrow: "Encaixe",
    values: [
      "Empresas menores em estruturacao",
      "Empresas em crescimento",
      "Operacoes maiores e mais maduras",
    ],
  },
  {
    title: "Foco de experiencia",
    eyebrow: "Jornada",
    values: [
      "Comecar bem e ganhar confianca",
      "Equilibrar escala e proximidade",
      "Unificar governanca e cuidado",
    ],
  },
  {
    title: "Valor percebido",
    eyebrow: "Percepcao",
    values: [
      "Premium logo na entrada",
      "Mais aderencia ao dia a dia do RH",
      "Maturidade de operacao e leitura de uso",
    ],
  },
];

const serviceExtensions = [
  {
    icon: Stethoscope,
    title: "Medicina ocupacional",
    description: "Aproxima a rotina corporativa da experiencia assistencial sem quebrar a narrativa da pagina.",
  },
  {
    icon: Layers3,
    title: "Dental",
    description: "Complemento natural para ampliar o pacote e aumentar percepcao de valor do beneficio.",
  },
  {
    icon: Users,
    title: "Programas de saude",
    description: "Blocos para prevencao, maternidade, saude mental e acompanhamento continuo.",
  },
  {
    icon: Building2,
    title: "Portal de gestao",
    description: "Um espaco pensado para RH acompanhar a operacao com menos atrito e mais visibilidade.",
  },
];

const curationPoints = [
  "A escolha comeca pelo contexto da empresa, nao por tabela.",
  "O visual precisa parecer editorial e premium, nao um dashboard disfarçado.",
  "A pagina deve vender clareza antes de vender volume de informacao.",
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
        <section className="plans-hero-section">
          <div className="container-fluid custom-container">
            <div className="plans-hero-card">
              <div className="plans-hero-card__brand-row">
                <Link to="/" className="plans-hero-card__brand" aria-label="Voltar para a home do Care Plus">
                  <img src={CarePlus} alt="Care Plus" className="plans-hero-card__logo" />
                </Link>

                <div className="plans-hero-card__meta">
                  <span className="plans-hero-card__eyebrow">Planos e produtos</span>
                  <span className="plans-hero-card__trust">
                    <ShieldCheck size={16} aria-hidden="true" />
                    Premium, digital e orientado a crescimento
                  </span>
                </div>
              </div>

              <div className="plans-hero-card__content">
                <div className="plans-hero-card__copy">
                  <div className="plans-hero-card__kicker">
                    <Compass size={16} aria-hidden="true" />
                    Uma pagina comercial com narrativa, nao um mosaico de widgets
                  </div>
                  <h1>Planos desenhados para o momento da sua empresa.</h1>
                  <p>
                    Em vez de empilhar opcoes e tabelas logo de cara, a tela organiza a escolha por porte, momento de negocio
                    e experiencia que cada operacao precisa entregar.
                  </p>

                  <div className="plans-hero-card__actions">
                    <Link to="/cadastro" className="plans-primary-action">
                      Solicitar proposta
                      <ArrowRight size={18} aria-hidden="true" />
                    </Link>

                    <a href="#plans-profiles" className="plans-secondary-action">
                      Ver perfis de plano
                    </a>
                  </div>
                </div>

                <div className="plans-hero-card__snapshot" aria-label="Resumo da proposta da tela">
                  <div className="plans-snapshot-card plans-snapshot-card--quote">
                    <strong>Direcao de design</strong>
                    <p>
                      A tela quer parecer consultiva e calma. Menos cara de template. Mais curadoria, ritmo e contraste entre
                      os blocos.
                    </p>
                  </div>

                  <div className="plans-snapshot-grid">
                    <div className="plans-snapshot-tile">
                      <span>3</span>
                      <p>perfis principais para leitura rapida</p>
                    </div>
                    <div className="plans-snapshot-tile">
                      <span>1</span>
                      <p>CTA principal dominante na jornada</p>
                    </div>
                    <div className="plans-snapshot-tile">
                      <span>4</span>
                      <p>pilares de valor para reforcar percepcao premium</p>
                    </div>
                  </div>

                  <div className="plans-hero-card__curation">
                    {curationPoints.map((point) => (
                      <div key={point} className="plans-hero-card__curation-item">
                        <span aria-hidden="true">
                          <MoveRight size={15} />
                        </span>
                        <p>{point}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="plans-content-section" id="plans-profiles">
          <div className="container-fluid custom-container">
            <div className="plans-section-heading">
              <span className="plans-section-heading__eyebrow">Escolha guiada</span>
              <h2>Comece pelo porte da operacao e refine depois.</h2>
              <p>
                O bloco principal da pagina coloca a decisao mais importante primeiro. Cada card deixa claro o contexto,
                a promessa e o tipo de experiencia que a empresa pode esperar.
              </p>
            </div>

            <div className="plans-profile-grid">
              {planProfiles.map((profile, index) => (
                <article
                  key={profile.audience}
                  className={`plans-profile-card ${profile.tone} ${index === 1 ? "plans-profile-card--featured" : ""}`}
                >
                  <div className="plans-profile-card__header">
                    <span className="plans-profile-card__badge">{profile.badge}</span>
                    <span className="plans-profile-card__audience">{profile.audience}</span>
                  </div>

                  <div className="plans-profile-card__body">
                    <span className="plans-profile-card__index">0{index + 1}</span>
                    <h3>{profile.title}</h3>
                    <p>{profile.summary}</p>
                  </div>

                  <div className="plans-profile-card__highlights">
                    {profile.highlights.map((highlight) => (
                      <div key={highlight} className="plans-profile-card__highlight">
                        <span className="plans-profile-card__highlight-icon" aria-hidden="true">
                          <Check size={14} />
                        </span>
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="plans-pillars-section">
          <div className="container-fluid custom-container">
            <div className="plans-pillars-shell">
              <div className="plans-pillars-intro">
                <span className="plans-section-heading__eyebrow">O que sustenta a proposta</span>
                <h2>Os pilares da Care Plus entram como reforco de marca, nao como ruido.</h2>
                <p>
                  A pagina precisa vender premium com serenidade: rede forte, saude digital, apoio ao RH e capacidade de
                  evolucao sem perder clareza.
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
          </div>
        </section>

        <section className="plans-comparison-section">
          <div className="container-fluid custom-container">
            <div className="plans-comparison-layout">
              <div className="plans-comparison-copy">
                <span className="plans-section-heading__eyebrow">Comparativo rapido</span>
                <h2>Uma leitura comercial que continua funcionando no celular.</h2>
                <p>
                  Em vez de tabela horizontal, o comparativo vira uma grade de blocos tematicos. Cada bloco mostra como os
                  tres perfis se posicionam naquele criterio.
                </p>
              </div>

              <div className="plans-comparison-grid">
                {comparisonCards.map((card) => (
                  <article key={card.title} className="plans-comparison-card">
                    <span className="plans-comparison-card__eyebrow">{card.eyebrow}</span>
                    <h3>{card.title}</h3>
                    <div className="plans-comparison-card__values">
                      {card.values.map((value, index) => (
                        <div key={value} className="plans-comparison-card__value">
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

        <section className="plans-services-section">
          <div className="container-fluid custom-container">
            <div className="plans-services-shell">
              <div className="plans-services-heading">
                <span className="plans-section-heading__eyebrow">Expansao do beneficio</span>
                <h2>Depois do plano, a conversa continua com servicos complementares.</h2>
                <p>
                  O fechamento da pagina mostra amplitude de solucao sem disputar protagonismo com a escolha principal.
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
          </div>
        </section>

        <section className="plans-cta-section">
          <div className="container-fluid custom-container">
            <div className="plans-cta-card">
              <div>
                <span className="plans-section-heading__eyebrow">Proximo passo</span>
                <h2>Se a tela fizer sentido, o fluxo comercial pode nascer daqui.</h2>
                <p>
                  Hoje o CTA aponta para cadastro, mas a estrutura esta pronta para evoluir para proposta, simulacao ou
                  contato consultivo.
                </p>
              </div>

              <div className="plans-cta-card__actions">
                <Link to="/cadastro" className="plans-primary-action">
                  Continuar no fluxo
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>

                <Link to="/login" className="plans-cta-card__text-link">
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
