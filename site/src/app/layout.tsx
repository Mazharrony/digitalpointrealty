import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import SmoothScroll from "@/components/SmoothScroll";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title:
    "Digital Point Real Estate — Buildings Cleaning, Maintenance & Lease Management in Abu Dhabi",
  description:
    "We don't just maintain buildings — we protect what they're worth. Cleaning, maintenance and lease management under one point of accountability.",
  openGraph: {
    title: "Digital Point Real Estate",
    description:
      "Buildings cleaning, maintenance and lease management across Abu Dhabi.",
    type: "website",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#070c14",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${inter.variable} antialiased`}
    >
      <body>
        <SmoothScroll />
        {children}
        <div className="grain" aria-hidden="true" />
      </body>
    </html>
  );
}
