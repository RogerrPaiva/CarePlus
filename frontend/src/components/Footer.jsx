import { FileText, Stethoscope } from "lucide-react";
import {
  FaFacebookF,
  FaYoutube,
  FaInstagram,
  FaLinkedinIn,
  FaFileMedical,
  FaGooglePlay,
  FaApple,
} from "react-icons/fa";
import ANS from "../assets/ANS.svg";
import GODADDY from "../assets/GODADDY.png";
import "../css/footer.css";

function Footer() {
  return (
    <footer>
      {/* Parte principal */}
      <div className="footer-main text-white">
        <div className="container-fluid custom-container py-5">
          {/* Cards do topo */}
          <div className="row g-4">
            <div className="col-12 col-md-4">
              <a href="#" className="footer-card">
                <FaFileMedical size={22} className="footer-card-icon" />
                <span className="footer-card-text">Resultado de Exames</span>
              </a>
            </div>

            <div className="col-12 col-md-4">
              <a href="#" className="footer-card">
                <FileText size={22} className="footer-card-icon" />
                <span className="footer-card-text">Convênios Médicos</span>
              </a>
            </div>

            <div className="col-12 col-md-4">
              <a href="#" className="footer-card">
                <Stethoscope size={22} className="footer-card-icon" />
                <span className="footer-card-text">Encontre um Médico</span>
              </a>
            </div>
          </div>

          <hr className="footer-divider my-5" />

          {/* Links principais */}
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="footer-title">Sobre a CarePlus</h3>
              <ul className="footer-links">
                <li><a href="#">A empresa</a></li>
                <li><a href="#">Diferenciais</a></li>
                <li><a href="#">Rede Plus</a></li>
                <li><a href="#">Gestão De Saúde</a></li>
                <li><a href="#">O Lado Plus Da Saúde</a></li>
                <li><a href="#">Responsabilidade Social</a></li>
                <li><a href="#">Perguntas Frequentes</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="footer-title">Planos e Produtos</h3>
              <ul className="footer-links">
                <li><a href="#">Planos Individuais</a></li>
                <li><a href="#">Coberturas</a></li>
                <li><a href="#">Tabela de Preços</a></li>
                <li><a href="#">Planos Empresariais</a></li>
                <li><a href="#">Benefícios</a></li>
                <li><a href="#">Comparar Planos</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="footer-title">Carreira</h3>
              <ul className="footer-links">
                <li><a href="#">Carreiras</a></li>
                <li><a href="#">Vagas</a></li>
              </ul>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h3 className="footer-title">Fale Conosco</h3>
              <ul className="footer-links">
                <li><a href="#">Solicite Uma Proposta</a></li>
                <li><a href="#">Contato</a></li>
                <li><a href="#">Canal de Denúncias</a></li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Faixa inferior */}
      <div className="footer-bottom text-white">
        <div className="container-fluid custom-container py-5">
          <div className="row g-4">
            <div className="col-12 col-md-6 col-lg-3">
              <h4 className="footer-subtitle">Certificações</h4>
              <img src={GODADDY} alt="Certificações" className="img-fluid footer-cert-img" />
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h4 className="footer-subtitle">Baixe o app Care Plus</h4>
              <div className="d-flex flex-wrap gap-3">
                <a
                  href="https://play.google.com/store/apps/details?id=com.careplus.mobile&hl=pt_BR"
                  className="store-btn"
                >
                  <FaGooglePlay size={20} />
                  <span>Google Play</span>
                </a>

                <a
                  href="https://apps.apple.com/br/app/care-plus/id899562421"
                  className="store-btn"
                >
                  <FaApple size={20} />
                  <span>App Store</span>
                </a>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h4 className="footer-subtitle">ANS</h4>
              <div className="d-flex flex-column gap-3">
                <img
                  src={ANS}
                  alt="Logo ANS"
                  className="footer-ans-logo"
                />
                <div className="ans-badge">
                  ANS Nº 37995-6
                </div>
              </div>
            </div>

            <div className="col-12 col-md-6 col-lg-3">
              <h4 className="footer-subtitle">Redes Sociais</h4>
              <div className="social-links">
                <a href="#"><FaLinkedinIn /></a>
                <a href="#"><FaInstagram /></a>
                <a href="#"><FaFacebookF /></a>
                <a href="#"><FaYoutube /></a>
              </div>
            </div>
          </div>

          <hr className="footer-line my-4" />

          <div className="row gy-4 align-items-center">
            <div className="col-12 col-lg-6">
              <div className="footer-copy">
                © 2026 - Care Plus Medicina Assistencial LTDA | Todos os direitos reservados
                <br />
                CNPJ: 00.000.000/0001-00
                <br />
                Endereço: Alameda Exemplo, 687 - 12º andar
                <br />
                Alphaville - Barueri - SP - CEP: 06454-040
              </div>
            </div>

            <div className="col-12 col-lg-6">
              <div className="footer-bottom-links">
                <a href="#">Acessibilidade</a>
                <a href="#">Aviso de Privacidade</a>
                <a href="#">Termos & Condições</a>
                <a href="#">Contato</a>
                <a href="#">Mapa do site</a>
                <a href="#">Transparência Salarial</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;