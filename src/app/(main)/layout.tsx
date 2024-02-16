import Navbar from "@/components/Navbar";
import React from "react";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <main className="min-h-screen flex flex-col w-full">
      <Navbar />

      {/* spacing */}
      <div className="w-full h-[67px]"></div>

      <div className="max-w-7xl w-full mx-auto flex flex-col gap-8 sm:gap-16 pb-8">
        {children}
      </div>
    </main>
  );
};

export default MainLayout;
