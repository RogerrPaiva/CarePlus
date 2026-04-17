import { ArrowLeft, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import CarePlus from "../../assets/branding/CarePlus.svg";
import "./product-header.css";

function ProductHeader({ contextLabel, compactMobileHeader = false }) {
  return (
    <header className={`product-header ${compactMobileHeader ? "product-header--compact-mobile" : ""}`}>
      <div className="container-fluid custom-container">
        <div className="product-header__inner">
          <Link className="product-header__brand" to="/" aria-label="Voltar para a home do Care Plus">
            <img src={CarePlus} alt="Care Plus" className="product-header__logo" />
            <div>
              <span className="product-header__eyebrow">Care Plus digital</span>
              <strong className="product-header__title">{contextLabel}</strong>
            </div>
          </Link>

          <div className="product-header__actions">
            <div className="product-header__trust">
              <ShieldCheck size={16} aria-hidden="true" />
              <span>Consentimento e transparência desde o início</span>
            </div>

            <Link to="/" className="product-header__link">
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar para a home
            </Link>
          </div>
        </div>

        {compactMobileHeader ? (
          <div className="product-header__mobile">
            <Link to="/" className="product-header__mobile-link">
              <ArrowLeft size={16} aria-hidden="true" />
              Voltar para a home
            </Link>
          </div>
        ) : null}
      </div>
    </header>
  );
}

export default ProductHeader;
