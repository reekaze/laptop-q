import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* spacing */}
      <div className="w-full h-[67px]"></div>

      <div className="max-w-7xl w-full mx-auto">
        <Hero />
      </div>
    </main>
  );
}
