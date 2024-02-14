import Hero from "@/components/Hero";
import AllProducts from "@/components/products/AllProducts";
import HotProducts from "@/components/products/HotProducts";

export default function Home() {
  return (
    <>
      <Hero />
      <HotProducts />
      <AllProducts />
    </>
  );
}
