import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import HotProducts from "@/components/hotProducts/HotProducts";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* spacing */}
      <div className="w-full h-[67px]"></div>

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 sm:gap-16">
        <Hero />
        <HotProducts />
      </div>
    </main>
  );
}
