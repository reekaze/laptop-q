"use client";
import LoadSpin from "@/components/LoadSpin";
import NotFound from "@/components/NotFound";
import ProductDisplay from "@/components/products/detail/ProductDisplay";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

type ProductPageProps = {
  params: {
    productId: string;
  };
};

const ProductPage = ({ params: { productId } }: ProductPageProps) => {
  const { data: product, status } = useQuery({
    queryKey: [`product-${productId}`],
    queryFn: async () => {
      const res = await axios.get(`/api/product/${productId}`);
      return res.data as ProductWithImagesWithVariants;
    },
  });

  if (status === "pending") {
    return <LoadSpin />;
  } else if (status === "error") {
    return <NotFound title="Product" />;
  }

  return (
    <div className="p-4 xl:p-0 flex flex-col md:flex-row w-full">
      <div className="mx-auto md:mx-0">
        <ProductDisplay
          links={product.ProductImages.map((image) => image.link)}
        />
      </div>
    </div>
  );
};

export default ProductPage;
