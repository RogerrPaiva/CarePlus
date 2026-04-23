import { useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, Crown, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import CarePlus from "../assets/branding/CarePlus.svg";
import { readOnboardingFlowContext } from "../features/onboarding/flowStorage";
import "./PlansPage.css";

const planSteps = [
  { number: 1, title: "Permissões e ajustes iniciais", status: "Concluído" },
  { number: 2, title: "Preferências de cuidado", status: "Concluído" },
  { number: 3, title: "Confirmação final", status: "Concluído" },
  { number: 4, title: "Planos", status: "Próximo passo" },
];

const comparisonRows = [
  "Frequência de acompanhamento",
  "Lembretes inteligentes",
  "Conteúdos personalizados",
  "Suporte ampliado",
  "Relatórios de progresso",
  "Benefícios exclusivos",
];

const plans = [
  {
    key: "essencial",
    title: "Essencial",
    description: "Acompanhamento básico, lembretes e visão da rotina.",
    price: "R$29",
    cycle: "/mes",
    icon: Heart,
    values: ["Mensal", true, false, false, "Visao basica", false],
  },
  {
    key: "equilibrio",
    title: "Equilibrio",
    description: "Metas personalizadas, acompanhamento mais frequente e conteúdos de bem-estar.",
    price: "R$59",
    cycle: "/mes",
    icon: Star,
    values: ["Semanal", true, true, true, "Detalhados", false],
    recommended: true,
  },
  {
    key: "integral",
    title: "Integral",
    description: "Experiência completa, acompanhamento ampliado e benefícios extras.",
    price: "R$89",
    cycle: "/mes",
    icon: Crown,
    values: ["Ilimitada", true, true, true, "Avançados", true],
  },
];

function buildPlansFlowContext(navigationState, storedContext) {
  return {
    origin: navigationState?.origin ?? storedContext?.origin ?? null,
  };
}

function PlansPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const flowContext = buildPlansFlowContext(location.state, readOnboardingFlowContext());
  const backButtonLabel = flowContext.origin === "signup" ? "Voltar para o cadastro" : "Voltar";

  useEffect(() => {
    document.title = "Care Plus | Planos";
  }, []);

  function handleBackToReview() {
    navigate("/onboarding", {
      state: {
        ...location.state,
        currentStepNumber: 3,
      },
    });
  }

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="plans-shell">
        <section className="plans-page" aria-labelledby="plans-title">
          <div className="container-fluid custom-container">
            <div className="plans-stage-grid">
              <aside className="plans-hero-panel" aria-label="Resumo da jornada de planos">
                <Link to="/" className="plans-brand" aria-label="Ir para a home do Care Plus">
                  <img src={CarePlus} alt="Care Plus" className="plans-brand__logo" />
                </Link>

                <div className="plans-hero-panel__body">
                  <div className="plans-hero-panel__copy">
                    <h1 id="plans-title">Seu cuidado continua daqui.</h1>
                    <p>Escolha o formato de acompanhamento que melhor combina com a sua rotina e seus objetivos.</p>
                  </div>

                  <div className="plans-journey" aria-label="Etapas do fluxo">
                    {planSteps.map((step) => (
                      <div
                        key={step.number}
                        className={`plans-journey__step ${step.number === 4 ? "is-current" : "is-completed"}`}
                      >
                        <span className="plans-journey__marker" aria-hidden="true">
                          {step.number}
                        </span>
                        <div className="plans-journey__text">
                          <strong>{step.title}</strong>
                          <span>{step.status}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </aside>

              <div className="plans-content-panel">
                <header className="plans-topbar">
                  <span className="plans-step-pill">
                    <Sparkles size={14} aria-hidden="true" />
                    <span>Próximo passo</span>
                  </span>

                  <button type="button" className="plans-back-button" onClick={handleBackToReview}>
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>{backButtonLabel}</span>
                  </button>
                </header>

                <div className="plans-content-panel__inner">
                  <section className="plans-main-section" aria-labelledby="plans-section-title">
                    <div className="plans-main-section__header">
                      <h2 id="plans-section-title">Planos e recursos</h2>
                      <p>Escolha o formato que mais combina com sua rotina e seus objetivos de cuidado.</p>
                    </div>

                    <div className="plans-matrix" role="table" aria-label="Comparativo dos planos do Care Plus">
                      <div className="plans-matrix__labels" aria-hidden="true">
                        <div className="plans-matrix__labels-spacer" />
                        {comparisonRows.map((rowTitle) => (
                          <span key={rowTitle} className="plans-matrix__row-label">
                            {rowTitle}
                          </span>
                        ))}
                      </div>

                      {plans.map((plan) => {
                        const Icon = plan.icon;

                        return (
                          <article
                            key={plan.key}
                            className={`plans-matrix__plan ${plan.recommended ? "is-recommended" : ""}`}
                            aria-label={`Plano ${plan.title}`}
                          >
                            <div className="plan-column">
                              {plan.recommended ? (
                                <span className="plan-column__badge">
                                  <Star size={12} aria-hidden="true" />
                                  <span>Recomendado</span>
                                </span>
                              ) : null}

                              <span className="plan-column__icon" aria-hidden="true">
                                <Icon size={28} />
                              </span>

                              <div className="plan-column__heading">
                                <strong>{plan.title}</strong>
                                <p>{plan.description}</p>
                              </div>

                              <div className="plan-column__price">
                                <strong>{plan.price}</strong>
                                <span>{plan.cycle}</span>
                              </div>
                            </div>

                            <div className="plans-matrix__values">
                              {plan.values.map((value, index) => (
                                <div key={`${plan.key}-${comparisonRows[index]}`} className="plans-matrix__value">
                                  <span className="plans-matrix__value-label">{comparisonRows[index]}</span>
                                  {typeof value === "boolean" ? (
                                    value ? (
                                      <Check size={18} aria-hidden="true" />
                                    ) : (
                                      <span className="plans-matrix__dash">-</span>
                                    )
                                  ) : (
                                    <span>{value}</span>
                                  )}
                                </div>
                              ))}
                            </div>
                          </article>
                        );
                      })}
                    </div>

                    <div className="plans-trust-card">
                      <span className="plans-trust-card__icon" aria-hidden="true">
                        <ShieldCheck size={18} />
                      </span>
                      <div>
                        <strong>Você pode mudar de plano depois.</strong>
                        <p>Sem fidelidade. Cancele quando quiser.</p>
                      </div>
                    </div>

                    <div className="plans-footer-actions">
                      <button type="button" className="plans-secondary-button">
                        Continuar com plano recomendado
                      </button>

                      <button type="button" className="plans-primary-button">
                        <span>Escolher plano</span>
                        <ArrowRight size={18} aria-hidden="true" />
                      </button>
                    </div>
                  </section>
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
