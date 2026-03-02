import { Geist, Geist_Mono } from "next/font/google";
import Navbar from "./components/atoms/navbar";
import Footer from "./components/atoms/footer";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
// Importing Bulma CSS Framework, using NPM in this case
// Could use CDN but the website is mostly static so npm is fine here
import "bulma/css/bulma.css";
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
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar></Navbar>
        <main className="flex-grow">
          {children}
          {/* Vercel Dashboard Related Things, no need for additional config/params here*/}
          <SpeedInsights />
          <Analytics />
        </main>
        <Footer></Footer>
      </body>
    </html>
  );
}
