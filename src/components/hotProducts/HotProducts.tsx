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
      link: "/images/lenovo_loq_15IRX9.avif",
      name: "Lenovo LOQ I5IRX9",
    },
    {
      link: "/images/rog_zephyrus_z16.png",
      name: "Asus ROG Zephyrus Z16",
    },
    {
      link: "/images/rog_zephyrus_z16.png",
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
              <SwiperSlide key={idx} className="relative">
                <Image
                  src={product.link}
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
