import Navbar from "./components/navbar";
import "./globals.css";

export const metadata = {
  title: "Price Watcher",
  description: "Scraps the data and compare the price",
};

import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className}`}>
        <Navbar />

        <main className="px-5 md:px-11">{children}</main>
      </body>
    </html>
  );
}
