"use client";
import React from "react";
import ProductCard from "./ProductCard";

type AllProductsProps = {};

const AllProducts = ({}: AllProductsProps) => {
  const listProducts = [
    {
      id: 1,
      imageLink: "/images/lenovo_loq_15IRX9.avif",
      name: "Lenovo LOQ I5IRX9",
      price: 1500,
      rate: 4.8,
      sold: 500,
    },
    {
      id: 2,
      imageLink: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
      price: 1600,
      rate: 4.9,
      sold: 1000,
    },
    {
      id: 3,
      imageLink: "/images/lenovo_loq_15IRX9.avif",
      name: "Lenovo LOQ I5IRX9",
      price: 1500,
      rate: 4.8,
      sold: 500,
    },
    {
      id: 4,
      imageLink: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
      price: 1600,
      rate: 4.9,
      sold: 1000,
    },
    {
      id: 5,
      imageLink: "/images/lenovo_loq_15IRX9.avif",
      name: "Lenovo LOQ I5IRX9",
      price: 1500,
      rate: 4.8,
      sold: 500,
    },
    {
      id: 6,
      imageLink: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
      price: 1600,
      rate: 4.9,
      sold: 1000,
    },
  ];

  return (
    <div className="flex flex-col gap-4 sm:gap-8 w-full">
      <p className="text-h3 px-4 xl:px-0 font-bold">All Products</p>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-x-4 gap-y-6 px-4 xl:px-0">
        {listProducts.map((product, idx) => {
          return <ProductCard key={product.id} {...product} />;
        })}
      </div>
    </div>
  );
};

export default AllProducts;
