// For reading the home carosel images directory
import fs from "fs";
import path from "path";
// Custom Imports
// import HeroHeader from "./components/heroHeader";
import HeroHeader from "./components/organism/heroheader";

export default async function Home() {
  const imageDir = path.join(process.cwd(), "public/hero_header");
  const files = fs.readdirSync(imageDir);
  const images = files
    .filter((file) => /\.(jpe?g|png|webp)$/i.test(file))
    .map((file) => `/hero_header/${file}`);

  return (
    <>
      <title>oliverdimes.dev - Home</title>
      {/* Hero Image Header entry point */}
      <HeroHeader images={images}></HeroHeader>
    </>
  );
}
