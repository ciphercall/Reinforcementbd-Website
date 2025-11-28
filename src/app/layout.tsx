import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/Providers";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({ 
  subsets: ["latin"], 
  variable: "--font-sans" 
});

export const metadata: Metadata = {
  title: {
    default: "Reinforcement Group | Automation, Architecture & IT Solutions",
    template: "%s | Reinforcement Group",
  },
  description:
    "Reinforcement Group - Your trusted partner for Electrical & Automation, Architectural Design, and IT Solutions. Transforming businesses since 2018.",
  keywords: [
    "Electrical Automation",
    "Factory Automation",
    "Architectural Design",
    "Web Development",
    "Mobile App Development",
    "IT Solutions",
    "AI Machine Learning",
    "Bangladesh",
    "Dhaka",
  ],
  authors: [{ name: "Reinforcement Group" }],
  creator: "Reinforcement Group",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ragrpbd.com",
    siteName: "Reinforcement Group",
    title: "Reinforcement Group | Automation, Architecture & IT Solutions",
    description:
      "Your Vision, Our Expertise. Professional Electrical & Automation, Architectural Design, and IT Solutions.",
    images: [
      {
        url: "/images/logos/rg blue and gray full logo.jpg",
        width: 1200,
        height: 630,
        alt: "Reinforcement Group",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Reinforcement Group",
    description: "Your Vision, Our Expertise",
    images: ["/images/logos/rg blue and gray full logo.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} antialiased`}>
        <Providers>
          <ConditionalLayout>
            {children}
          </ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
