import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import { SiteShell } from "@/components/site-shell";
import { site } from "@/content/site";
import { organizationJsonLd } from "@/lib/seo";
import "./globals.css";

const display = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["600", "700", "800"],
  variable: "--font-display",
});

const body = Manrope({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-body",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "LambdaScore | Meta, chip, kit e inscripción para tu carrera",
    template: "%s | LambdaScore",
  },
  description:
    "Cronometraje RFID, arcos, vallas, kits e inscripción en un solo proveedor en el centro de México.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es-MX">
      <body className={`${display.variable} ${body.variable} antialiased`}>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationJsonLd()),
          }}
        />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
