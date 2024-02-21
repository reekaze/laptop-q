import Hero from "@/components/Hero";
import AllProducts from "@/components/products/AllProducts";
import HotProducts from "@/components/products/HotProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <HotProducts />
      <div className="flex flex-col gap-4 sm:gap-8">
        <p className="text-h3 px-4 xl:px-0 font-bold">All Products</p>
        <AllProducts />
      </div>
    </>
  );
}
