import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Casa — Your home, in flow",
  description:
    "Casa is a modular household management platform. Organize your kitchen, cleaning, and home — all in one beautiful app.",
  keywords: [
    "household management app",
    "home organization",
    "kitchen management",
    "meal planning",
    "recipe scaling",
    "cleaning schedule",
    "home management",
  ],
  metadataBase: new URL("https://trycasa.io"),
  openGraph: {
    title: "Casa — Your home, in flow",
    description:
      "Modular household management. Kitchen, cleaning, and organization — beautifully unified.",
    url: "https://trycasa.io",
    siteName: "Casa",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Casa — Your home, in flow",
    description:
      "Modular household management. Kitchen, cleaning, and organization — beautifully unified.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              name: "Casa",
              applicationCategory: "LifestyleApplication",
              operatingSystem: "Web",
              description:
                "Modular household management platform for kitchen, cleaning, and home organization.",
              url: "https://trycasa.io",
              offers: {
                "@type": "Offer",
                price: "0",
                priceCurrency: "USD",
              },
            }),
          }}
        />
      </head>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
