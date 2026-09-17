import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import "./mobile-experience.css";
import { AdaptiveMotion } from "@/components/adaptive-motion";
import { RouteTransition } from "@/components/route-transition";

export const metadata: Metadata = {
  title: "Ahmed Saaied — Product Engineer",
  description:
    "Portfolio of Ahmed Saaied, a product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",
  icons: {
    icon: [
      { url: "/favicon-96.png", type: "image/png", sizes: "96x96" },
      { url: "/favicon-192.png", type: "image/png", sizes: "192x192" },
      { url: "/favicon.svg", type: "image/svg+xml", sizes: "any" },
    ],
    shortcut: "/favicon.ico",
    apple: [
      {
        url: "/favicon-192.png",
        type: "image/png",
        sizes: "192x192",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className="antialiased">
        <AdaptiveMotion />
        <RouteTransition />
        {children}
        <Analytics />
      </body>
    </html>
  );
}