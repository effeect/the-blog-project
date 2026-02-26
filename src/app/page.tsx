// For reading the home carosel images directory
import fs from "fs";
import path from "path";
import HeroHeader from "./components/organism/heroheader";

export default async function Home() {
  const imageDir = path.join(process.cwd(), "public/hero_header");
  const files = fs.readdirSync(imageDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .map((file) => `/hero_header/${file}`);

  return (
    <>
      {/* Hero Image Header entry point */}
      <HeroHeader images={images}></HeroHeader>
    </>
  );
}

// Creates metadata for the HomePage
// Is a static homepage so doesn't need any specific updating
export const metadata = {
  metadataBase: new URL("https://oliverdimes.dev"),
  alternates: {
    canonical: "/",
  },
  title: `oliverdimes.dev - Home`,
  description: `Personal Blog/Portfolio for Oliver Dimes, development stuff, personal projects and more`,
  keywords: "Blog",
  openGraph: {
    images: ["/hero_header/1.jpeg"],
  },
};
