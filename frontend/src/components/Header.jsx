import { Search, User, HeadsetIcon } from "lucide-react";
import { FaChevronDown } from "react-icons/fa";
import CarePlus from "../assets/CarePlus.svg";
import "../css/header.css";

function Header() {
  return (
    <header className="header-bootstrap bg-white">
      <div className="topbar border-bottom">
        <div className="container-fluid custom-container">
          <div className="row align-items-center topbar-row">
            <div className="col-lg-2 col-md-3 col-4 d-flex align-items-center">
              <button className="topbar-btn">A+</button>
              <button className="topbar-btn">A-</button>
            </div>

            <div className="col-lg-6 d-none d-lg-flex justify-content-center gap-4">
              <a href="#" className="topbar-link">Benefício</a>
              <a href="#" className="topbar-link">RH</a>
              <a href="#" className="topbar-link">Corretor</a>
              <a href="#" className="topbar-link">Credenciado</a>
            </div>

            <div className="col-lg-4 col-md-9 col-8 d-flex justify-content-end align-items-center gap-2 gap-md-3">
              <HeadsetIcon size={18} />
              <button className="contact-btn d-none d-sm-inline">0800-013-2992</button>
              <span className="d-none d-sm-inline">-</span>
              <button className="contact-btn d-none d-sm-inline">0800-771-7750</button>
            </div>
          </div>
        </div>
      </div>

      <div className="main-navbar border-bottom-green">
        <div className="container-fluid custom-container">
          <nav className="navbar navbar-expand-lg bg-white p-0">
            <a className="navbar-brand me-4" href="#">
              <img src={CarePlus} alt="CarePlus" className="logo-img" />
            </a>

            <button
              className="navbar-toggler"
              type="button"
              data-bs-toggle="collapse"
              data-bs-target="#mainNavbar"
              aria-controls="mainNavbar"
              aria-expanded="false"
              aria-label="Toggle navigation"
            >
              <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="mainNavbar">
              <ul className="navbar-nav mx-auto mb-2 mb-lg-0 gap-lg-4">
                <li className="nav-item dropdown">
                  <a
                    className="nav-link custom-nav-link d-flex align-items-center gap-2"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    A CarePlus
                    <FaChevronDown className="dropdown-arrow" size={12} />
                  </a>

                  <ul className="dropdown-menu custom-dropdown large-dropdown two-columns">
                    <li><a className="dropdown-item" href="#">A Empresa</a></li>
                    <li><a className="dropdown-item" href="#">Perguntas Frequentes</a></li>
                    <li><a className="dropdown-item" href="#">Diferenciais</a></li>
                    <li><a className="dropdown-item" href="#">Materiais de Saúde</a></li>
                    <li><a className="dropdown-item" href="#">Rede Plus</a></li>
                    <li><a className="dropdown-item" href="#">Declaração de Cookies</a></li>
                    <li><a className="dropdown-item" href="#">Gestão de Saúde</a></li>
                    <li><a className="dropdown-item" href="#">Termos e Condições</a></li>
                    <li><a className="dropdown-item" href="#">O Lado Plus da Saúde</a></li>
                    <li><a className="dropdown-item" href="#">Portal de Privacidade</a></li>
                    <li><a className="dropdown-item" href="#">Responsabilidade Social</a></li>
                    <li><a className="dropdown-item" href="#">Resultados Financeiros</a></li>
                    <li><a className="dropdown-item" href="#">Exerça seus Direitos</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link custom-nav-link d-flex align-items-center gap-2"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Planos e Produtos
                    <FaChevronDown className="dropdown-arrow" size={12} />
                  </a>

                  <ul className="dropdown-menu custom-dropdown medium-dropdown two-columns">
                    <li><a className="dropdown-item" href="#">Planos individuais</a></li>
                    <li><a className="dropdown-item" href="#">Planos empresariais</a></li>
                    <li><a className="dropdown-item" href="#">Coberturas</a></li>
                    <li><a className="dropdown-item" href="#">Benefícios</a></li>
                    <li><a className="dropdown-item" href="#">Tabela de preços</a></li>
                    <li><a className="dropdown-item" href="#">Comparar planos</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link custom-nav-link d-flex align-items-center gap-2"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Carreira
                    <FaChevronDown className="dropdown-arrow" size={12} />
                  </a>

                  <ul className="dropdown-menu custom-dropdown small-dropdown">
                    <li><a className="dropdown-item" href="#">Carreiras</a></li>
                    <li><a className="dropdown-item" href="#">Vagas</a></li>
                  </ul>
                </li>

                <li className="nav-item dropdown">
                  <a
                    className="nav-link custom-nav-link d-flex align-items-center gap-2"
                    href="#"
                    role="button"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Fale Conosco
                    <FaChevronDown className="dropdown-arrow" size={12} />
                  </a>

                  <ul className="dropdown-menu custom-dropdown small-dropdown">
                    <li><a className="dropdown-item" href="#">Solicite uma proposta</a></li>
                    <li><a className="dropdown-item" href="#">Contato</a></li>
                    <li><a className="dropdown-item" href="#">Canal de Denúncias</a></li>
                  </ul>
                </li>
              </ul>

              <div className="d-flex align-items-center gap-3 actions-area">
                <div className="divider-vertical d-none d-md-block"></div>

                <button className="search-btn d-flex align-items-center gap-2">
                  <span className="d-none d-sm-inline">Buscar</span>
                  <Search size={20} />
                </button>

                <button className="btn btn-plus d-flex align-items-center gap-2">
                  Seja Plus
                  <User size={18} />
                </button>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;