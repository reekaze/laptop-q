import React from "react";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage = ({ params: { productId } }: ProductPageProps) => {
  return (
    <>
      <div>Product Page</div>
    </>
  );
};

export default ProductPage;
