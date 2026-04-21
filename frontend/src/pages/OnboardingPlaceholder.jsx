import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BellRing,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import CarePlus from "../assets/branding/CarePlus.svg";
import "./OnboardingPlaceholder.css";

const steps = [
  {
    title: "Consentimentos iniciais",
    description: "O usuario revisa o que sera opcional, o que e obrigatorio e o que pode ser alterado depois.",
  },
  {
    title: "Preferencias de cuidado",
    description: "A jornada organiza lembretes, prioridades e acompanhamento sem misturar isso com a abertura da conta.",
  },
  {
    title: "Confirmacao final",
    description: "Antes de seguir, o usuario valida a sequencia e enxerga com clareza o que sera habilitado.",
  },
];

function OnboardingPlaceholder() {
  const { state } = useLocation();
  const origin = state?.origin;
  const account = state?.account;
  const emailFromLogin = state?.email;
  const isSignupFlow = origin === "signup";
  const isLoginFlow = origin === "login";

  const heroEyebrow = isSignupFlow ? "Conta aberta com sucesso" : "Entrada confirmada";
  const heroTitle = isSignupFlow
    ? "Sua conta nasceu leve. O onboarding organiza o cuidado agora."
    : "Sua conta entrou. O onboarding organiza consentimentos e preferencias.";
  const heroDescription = isSignupFlow
    ? "Cadastro concluido. A partir daqui, a configuracao entra em uma etapa separada para manter a abertura de conta simples e a experiencia mais clara."
    : "Login validado. A proxima etapa apresenta permissoes, ritmo de acompanhamento e escolhas iniciais sem poluir a tela de acesso.";
  const panelTitle = isSignupFlow ? "Onboarding do Care Plus" : "Proxima etapa do Care Plus";
  const panelDescription = isSignupFlow
    ? "A conta ja esta pronta. Agora o usuario revisa consentimentos e preferencias antes de conectar o cuidado continuo."
    : "Antes de seguir, o onboarding reexplica permissoes e preferencias para que a jornada continue com mais contexto.";
  const summaryLines = account
    ? [account.fullName, account.email, account.phone, account.cpf, account.birthDate].filter(Boolean)
    : [emailFromLogin].filter(Boolean);

  useEffect(() => {
    document.title = "Care Plus | Onboarding";
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="product-page onboarding-shell">
        <section className="onboarding-page" aria-labelledby="onboarding-title">
          <div className="container-fluid custom-container">
            <div className="onboarding-mobile-back">
              <Link
                to={isSignupFlow ? "/cadastro" : "/login"}
                className="onboarding-back-link"
                aria-label={isSignupFlow ? "Voltar para o cadastro" : "Voltar para o login"}
              >
                <ArrowLeft size={20} aria-hidden="true" />
                <span>{isSignupFlow ? "Voltar para o cadastro" : "Voltar para o login"}</span>
              </Link>
            </div>

            <div className="onboarding-grid">
              <div className="onboarding-hero">
                <div className="onboarding-hero__frame">
                  <div className="onboarding-hero__brand">
                    <img src={CarePlus} alt="Care Plus" className="onboarding-hero__logo" />
                  </div>

                  <div className="onboarding-hero__content">
                    <span className="onboarding-hero__eyebrow">{heroEyebrow}</span>
                    <h1>{heroTitle}</h1>
                    <p>{heroDescription}</p>
                  </div>

                  <div className="onboarding-hero__highlights" aria-label="Pontos principais da etapa">
                    <article className="onboarding-highlight-card">
                      <ShieldCheck size={18} aria-hidden="true" />
                      <div>
                        <strong>Permissoes com clareza</strong>
                        <span>Saude, alertas e comunicacoes aparecem separados para revisao objetiva.</span>
                      </div>
                    </article>

                    <article className="onboarding-highlight-card">
                      <BellRing size={18} aria-hidden="true" />
                      <div>
                        <strong>Ritmo configuravel</strong>
                        <span>Lembretes e sequencia de cuidado entram depois do acesso ja confirmado.</span>
                      </div>
                    </article>
                  </div>
                </div>
              </div>

              <div className="onboarding-panel">
                <div className="onboarding-panel__topbar">
                  <Link to={isSignupFlow ? "/cadastro" : "/login"} className="onboarding-back-link">
                    <ArrowLeft size={18} aria-hidden="true" />
                    <span>{isSignupFlow ? "Revisar cadastro" : "Voltar para o login"}</span>
                  </Link>
                </div>

                <div className="onboarding-panel__header">
                  <span className="onboarding-panel__eyebrow">Etapa seguinte</span>
                  <h2 id="onboarding-title">{panelTitle}</h2>
                  <p>{panelDescription}</p>
                </div>

                {summaryLines.length > 0 ? (
                  <section className="onboarding-section onboarding-section--summary" aria-labelledby="onboarding-summary">
                    <div className="onboarding-section__header">
                      <h3 id="onboarding-summary">Dados levados para a sequencia</h3>
                      <p>Resumo do que ja foi validado antes da etapa de onboarding.</p>
                    </div>

                    <div className="onboarding-summary-list">
                      {summaryLines.map((line) => (
                        <div key={line} className="onboarding-summary-item">
                          <BadgeCheck size={16} aria-hidden="true" />
                          <span>{line}</span>
                        </div>
                      ))}
                    </div>
                  </section>
                ) : null}

                <section className="onboarding-section" aria-labelledby="onboarding-steps">
                  <div className="onboarding-section__header">
                    <h3 id="onboarding-steps">O que esta previsto nesta etapa</h3>
                    <p>Fluxo pensado para separar acesso, consentimentos e preferencias sem sobrecarregar o inicio da jornada.</p>
                  </div>

                  <div className="onboarding-step-list">
                    {steps.map((step, index) => (
                      <article key={step.title} className="onboarding-step-card">
                        <div className="onboarding-step-card__index" aria-hidden="true">
                          0{index + 1}
                        </div>
                        <div>
                          <strong>{step.title}</strong>
                          <p>{step.description}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </section>

                <section className="onboarding-section onboarding-section--accent" aria-labelledby="onboarding-trust">
                  <div className="onboarding-section__header">
                    <h3 id="onboarding-trust">Como a etapa se comporta</h3>
                  </div>

                  <div className="onboarding-trust-list">
                    <article className="onboarding-trust-item">
                      <CheckCircle2 size={16} aria-hidden="true" />
                      <span>Conta e onboarding continuam separados para nao confundir cadastro com configuracao de saude.</span>
                    </article>
                    <article className="onboarding-trust-item">
                      <ClipboardList size={16} aria-hidden="true" />
                      <span>As permissoes aparecem com leitura clara antes de qualquer ativacao mais sensivel.</span>
                    </article>
                    <article className="onboarding-trust-item">
                      <Sparkles size={16} aria-hidden="true" />
                      <span>A linguagem da tela aproxima a onboarding do acabamento visual da rodada 20.</span>
                    </article>
                  </div>
                </section>

                <div className="onboarding-actions">
                  <Link to={isSignupFlow ? "/cadastro" : "/login"} className="onboarding-secondary-link">
                    <ArrowLeft size={18} aria-hidden="true" />
                    {isSignupFlow ? "Voltar para o cadastro" : "Voltar para o login"}
                  </Link>

                  <Link to="/planos" className="onboarding-primary-link">
                    Ver tela de planos
                    <ArrowRight size={18} aria-hidden="true" />
                  </Link>
                </div>

                <div className="onboarding-footnote">
                  <div className="onboarding-footnote__icon">
                    <ShieldCheck size={16} aria-hidden="true" />
                  </div>
                  <p>Esta tela permanece como etapa visual orientadora, sem acoplar nova regra de negocio ao backend atual.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default OnboardingPlaceholder;
