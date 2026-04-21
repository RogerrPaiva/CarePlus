import { useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BriefcaseBusiness,
  Building2,
  Check,
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
    title: "Sob medida para empresas em formacao",
    summary:
      "Entrada premium para times menores que querem comecar com acolhimento, rede qualificada e base digital desde o inicio.",
    highlights: [
      "Rede credenciada de alto padrao",
      "Jornada digital para o colaborador",
      "Experiencia simples para abrir o beneficio",
      "Espaco para crescer sem trocar de linguagem",
    ],
    accent: "is-soft",
  },
  {
    audience: "30 a 200 colaboradores",
    title: "Estrutura completa para empresas em expansao",
    summary:
      "Perfil pensado para operacoes que precisam equilibrar excelencia assistencial, suporte ao RH e capacidade de evolucao.",
    highlights: [
      "Suporte dedicado ao RH",
      "Programas complementares de saude",
      "Canais digitais e atendimento proximo",
      "Cobertura preparada para ganhar escala",
    ],
    accent: "is-strong",
  },
  {
    audience: "200+ vidas",
    title: "Gestao premium para empresas consolidadas",
    summary:
      "Direcao mais estrategica para beneficios de saude, com governanca, visao de uso e experiencia consistente para grandes times.",
    highlights: [
      "Operacao desenhada para alta escala",
      "Leitura mais estrategica para gestao",
      "Programas e servicos customizaveis",
      "Cuidado premium com foco em continuidade",
    ],
    accent: "is-dark",
  },
];

const differentiators = [
  {
    icon: HeartPulse,
    title: "Rede premium",
    description: "Hospitais, laboratorios, clinicas e especialistas alinhados a uma experiencia de cuidado mais qualificada.",
  },
  {
    icon: Sparkles,
    title: "Saude digital",
    description: "Consultas, apoio remoto e recursos digitais entram como parte natural da jornada, nao como anexo.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Suporte ao RH",
    description: "A tela fala tanto com o beneficiario quanto com quem precisa administrar o beneficio no dia a dia.",
  },
  {
    icon: Globe2,
    title: "Visao integral",
    description: "A pagina mostra que o plano pode crescer com servicos extras, programas e cobertura mais ampla.",
  },
];

const compareRows = [
  {
    label: "Melhor encaixe",
    values: ["Empresa menor em estruturacao", "Empresa em crescimento", "Empresa com operacao consolidada"],
  },
  {
    label: "Experiencia principal",
    values: ["Entrada premium com onboarding leve", "Equilibrio entre cobertura e operacao", "Gestao premium com escala e continuidade"],
  },
  {
    label: "Destaque de jornada",
    values: ["Comecar bem e crescer com clareza", "Ganhar eficiencia sem perder cuidado", "Governanca, dados e experiencia unificada"],
  },
  {
    label: "Beneficio adicional",
    values: ["Base digital e rede qualificada", "Suporte mais proximo ao RH", "Customizacao e leitura estrategica de uso"],
  },
];

const serviceExtensions = [
  {
    icon: Stethoscope,
    title: "Medicina ocupacional",
    description: "Para aproximar saude assistencial e rotina corporativa sem quebrar a experiencia.",
  },
  {
    icon: Layers3,
    title: "Dental",
    description: "Complemento natural para ampliar o cuidado e mostrar valor percebido no beneficio.",
  },
  {
    icon: Users,
    title: "Programas de saude",
    description: "Blocos para maternidade, saude mental, prevencao e acompanhamento continuo.",
  },
  {
    icon: Building2,
    title: "Portal de gestao",
    description: "Area pensada para RH acompanhar a operacao com menos atrito e mais visibilidade.",
  },
];

const signalPoints = [
  "Porte da empresa em primeiro plano",
  "Comparacao curta e facil de entender",
  "Complementos que expandem o valor do beneficio",
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

      <main id="main-content" className="product-page plans-shell">
        <section className="plans-page" aria-labelledby="plans-title">
          <div className="container-fluid custom-container">
            <div className="plans-mobile-back">
              <Link to="/" className="plans-back-link" aria-label="Voltar para a home do Care Plus" title="Voltar para a home">
                <ArrowLeft size={20} aria-hidden="true" />
                <span>Voltar para a home</span>
              </Link>
            </div>

            <div className="plans-grid">
              <div className="plans-hero">
                <div className="plans-hero__frame">
                  <div className="plans-hero__brand">
                    <img src={CarePlus} alt="Care Plus" className="plans-hero__logo" />
                  </div>

                  <div className="plans-hero__content">
                    <span className="plans-hero__eyebrow">Planos e produtos</span>
                    <h1 id="plans-title">Um plano premium para cada fase da sua empresa.</h1>
                    <p>
                      A tela traduz a linguagem institucional da Care Plus para um layout mais direto, premium e alinhado com
                      login e cadastro.
                    </p>
                  </div>

                  <div className="plans-hero__signals" aria-label="Pontos-chave da tela de planos">
                    {signalPoints.map((item) => (
                      <div key={item} className="plans-hero__signal">
                        <span className="plans-hero__signal-icon" aria-hidden="true">
                          <Check size={16} />
                        </span>
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="plans-panel">
                <div className="plans-panel__topbar">
                  <Link to="/" className="plans-back-link">
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>Voltar para a home</span>
                  </Link>
                </div>

                <div className="plans-panel__header">
                  <span className="plans-panel__eyebrow">Tela de planos</span>
                  <h2>Uma vitrine que organiza o beneficio por momento de negocio, nao por excesso de informacao.</h2>
                  <p>
                    Em vez de abrir com tabela enorme, a pagina ajuda a pessoa a se reconhecer rapido: tamanho da empresa,
                    proposta de valor e proximos complementos.
                  </p>
                </div>

                <div className="plans-panel__actions">
                  <a href="#plans-profiles" className="plans-primary-action">
                    Comparar perfis
                    <ArrowRight size={18} aria-hidden="true" />
                  </a>

                  <Link to="/cadastro" className="plans-secondary-action">
                    Criar conta
                  </Link>
                </div>

                <section className="plans-section" id="plans-profiles" aria-labelledby="plans-profiles-title">
                  <div className="plans-section__header">
                    <h3 id="plans-profiles-title">Perfis sugeridos</h3>
                    <p>Os cards deixam claro para quem cada proposta faz mais sentido.</p>
                  </div>

                  <div className="plans-profile-list">
                    {planProfiles.map((profile) => (
                      <article key={profile.audience} className={`plans-profile ${profile.accent}`}>
                        <div className="plans-profile__top">
                          <span className="plans-profile__audience">{profile.audience}</span>
                          <h4>{profile.title}</h4>
                          <p>{profile.summary}</p>
                        </div>

                        <div className="plans-profile__highlights">
                          {profile.highlights.map((highlight) => (
                            <div key={highlight} className="plans-profile__highlight">
                              <span className="plans-profile__highlight-icon" aria-hidden="true">
                                <Check size={15} />
                              </span>
                              <span>{highlight}</span>
                            </div>
                          ))}
                        </div>

                        <div className="plans-profile__actions">
                          <a href="#plans-compare" className="plans-profile__link">
                            Ver comparativo
                          </a>
                          <Link to="/login" className="plans-profile__link is-secondary">
                            Ja sou cliente
                          </Link>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="plans-section plans-section--muted" aria-labelledby="plans-differentials-title">
                  <div className="plans-section__header">
                    <h3 id="plans-differentials-title">O que essa tela precisa comunicar de cara</h3>
                    <p>Os mesmos pilares do site oficial, mas apresentados com mais clareza dentro do produto.</p>
                  </div>

                  <div className="plans-differentials">
                    {differentiators.map(({ icon: Icon, title, description }) => (
                      <article key={title} className="plans-differential-card">
                        <div className="plans-differential-card__icon" aria-hidden="true">
                          <Icon size={18} />
                        </div>
                        <div>
                          <h4>{title}</h4>
                          <p>{description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="plans-section" id="plans-compare" aria-labelledby="plans-compare-title">
                  <div className="plans-section__header">
                    <h3 id="plans-compare-title">Comparativo rapido</h3>
                    <p>Uma leitura leve para decidir para onde seguir antes de falar de detalhes comerciais.</p>
                  </div>

                  <div className="plans-compare" role="table" aria-label="Comparativo de perfis de plano">
                    <div className="plans-compare__header" role="rowgroup">
                      <div className="plans-compare__row is-heading" role="row">
                        <span role="columnheader">Criterio</span>
                        <span role="columnheader">10 a 29</span>
                        <span role="columnheader">30 a 200</span>
                        <span role="columnheader">200+</span>
                      </div>
                    </div>

                    <div className="plans-compare__body" role="rowgroup">
                      {compareRows.map((row) => (
                        <div key={row.label} className="plans-compare__row" role="row">
                          <strong role="rowheader">{row.label}</strong>
                          {row.values.map((value) => (
                            <span key={value} role="cell">
                              {value}
                            </span>
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </section>

                <section className="plans-section plans-section--compact" aria-labelledby="plans-extensions-title">
                  <div className="plans-section__header">
                    <h3 id="plans-extensions-title">Servicos que vao alem do plano</h3>
                    <p>A area final reforca que o beneficio pode se expandir sem mudar a narrativa da pagina.</p>
                  </div>

                  <div className="plans-extensions">
                    {serviceExtensions.map(({ icon: Icon, title, description }) => (
                      <article key={title} className="plans-extension-card">
                        <div className="plans-extension-card__icon" aria-hidden="true">
                          <Icon size={18} />
                        </div>
                        <h4>{title}</h4>
                        <p>{description}</p>
                      </article>
                    ))}
                  </div>
                </section>

                <div className="plans-trust-note">
                  <div className="plans-trust-note__icon" aria-hidden="true">
                    <ShieldCheck size={16} />
                  </div>
                  <div className="plans-trust-note__content">
                    <strong>Proposta de conteudo inspirada no posicionamento atual da Care Plus.</strong>
                    <p>
                      A composicao prioriza cuidado premium, saude digital, suporte ao RH e crescimento por porte de empresa,
                      sem abandonar o visual forte das telas de autenticacao.
                    </p>
                  </div>
                </div>

                <div className="plans-panel__footer">
                  <Link to="/cadastro" className="plans-primary-action">
                    Quero continuar no fluxo
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>

                  <Link to="/login" className="plans-text-link">
                    Entrar com minha conta
                  </Link>
                </div>

                <div className="plans-panel__caption">
                  <CircleHelp size={15} aria-hidden="true" />
                  <span>Os CTA comerciais podem virar proposta, simulacao ou contato quando esse fluxo for conectado.</span>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default PlansPage;
