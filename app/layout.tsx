import type { Metadata } from "next";
import "./globals.css";
import "./mobile-experience.css";
import { AdaptiveMotion } from "@/components/adaptive-motion";
import { RouteTransition } from "@/components/route-transition";

const siteUrl = "https://ahmedsaaied.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),

  title: {
    default: "Ahmed Saaied — Product Engineer",
    template: "%s | Ahmed Saaied",
  },

  description:
    "Portfolio of Ahmed Saaied, a product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",

  keywords: [
    "Ahmed Saaied",
    "Ahmed Saaied Portfolio",
    "Product Engineer",
    "Software Engineer",
    "Frontend Developer",
    "React Developer",
    "Next.js Developer",
    "Mobile Developer",
    "Web Developer",
  ],

  authors: [
    {
      name: "Ahmed Saaied",
      url: siteUrl,
    },
  ],

  creator: "Ahmed Saaied",
  publisher: "Ahmed Saaied",

  alternates: {
    canonical: siteUrl,
  },

  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Ahmed Saaied",
    title: "Ahmed Saaied — Product Engineer",
    description:
      "Portfolio of Ahmed Saaied, a product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",
  },

  twitter: {
    card: "summary_large_image",
    title: "Ahmed Saaied — Product Engineer",
    description:
      "Portfolio of Ahmed Saaied, a product-minded developer crafting high-performance mobile apps, web systems, and thoughtful digital experiences.",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },

  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },

  category: "technology",
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