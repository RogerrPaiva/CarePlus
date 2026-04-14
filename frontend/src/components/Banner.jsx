import {
  ChevronRight,
  ChevronLeft,
  Stethoscope,
  Ambulance,
  FileText,
} from "lucide-react";
import { MdHealthAndSafety,} from "react-icons/md";
import { FaUserMd } from "react-icons/fa";
import bannerImg from "../assets/bannersaude.jpg";
import "../css/banner.css";

function Banner() {
  return (
    <section className="health-banner-section">
      <div className="container-fluid custom-container">
        <div className="row g-4 align-items-stretch">
          {/* Lado esquerdo */}
          <div className="col-lg-6">
            <div className="health-banner-left">
              <h1 className="health-banner-title">
                Soluções personalizadas em saúde com absoluta dedicação e cuidado
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
                  <span className="health-link-text">Encontre um Médico</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

                <a href="#" className="health-link-card">
                  <span className="health-link-icon">
                    <FileText size={18} />
                  </span>
                  <span className="health-link-text">Resultados de Exames</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

                <a href="#" className="health-link-card">
                  <span className="health-link-icon">
                    <FaUserMd size={18} />
                  </span>
                  <span className="health-link-text">Programas Empresariais</span>
                  <ChevronRight size={18} className="health-link-arrow" />
                </a>

              </div>
            </div>
          </div>

          {/* Lado direito */}
          <div className="col-lg-6">
            <div className="health-banner-card">
              <img
                src={bannerImg}
                alt="Banner saúde"
                className="health-banner-image"
              />

              <div className="health-banner-overlay"></div>

              <div className="health-banner-content">
                <h2 className="health-banner-card-title">
                  Atendimento médico adulto e pediátrico imediato
                </h2>

                <a href="#" className="health-banner-btn">
                  Saiba mais
                </a>
              </div>

              <div className="health-banner-arrows">
                <button className="health-arrow-btn">
                  <ChevronLeft size={24} />
                </button>
                <button className="health-arrow-btn">
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Banner;