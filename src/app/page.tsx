import type { Metadata } from "next";
import HeroHeader from "./components/organism/heroheader";

export default function Home() {
  return (
    <>
      {/* Hero Image Header entry point */}
      <HeroHeader />
    </>
  );
}

// Creates metadata for the HomePage
// Is a static homepage so doesn't need any specific updating
export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
  title: `oliverdimes.dev - Home`,
  keywords: "Blog",
};
