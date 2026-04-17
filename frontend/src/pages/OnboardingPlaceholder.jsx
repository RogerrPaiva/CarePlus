import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { ArrowLeft, ArrowRight, ShieldCheck } from "lucide-react";
import CarePlus from "../assets/CarePlus.svg";
import "./OnboardingPlaceholder.css";

function OnboardingPlaceholder() {
  const { state } = useLocation();
  const origin = state?.origin;
  const account = state?.account;

  useEffect(() => {
    document.title = "Care Plus | Proxima etapa";
  }, []);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteudo
      </a>

      <main id="main-content" className="product-page onboarding-shell">
        <section className="onboarding-placeholder" aria-labelledby="onboarding-title">
          <div className="container onboarding-placeholder__container">
            <div className="onboarding-placeholder__brand">
              <img src={CarePlus} alt="Care Plus" />
            </div>

            <div className="onboarding-placeholder__card">
              <span className="onboarding-placeholder__eyebrow">Proxima etapa</span>
              <h1 id="onboarding-title">
                {origin === "signup" ? "Conta criada com sucesso." : "Acesso validado com sucesso."}
              </h1>
              <p>
                Consentimentos, permissoes e preferencias de cuidado ficam na etapa de onboarding, que sera conectada em
                seguida sem misturar essa definicao com a abertura de conta.
              </p>

              {account ? (
                <div className="onboarding-placeholder__summary" aria-label="Dados levados para a proxima etapa">
                  <strong>Dados preparados para a sequencia</strong>
                  <span>{account.fullName}</span>
                  <span>{account.email}</span>
                </div>
              ) : null}

              <div className="onboarding-placeholder__trust">
                <ShieldCheck size={18} aria-hidden="true" />
                <p>Seus consentimentos de saude serao revisados separadamente, com clareza de permissoes.</p>
              </div>

              <div className="onboarding-placeholder__actions">
                <Link to="/login" className="onboarding-placeholder__secondary">
                  <ArrowLeft size={18} aria-hidden="true" />
                  Voltar para o login
                </Link>

                <Link to="/cadastro" className="onboarding-placeholder__primary">
                  Revisar cadastro
                  <ArrowRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

export default OnboardingPlaceholder;
