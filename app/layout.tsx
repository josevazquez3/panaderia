import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import type { ReactNode } from "react";
import { Footer } from "@/components/Footer";
import { Header } from "@/components/Header";
import { getCarouselImages, getSiteSettings } from "@/lib/queries";
import type { SiteSettings } from "@/types";
import "./globals.css";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

function buildDescription(bakeryName: string): string {
  return `${bakeryName} hornea pan de masa madre, medialunas y pastelería de estación. Un horno de barrio, con tiempo y oficio.`;
}

function siteUrl(): URL {
  if (process.env.VERCEL_URL) {
    return new URL(`https://${process.env.VERCEL_URL}`);
  }

  return new URL("http://localhost:3000");
}

function sameAsLinks(settings: SiteSettings): string[] {
  return [settings.instagramUrl, settings.facebookUrl].filter(
    (url): url is string => typeof url === "string" && url.length > 0,
  );
}

export async function generateMetadata(): Promise<Metadata> {
  const [settings, images] = await Promise.all([
    getSiteSettings(),
    getCarouselImages(),
  ]);
  const description = buildDescription(settings.bakeryName);
  const firstImage = images[0];

  return {
    metadataBase: siteUrl(),
    title: {
      default: settings.bakeryName,
      template: `%s | ${settings.bakeryName}`,
    },
    description,
    openGraph: {
      title: settings.bakeryName,
      description,
      locale: "es_AR",
      type: "website",
      siteName: settings.bakeryName,
      url: "/",
      images: firstImage
        ? [{ url: firstImage.imageUrl, alt: firstImage.alt }]
        : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: settings.bakeryName,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const settings = await getSiteSettings();
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Bakery",
    name: settings.bakeryName,
    email: settings.email,
    url: siteUrl().origin,
    image: settings.logoUrl
      ? new URL(settings.logoUrl, siteUrl()).toString()
      : undefined,
    sameAs: sameAsLinks(settings),
  };

  return (
    <html lang="es" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen bg-white font-sans text-brand-ink antialiased">
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-brand-yellow focus:px-4 focus:py-2 focus:font-medium focus:text-brand-ink focus:shadow-soft"
        >
          Saltar al contenido
        </a>
        <Header settings={settings} />
        <div id="contenido">{children}</div>
        <Footer settings={settings} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
      </body>
    </html>
  );
}
