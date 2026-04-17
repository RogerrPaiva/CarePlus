import ProductHeader from "./ProductHeader";

function ProductLayout({ children, contextLabel, compactMobileHeader = false }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <ProductHeader contextLabel={contextLabel} compactMobileHeader={compactMobileHeader} />
      <main id="main-content" className="product-page">
        {children}
      </main>
    </>
  );
}

export default ProductLayout;
