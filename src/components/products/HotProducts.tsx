"use client";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { Autoplay, Navigation, Pagination } from "swiper/modules";
import Image from "next/image";

type HotProductsProps = {};

const HotProducts = ({}: HotProductsProps) => {
  const listProducts = [
    {
      id: 1,
      imageLink: "/images/lenovo_loq_15IRX9.avif",
      name: "Lenovo LOQ I5IRX9",
    },
    {
      id: 2,
      imageLink: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
    },
    {
      id: 3,
      imageLink: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
    },
  ];

  return (
    <div className="relative flex flex-col gap-4 sm:gap-8 w-full">
      <p className="text-h3 px-4 xl:px-0 font-bold">Hot Products</p>

      <div className="relative w-full min-h-[300px] max-h-[500px] h-[50vw]">
        <Swiper
          slidesPerView={1}
          spaceBetween={30}
          loop={true}
          pagination={{
            clickable: true,
          }}
          autoplay={{
            delay: 3000,
            pauseOnMouseEnter: true,
          }}
          navigation={true}
          modules={[Pagination, Navigation, Autoplay]}
          className="w-full h-full bg-gradient-to-b from-white to-primary/80 rounded-md"
          style={{}}
        >
          {listProducts.map((product, idx) => {
            return (
              <SwiperSlide key={product.id} className="relative">
                <div className="absolute z-10 right-4 top-4 bg-background px-2 py-1 italic border border-primary rounded-md">
                  {product.name}
                </div>
                <Image
                  src={product.imageLink}
                  alt="image"
                  fill
                  className="object-contain"
                />
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default HotProducts;
