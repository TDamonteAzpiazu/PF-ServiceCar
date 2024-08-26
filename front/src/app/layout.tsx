import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import "../styles/index.css";
import Navbar from "@/components/navbar/Navbar";
import Chat from "@/components/Chat";
import Footer from "@/components/Footer";
import { Providers } from "@/redux/Providers";
import { AuthProvider } from "@/redux/AuthProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "GarageJS",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} bg-cover`}
        style={{ backgroundImage: "url(/fondo2.png)" }}
      >
        <Providers>
          <AuthProvider>
            <Navbar />
            {children}
            <Chat />
            <Footer />
          </AuthProvider>
        </Providers>
      </body>
    </html>
  );
}
