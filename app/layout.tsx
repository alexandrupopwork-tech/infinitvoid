import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Inter, Metal_Mania } from "next/font/google";
import "./globals.css";
import AmbientOverlay from "@/components/AmbientOverlay";
import { IMAGES, SITE_NAME, SITE_URL, TAGLINE } from "@/lib/config";

const bebasNeue = Bebas_Neue({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
});

const metalMania = Metal_Mania({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-metal",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const description =
  "INFINITVOID is a cut-and-sew gym streetwear brand. Limited drops, no restocks — built for the void between reps.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${TAGLINE}`,
    template: `%s — ${SITE_NAME}`,
  },
  description,
  keywords: [
    "INFINITVOID",
    "gym streetwear",
    "cut and sew",
    "limited drop",
    "training apparel",
    "luxury streetwear",
  ],
  authors: [{ name: SITE_NAME }],
  applicationName: SITE_NAME,
  icons: {
    icon: IMAGES.logo,
    shortcut: IMAGES.logo,
    apple: IMAGES.logo,
  },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${TAGLINE}`,
    description,
    images: [
      {
        url: IMAGES.logo,
        width: 1200,
        height: 1200,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — ${TAGLINE}`,
    description,
    images: [IMAGES.logo],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: "#000000",
  colorScheme: "dark",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${bebasNeue.variable} ${metalMania.variable} ${inter.variable} h-full`}>
      <body className="min-h-full bg-void font-body text-ghost antialiased">
        <AmbientOverlay />
        {children}
      </body>
    </html>
  );
}
