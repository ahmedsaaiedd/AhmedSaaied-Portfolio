import type { Metadata } from "next";
import "./globals.css";
import "./mobile-experience.css";
import { AdaptiveMotion } from "@/components/adaptive-motion";
import { RouteTransition } from "@/components/route-transition";

export const metadata: Metadata = {
  title: "Ahmed Saaied — Product Engineer",
  description:
    "Portfolio of Ahmed Saaied, a product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
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
      </body>
    </html>
  );
}
