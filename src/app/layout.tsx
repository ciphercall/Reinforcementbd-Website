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
    default: "MARSH Services & Outsourcing | HR, BPO, IT & Managed Services",
    template: "%s | MARSH Services & Outsourcing",
  },
  description:
    "MARSH Services & Outsourcing - Your trusted partner for HR, Staffing, Managed IT Services, Salesforce, Payroll, Training, Remote Talent, and BPO solutions. Empowering businesses through tailored solutions.",
  keywords: [
    "HR Outsourcing",
    "BPO Services",
    "IT Managed Services",
    "Staffing Solutions",
    "Payroll Services",
    "Corporate Training",
    "Sales Force Outsourcing",
    "Bangladesh",
    "Dhaka",
  ],
  authors: [{ name: "MARSH Services & Outsourcing" }],
  creator: "MARSH Services & Outsourcing",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://marshgroupbd.com",
    siteName: "MARSH Services & Outsourcing",
    title: "MARSH Services & Outsourcing | HR, BPO, IT & Managed Services",
    description:
      "Empowering Your Business Through Tailored Solutions. HR, Staffing, IT Services, Payroll, Training & BPO.",
    images: [
      {
        url: "/images/logos/rg blue and gray full logo.jpg",
        width: 1200,
        height: 630,
        alt: "MARSH Services & Outsourcing",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MARSH Services & Outsourcing",
    description: "Empowering Your Business Through Tailored Solutions",
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
