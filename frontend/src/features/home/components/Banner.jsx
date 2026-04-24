import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  FileText,
} from "lucide-react";
import { MdHealthAndSafety } from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import recepcaoBrooklin from "../../../assets/home/recepcaobrooklin.webp";
import recepcaoMorumbi from "../../../assets/home/recepcaomorumbi.jpg";
import recepcaoRio from "../../../assets/home/recepcaorj.jpg";
import bannerSaude from "../../../assets/home/bannersaude.jpg";
import "../styles/banner.css";

const bannerSlides = [
  {
    image: recepcaoBrooklin,
    alt: "Recepcao da unidade Brooklin",
    title: "Recepcao moderna para um atendimento mais leve no Brooklin",
    objectPosition: "center center",
  },
  {
    image: recepcaoMorumbi,
    alt: "Recepcao da unidade Morumbi",
    title: "Ambiente acolhedor para voce chegar bem desde o primeiro contato",
    objectPosition: "center center",
  },
  {
    image: recepcaoRio,
    alt: "Recepcao da unidade do Rio de Janeiro",
    title: "Estrutura pronta para receber adultos e familias com mais proximidade",
    objectPosition: "center 22%",
  },
  {
    image: bannerSaude,
    alt: "Unidade de atendimento Care Plus",
    title: "Cuidado completo em saude para empresas, familias e beneficiarios",
    objectPosition: "center center",
  },
];

function Banner() {
  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const currentSlide = bannerSlides[currentSlideIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlideIndex((currentIndex) => (currentIndex + 1) % bannerSlides.length);
    }, 4500);

    return () => {
      window.clearInterval(intervalId);
    };
  }, []);

  function handlePreviousSlide() {
    setCurrentSlideIndex((currentIndex) => (currentIndex - 1 + bannerSlides.length) % bannerSlides.length);
  }

  function handleNextSlide() {
    setCurrentSlideIndex((currentIndex) => (currentIndex + 1) % bannerSlides.length);
  }

  return (
    <section className="health-banner-section">
      <div className="container-fluid custom-container">
        <div className="row g-4 align-items-stretch">
          {/* Lado esquerdo */}
          <div className="col-lg-6">
            <div className="health-banner-left">
              <h1 className="health-banner-title">
                Solucoes personalizadas em saude com absoluta dedicacao e cuidado
              </h1>

              <div className="health-links-list">
                <a href="#" className="health-link-card">
                  <span className="health-link-icon">
                    <MdHealthAndSafety size={18} />
                  </span>
                  <span className="health-link-text">Programas Preventivos</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

                <a href="#" className="health-link-card">
                  <span className="health-link-icon">
                    <Stethoscope size={18} />
                  </span>
                  <span className="health-link-text">Encontre um Medico</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

                <a href="#" className="health-link-card">
                  <span className="health-link-icon">
                    <FileText size={18} />
                  </span>
                  <span className="health-link-text">Resultados de Exames</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

                <Link to="/planos" className="health-link-card">
                  <span className="health-link-icon">
                    <FaUserMd size={18} />
                  </span>
                  <span className="health-link-text">Programas Empresariais</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </Link>
              </div>
            </div>
          </div>

          {/* Lado direito */}
          <div className="col-lg-6">
            <div className="health-banner-card">
              <img
                src={currentSlide.image}
                alt={currentSlide.alt}
                className="health-banner-image"
                style={{ objectPosition: currentSlide.objectPosition }}
              />

              <div className="Health-card-banner-text">
                <Link to="/planos" className="health-banner-btn">
                  Saiba mais
                </Link>
              </div>

              <div className="health-banner-overlay"></div>

              <div className="health-banner-content">
                <h2 className="health-banner-card-title">
                  {currentSlide.title}
                </h2>
              </div>

              <div className="health-banner-arrows">
                <button type="button" className="health-arrow-btn" onClick={handlePreviousSlide} aria-label="Imagem anterior">
                  <ChevronLeft size={24} />
                </button>
                <button type="button" className="health-arrow-btn" onClick={handleNextSlide} aria-label="Proxima imagem">
                  <ChevronRight size={24} />
                </button>
              </div>

              <div className="health-banner-dots" aria-label="Navegacao do carrossel">
                {bannerSlides.map((slide, index) => (
                  <button
                    key={slide.alt}
                    type="button"
                    className={`health-banner-dot ${index === currentSlideIndex ? "is-active" : ""}`}
                    onClick={() => setCurrentSlideIndex(index)}
                    aria-label={`Ir para imagem ${index + 1}`}
                    aria-pressed={index === currentSlideIndex}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;
