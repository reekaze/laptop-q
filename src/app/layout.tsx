import type { Metadata } from "next";
import { Lato } from "next/font/google";
import "./globals.css";

const lato = Lato({
  weight: ["100", "300", "400", "700", "900"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Laptop-Q",
  description:
    "Welcome to Laptop-Q, where quality meets convenience in the world of computing! At Laptop-Q, we pride ourselves on offering an extensive selection of laptops from top brands, meticulously curated to cater to your diverse needs and preferences. Whether you're searching for a sleek ultrabook for productivity on the go or a powerful gaming laptop to fuel your passion, we've got you covered. With our seamless online shopping experience and dedicated customer support, finding and purchasing your ideal laptop has never been easier. Explore the latest innovations in computing technology and discover your perfect match at Laptop-Q today!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lato.className} text-p`}>{children}</body>
    </html>
  );
}
