import { useState } from "react";
import { Link } from "react-router-dom";
import { FaChevronRight } from "react-icons/fa";
import {
  Briefcase,
  Building2,
  BriefcaseMedical,
  HeartPulse,
  ShieldPlus,
  UserRound,
} from "lucide-react";
import { BsArrowRight } from "react-icons/bs";
import { MdLaptopChromebook } from "react-icons/md";
import HomeOcupacional from "../../../assets/home/home-ocupacional.jpg";
import Humanizacao from "../../../assets/home/humanizacao.jpg";
import SobreSoho from "../../../assets/home/sobre_plano_soho.png";
import BannerSaude from "../../../assets/home/bannersaude.jpg";
import recepcaomorumbi from "../../../assets/home/recepcaomorumbi.jpg";
import recepcaorj from "../../../assets/home/recepcaomorumbi.jpg";
import recepcaobrooklin from "../../../assets/home/recepcaobrooklin.webp";
import recepcaopinheiros from "../../../assets/home/recepcaopinheiros.webp";
import rh from "../../../assets/home/rh.svg";
import credenciado from "../../../assets/home/credenciado.svg";
import corretor from "../../../assets/home/corretor.svg";
import beneficiario from "../../../assets/home/beneficiario.svg";


import "../styles/home.css";

const plans = [
  {
    title: "Care Plus Soho",
    subtitle: "De 10 a 29 vidas",
    description:
      "O Care Plus Soho apresenta planos para pequenas empresas, de 10 a 29 vidas e e indicado para aquelas que atuam em home office ou com operacoes mais enxutas.",
    image: SobreSoho,
    href: "/planos/soho",
    linkLabel: "Conheca o Care Plus Soho",
    accentClass: "is-green",
  },
  {
    title: "Clube Care Plus",
    subtitle: "De 30 a 200 vidas",
    description:
      "O Clube Care Plus apresenta planos para empresas, de 30 a 200 vidas e e indicado para aquelas que estao em crescimento e expandindo seus negocios.",
    image: Humanizacao,
    href: "/planos/clube",
    linkLabel: "Conheca o Clube Care Plus",
    accentClass: "is-green",
  },
  {
    title: "Care Plus Empresarial",
    subtitle: "Para mais de 200 vidas",
    description:
      "O Care Plus Empresarial apresenta planos totalmente customizaveis, para mais de 200 vidas e e indicado para grandes empresas.",
    image: HomeOcupacional,
    href: "/planos/empresarial",
    linkLabel: "Conheca o Care Plus Empresarial",
    accentClass: "is-green",
  },
];

const exclusivePrograms = [
  {
    title: "Programas Preventivos",
    description:
      "A Care Plus oferece diversos programas preventivos de saude e acompanhamento, para uma vida saudavel.",
    Icon: ShieldPlus,
  },
  {
    title: "Servicos On-line",
    description:
      "Os beneficiarios podem aproveitar vantagens a distancia com a qualidade, o carinho e o cuidado que so a Care Plus tem.",
    Icon: MdLaptopChromebook,
  },
  {
    title: "Programa de Prevencao a Doencas Cardiovasculares",
    description:
      "A Care Plus oferece consultas em clinicas proprias com medicos, nutricionistas e psicologos. Conheca os programas.",
    Icon: HeartPulse,
  },
  {
    title: "Programas Empresariais",
    description:
      "A Care Plus disponibiliza medicos, nutricionistas, enfermeiras e psicologos para realizar atendimento no ambiente das empresas.",
    Icon: BriefcaseMedical,
  },
];

const locations = [
  {
    title: "Care Plus Barueri",
    subtitle: "Unidade Alphaville",
    image: BannerSaude,
    href: "/unidades/alphaville",
    imagePosition: "center center",
  },
  {
    title: "Care Plus São Paulo",
    subtitle: "Unidade Morumbi",
    image: recepcaomorumbi,
    href: "/unidades/morumbi",
    imagePosition: "center center",
  },
  {
    title: "Care Plus Rio de Janeiro",
    subtitle: "Unidade Rio Sul",
    image: recepcaorj,
    href: "/unidades/rj",
    imagePosition: "center center",
  },
  {
    title: "Care Plus São Paulo",
    subtitle: "Unidade Brooklin",
    image: recepcaobrooklin,
    href: "/unidades/brooklin",
    imagePosition: "center center",
  },
];

const audienceProfiles = [
  {
    id: "beneficiario",
    label: "Sou Beneficiário",
    title: "Sou Beneficiário",
    description:
      "Acompanhe serviços, orientações e facilidades digitais para tornar o cuidado mais simples no seu dia a dia.",
    href: "/beneficiario",
    cta: "Visite sua área",
    image: beneficiario,
    imageAlt: "Beneficiária Care Plus",
    Icon: UserRound,
  },
  {
    id: "rh",
    label: "Sou RH",
    title: "Sou RH",
    description:
      "Tenha acesso a um ambiente feito para gestão de saúde corporativa, suporte operacional e acompanhamento da carteira.",
    href: "/rh",
    cta: "Acessar portal RH",
    image: rh,
    imageAlt: "Área de RH Care Plus",
    Icon: Briefcase,
  },
  {
    id: "corretor",
    label: "Sou Corretor",
    title: "Sou Corretor",
    description:
      "Consulte materiais comerciais, recursos de apoio e informações rápidas para apoiar suas negociações.",
    href: "/corretor",
    cta: "Entrar como corretor",
    image: corretor,
    imageAlt: "Área do corretor Care Plus",
    Icon: ShieldPlus,
  },
  {
    id: "credenciado",
    label: "Sou Credenciado",
    title: "Sou Credenciado",
    description:
      "Para você que é nosso parceiro e oferece atendimento médico e odontológico aos nossos beneficiários.",
    href: "/credenciado",
    cta: "Visite sua área",
    image: credenciado,
    imageAlt: "Área do credenciado Care Plus",
    Icon: Building2,
  },
];

function Home() {
  const [activeAudienceId, setActiveAudienceId] = useState("credenciado");

  const activeAudience =
    audienceProfiles.find((profile) => profile.id === activeAudienceId) ??
    audienceProfiles[0];
  const ActiveAudienceIcon = activeAudience.Icon;

  return (
    <section className="home-plans-section">

      <div className="container-fluid custom-container home-plans-shell">

        <div className="row justify-content-center">
          <div className="col-12 d-flex justify-content-center">
            <div className="home-plans-copy d-flex flex-column align-items-center text-center">
              <p className="home-plans-eyebrow mb-3">NOSSOS PLANOS</p>
              <h2 className="home-plans-title mb-3">
                Soluções personalizadas em saúde
                <br />
                com absoluta dedicação e cuidado
              </h2>
              <p className="home-plans-description mb-0">
                Humanização, qualidade de vida e experiência com
                <br />
                a melhor relação custo-benefício
              </p>
            </div>
          </div>
        </div>

        <div className="row g-4 justify-content-center home-plans-grid">
          {plans.map((plan) => (
            <div className="col-12 col-md-6 col-xl-4" key={plan.title}>
              <article className="plan-card">
                <div className="plan-card__media">
                  <img className="plan-card__image" src={plan.image} alt={plan.title} />
                </div>

                <div className="plan-card__body">
                  <h3 className={`plan-card__title ${plan.accentClass}`}>{plan.title}</h3>
                  <p className="plan-card__subtitle">{plan.subtitle}</p>
                  <p className="plan-card__description">{plan.description}</p>

                  <Link to={plan.href} className={`plan-card__link ${plan.accentClass}`}>
                    <span>{plan.linkLabel}</span>
                    <FaChevronRight aria-hidden="true" />
                  </Link>
                </div>
              </article>
            </div>
          ))}
        </div>

        <div className="home-plans-actions d-flex justify-content-center">
          <Link to="/planos" className="home-plans-button">
            Ver Planos e Produtos
            <FaChevronRight aria-hidden="true" />
          </Link>
        </div>

        <section className="exclusive-programs-section">
          <div className="row justify-content-center">
            <div className="col-12 d-flex justify-content-center">
              <div className="exclusive-programs-copy text-center">
                <h2 className="exclusive-programs-title">
                  Programas e servicos exclusivos:
                  <br />
                  <span>a melhor experiencia em saude</span>
                </h2>
                <p className="exclusive-programs-description mb-0">
                  Mais do que cuidado, a Care Plus proporciona facilidade e comodidade
                  <br />
                  para todos os beneficiarios e empresas.
                </p>
              </div>
            </div>
          </div>

          <div className="row g-4 justify-content-center exclusive-programs-grid">
            {exclusivePrograms.map((item) => {
              const IconComponent = item.Icon;

              return (
                <div className="col-12 col-sm-6 col-xl-3" key={item.title}>
                  <article className="exclusive-program-card">
                    <div className="exclusive-program-card__icon">
                      <IconComponent size={28} aria-hidden="true" />
                    </div>

                    <div className="exclusive-program-card__body">
                      <h3 className="exclusive-program-card__title">{item.title}</h3>
                      <p className="exclusive-program-card__description">{item.description}</p>
                    </div>
                  </article>
                </div>
              );
            })}
          </div>

          <div className="exclusive-programs-actions d-flex justify-content-center">
            <Link to="/gestao-de-saude" className="exclusive-programs-button">
              Conheça a Gestão de Saúde
              <FaChevronRight aria-hidden="true" />
            </Link>
          </div>
        </section>

        <section className="audience-section">
          <div className="row justify-content-center">
            <div className="col-12 col-xl-8">
              <div className="audience-copy text-center mx-auto">
                <p className="home-plans-eyebrow mb-3">PARA QUEM BUSCA</p>
                <h2 className="audience-title">
                  Um espaço personalizado
                  <br />
                  para o seu perfil
                </h2>
              </div>
            </div>
          </div>

          <div
            className="audience-tabs"
            role="tablist"
            aria-label="Perfis de acesso Care Plus"
          >
            {audienceProfiles.map((profile) => {
              const IconComponent = profile.Icon;
              const isActive = profile.id === activeAudienceId;

              return (
                <button
                  key={profile.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`audience-tab ${isActive ? "is-active" : ""}`}
                  onClick={() => setActiveAudienceId(profile.id)}
                >
                  <span className="audience-tab__icon">
                    <IconComponent size={20} aria-hidden="true" />
                  </span>
                  <span>{profile.label}</span>
                </button>
              );
            })}
          </div>

          <div className="audience-panel">
            <div className="audience-panel__visual">
              <img
                src={activeAudience.image}
                alt={activeAudience.imageAlt}
                className="audience-panel__image"
              />
            </div>

            <div className="audience-panel__card">
              <div className="audience-panel__icon">
                <ActiveAudienceIcon size={28} aria-hidden="true" />
              </div>

              <div className="audience-panel__content">
                <h3 className="audience-panel__title">{activeAudience.title}</h3>
                <p className="audience-panel__description">
                  {activeAudience.description}
                </p>

                <Link to={activeAudience.href} className="audience-panel__button">
                  <span>{activeAudience.cta}</span>
                  <BsArrowRight size={24} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
        <section className="locations-section">
          <div className="row g-4 g-xl-5 align-items-stretch">
            <div className="col-12 col-lg-4">
              <div className="locations-intro d-flex flex-column justify-content-center h-100">
                <p className="home-plans-eyebrow mb-3">NOSSAS UNIDADES</p>
                <h2 className="locations-title">Locais de atendimento</h2>
                <p className="locations-description">
                  Conheça mais sobre as unidades Care Plus e escolha o ponto de
                  atendimento ideal para a sua empresa e seus beneficiários.
                </p>

                <div className="pt-2">
                  <Link to="/unidades" className="locations-button">
                    Explorar todas as unidades
                  </Link>
                </div>
              </div>
            </div>

            <div className="col-12 col-lg-8">
              <div className="row g-4">
                {locations.slice(0, 2).map((location) => (
                  <div className="col-12 col-md-6" key={location.title}>
                    <Link to={location.href} className="location-card">
                      <img
                        src={location.image}
                        alt={location.title}
                        className="location-card__image"
                        style={{ objectPosition: location.imagePosition }}
                      />
                      <div className="location-card__overlay"></div>
                      <div className="location-card__content">
                        <h3 className="location-card__title">
                          {location.title}
                          <FaChevronRight aria-hidden="true" />
                        </h3>
                        <p className="location-card__subtitle">{location.subtitle}</p>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>

            <div className="col-12">
              <div className="row g-4">
                {locations.slice(2).map((location) => (
                  <div className="col-12 col-md-6 col-xl-4" key={location.title}>
                    <Link to={location.href} className="location-card is-compact">
                      <img
                        src={location.image}
                        alt={location.title}
                        className="location-card__image"
                        style={{ objectPosition: location.imagePosition }}
                      />
                      <div className="location-card__overlay"></div>
                      <div className="location-card__content">
                        <h3 className="location-card__title">
                          {location.title}
                          <FaChevronRight aria-hidden="true" />
                        </h3>
                        <p className="location-card__subtitle">{location.subtitle}</p>
                      </div>
                    </Link>
                  </div>
                ))}
                <div className="col-12 col-md-6 col-xl-4">
                  <Link to="/unidades/internacional" className="location-card is-compact">
                    <img
                      src={recepcaopinheiros}
                      alt="Care Plus Internacional"
                      className="location-card__image"
                      style={{ objectPosition: "center center" }}
                    />
                    <div className="location-card__overlay"></div>
                    <div className="location-card__content">
                      <h3 className="location-card__title">
                        Care Plus São Paulo
                        <FaChevronRight aria-hidden="true" />
                      </h3>
                      <p className="location-card__subtitle">
                        Unidade Pinheiros
                      </p>
                    </div>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
        
      </div>
    </section>
  );
}

export default Home;
