import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CarePlus from "../../assets/branding/CarePlus.svg";
import "./product-header.css";

function ProductHeader({ contextLabel, compactMobileHeader = false, minimalDesktopHeader = false }) {
  return (
    <header
      className={`product-header ${compactMobileHeader ? "product-header--compact-mobile" : ""} ${minimalDesktopHeader ? "product-header--minimal-desktop" : ""}`}
    >
      <div className="container-fluid custom-container">
        <div className="product-header__inner">
          <div className="product-header__rail">
            <Link className="product-header__brand" to="/" aria-label="Voltar para a home do Care Plus">
              <img src={CarePlus} alt="Care Plus" className="product-header__logo" />
            </Link>

            {!minimalDesktopHeader ? <span className="product-header__context">{contextLabel}</span> : null}
          </div>

          <div className="product-header__actions">
            {!minimalDesktopHeader ? <div className="product-header__trust">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Consentimento e transparência desde o início</span>
            </div> : null}

            <Link to="/" className="product-header__link">
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar para a home
            </Link>
          </div>
        </div>

        {compactMobileHeader ? (
          <div className="product-header__mobile">
            <Link
              to="/"
              className="product-header__mobile-link"
              aria-label="Voltar para a home do Care Plus"
              title="Voltar para a home"
            >
              <ArrowLeft size={16} aria-hidden="true" />
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default ProductHeader;
