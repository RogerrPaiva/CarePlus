import ProductHeader from "./ProductHeader";

function ProductLayout({ children, contextLabel }) {
  return (
    <>
      <a className="skip-link" href="#main-content">
        Pular para o conteúdo
      </a>
      <ProductHeader contextLabel={contextLabel} />
      <main id="main-content" className="product-page">
        {children}
      </main>
    </>
  );
}

export default ProductLayout;
