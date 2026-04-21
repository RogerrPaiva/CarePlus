import ProductHeader from "./ProductHeader";

function ProductLayout({ children, contextLabel, compactMobileHeader = false, minimalDesktopHeader = false }) {
  return (
    <>
      <ProductHeader
        contextLabel={contextLabel}
        compactMobileHeader={compactMobileHeader}
        minimalDesktopHeader={minimalDesktopHeader}
      />
      {/* The page owns the skip link and main landmark to keep a single main-content target in the DOM. */}
      {children}
    </>
  );
}

export default ProductLayout;
