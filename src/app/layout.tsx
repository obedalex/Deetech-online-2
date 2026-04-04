import type { Metadata } from "next";
import { Geist, Geist_Mono, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/components/providers/CartProvider";
import { ThemeProvider } from "@/components/theme-provider";
import Navbar from "./layout/Navbar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Deetech",
  description: "Deetech - Your trusted technology partner",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${spaceGrotesk.variable} ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider>
          <CartProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
