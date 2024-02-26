"use client";
import React, { Fragment, useEffect } from "react";
import ProductCard from "./ProductCard";
import { useAllProducts } from "@/hooks/useAllProducts";
import { Loader2Icon, ServerCrashIcon } from "lucide-react";
import { ProductWithImagesWithVariants } from "@/lib/types";

type AllProductsProps = {};

const AllProducts = ({}: AllProductsProps) => {
  const {
    data,
    isLoading,
    fetchNextPage,
    isFetchingNextPage,
    hasNextPage,
    status,
  } = useAllProducts();

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        Math.ceil(window.innerHeight + window.scrollY) >=
        document.documentElement.scrollHeight;

      if (bottom && hasNextPage && !isFetchingNextPage) {
        fetchNextPage();
      }
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center">
        <Loader2Icon className={`animate-spin text-green-400`} size={40} />
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="flex items-center justify-center">
        <ServerCrashIcon className={`text-rose-400 animate-pulse`} size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col w-full">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 px-4 xl:px-0">
        {data?.pages.map((page, i) => {
          return (
            <Fragment key={i}>
              {page.products.map((product: ProductWithImagesWithVariants) => {
                return (
                  <ProductCard
                    key={product.id}
                    id={product.id}
                    imageLink={product.ProductImages[0].link}
                    name={product.name}
                    price={product.ProductVariants[0].price}
                    rate={product.rate}
                    sold={product.sold}
                  />
                );
              })}
            </Fragment>
          );
        })}
      </div>
      {isFetchingNextPage && (
        <div className="flex items-center justify-center mt-4">
          <Loader2Icon className={`animate-spin text-green-400`} size={40} />
        </div>
      )}
    </div>
  );
};

export default AllProducts;
