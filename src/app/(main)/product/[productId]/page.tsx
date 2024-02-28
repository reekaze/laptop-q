"use client";
import LoadSpin from "@/components/LoadSpin";
import NotFound from "@/components/NotFound";
import AddToCart from "@/components/products/detail/AddToCart";
import ProductDetail from "@/components/products/detail/ProductDetail";
import ProductDisplay from "@/components/products/detail/ProductDisplay";
import { SelectedVariantProvider } from "@/hooks/useSelectedVariant";
import { ProductWithImagesWithVariants } from "@/lib/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
    <SelectedVariantProvider>
      <div className="p-4 flex flex-col md:flex-row gap-4 xl:gap-8 w-full relative">
        <div className="mx-auto md:mx-0 relative">
          <ProductDisplay
            links={product.ProductImages.map((image) => image.link)}
          />
        </div>
        <ProductDetail product={product} />
        <AddToCart product={product} />
      </div>
    </SelectedVariantProvider>
  );
};

export default ProductPage;
