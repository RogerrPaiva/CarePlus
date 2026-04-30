import { useEffect, useMemo, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight, Check, ShieldCheck, Sparkles, Star } from "lucide-react";
import CarePlus from "../../../assets/branding/CarePlus.svg";
import { completeUserOnboarding } from "../../../lib/api";
import { readAuthenticatedUser, saveAuthenticatedUser } from "../../auth/authStorage";
import { readOnboardingFlowContext, writeOnboardingFlowContext } from "../../onboarding/flowStorage";
import { comparisonRows, getPlanByKey, getRecommendedPlan, plans } from "../planCatalog";
import "../styles/PlansPage.css";

const planSteps = [
  { number: 1, title: "Acesso e ajustes iniciais", status: "Concluido" },
  { number: 2, title: "Preferencias de cuidado", status: "Concluido" },
  { number: 3, title: "Revisao das respostas", status: "Concluido" },
  { number: 4, title: "Plano de cuidado", status: "Defina sua experiencia" },
];

function buildPlansFlowContext(navigationState, storedContext) {
  return {
    origin: navigationState?.origin ?? storedContext?.origin ?? null,
    account: navigationState?.account ?? storedContext?.account ?? null,
    email: navigationState?.email ?? storedContext?.email ?? "",
    preferences: navigationState?.preferences ?? storedContext?.preferences ?? null,
    selectedPlan: navigationState?.selectedPlan ?? storedContext?.selectedPlan ?? null,
  };
}

function PlansPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const flowContext = useMemo(
    () => buildPlansFlowContext(location.state, readOnboardingFlowContext()),
    [location.state],
  );
  const [selectedPlanKey, setSelectedPlanKey] = useState(() => flowContext.selectedPlan?.key ?? getRecommendedPlan().key);
  const selectedPlan = useMemo(() => getPlanByKey(selectedPlanKey) ?? getRecommendedPlan(), [selectedPlanKey]);
  const backButtonLabel = flowContext.origin === "signup" ? "Voltar para o cadastro" : "Voltar";

  useEffect(() => {
    document.title = "Care Plus | Planos";
  }, []);

  useEffect(() => {
    writeOnboardingFlowContext({
      ...flowContext,
      selectedPlan,
    });
  }, [flowContext, selectedPlan]);

  function handleBackToReview() {
    if (window.history.length > 1) {
      navigate(-1);
      return;
    }

    navigate("/onboarding", {
      state: {
        ...flowContext,
        currentStepNumber: 3,
        selectedPlan,
      },
    });
  }

  async function handleConfirmPlan(planToConfirm = selectedPlan) {
    const nextFlowContext = {
      ...flowContext,
      currentStepNumber: 3,
      selectedPlan: planToConfirm,
    };

    const authenticatedUser = readAuthenticatedUser();

    if (authenticatedUser) {
      const nextAuthenticatedUser = {
        ...authenticatedUser,
        selected_plan: planToConfirm.key,
        onboarding_completed: true,
      };

      saveAuthenticatedUser(nextAuthenticatedUser);

      if (authenticatedUser.id) {
        const response = await completeUserOnboarding(authenticatedUser.id, {
          selected_plan: planToConfirm.key,
        });

        saveAuthenticatedUser(response?.user ?? nextAuthenticatedUser);
      }
    }

    writeOnboardingFlowContext(nextFlowContext);
  }

  async function handleSelectRecommendedPlan() {
    const recommendedPlan = getRecommendedPlan();
    setSelectedPlanKey(recommendedPlan.key);
    await handleConfirmPlan(recommendedPlan);
    navigate("/", {
      state: {
        selectedPlan: recommendedPlan,
      },
    });
  }

  async function handleFinishPlans() {
    await handleConfirmPlan();
    navigate("/");
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
                    <h1 id="plans-title">Seu cuidado comeca aqui.</h1>
                    <p>Escolha o acompanhamento que combina com sua rotina, metas e momento de vida.</p>
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
                    <span>Ultimo passo</span>
                  </span>

                  <button type="button" className="plans-back-button" onClick={handleBackToReview}>
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>{backButtonLabel}</span>
                  </button>
                </header>

                <div className="plans-content-panel__inner">
                  <section className="plans-main-section" aria-labelledby="plans-section-title">
                    <div className="plans-main-section__header">
                      <h2 id="plans-section-title">Escolha seu plano de cuidado</h2>
                      <p>Selecione uma opcao para comecar agora. Voce pode trocar de plano depois, sem fidelidade.</p>
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
                        const isSelected = selectedPlanKey === plan.key;

                        return (
                          <article
                            key={plan.key}
                            className={`plans-matrix__plan ${plan.recommended ? "is-recommended" : ""} ${
                              isSelected ? "is-selected" : ""
                            }`}
                            aria-label={`Plano ${plan.title}`}
                          >
                            <button
                              type="button"
                              className="plan-column"
                              onClick={() => setSelectedPlanKey(plan.key)}
                              aria-pressed={isSelected}
                            >
                              {plan.recommended ? (
                                <span className="plan-column__badge">
                                  <Star size={12} aria-hidden="true" />
                                  <span>Recomendado</span>
                                </span>
                              ) : null}

                              {isSelected ? <span className="plan-column__selection">Selecionado</span> : null}

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
                            </button>

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
                        <strong>{selectedPlan.title} selecionado para sua jornada.</strong>
                        <p>Sem fidelidade, com liberdade para ajustar quando precisar.</p>
                      </div>
                    </div>

                    <div className="plans-footer-actions">
                      <button type="button" className="plans-secondary-button" onClick={handleSelectRecommendedPlan}>
                        Usar recomendacao do Care Plus
                      </button>

                      <button type="button" className="plans-primary-button" onClick={handleFinishPlans}>
                        <span>{`Confirmar ${selectedPlan.title}`}</span>
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
