import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/atoms/navbar";
import Footer from "./components/atoms/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import ThemeRegistry from "./lib/ThemeRegistry";
import { defaultPreviewImage, siteName, siteUrl } from "./lib/site";
import "./globals.css";

// Defaults for every page, including the base URL that relative links resolve against
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: siteName,
  description:
    "Personal Blog/Portfolio for Oliver Dimes, development stuff, personal projects and more",
  openGraph: { siteName, type: "website", images: [defaultPreviewImage] },
};

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeRegistry>
          <Navbar />
          <main style={{ flexGrow: 1 }}>
            {children}
            <SpeedInsights />
            <Analytics />
          </main>
          <Footer />
        </ThemeRegistry>
      </body>
    </html>
  );
}
