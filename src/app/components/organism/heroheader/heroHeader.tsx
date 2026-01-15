// For the home page
import BackgroundImages from "../../molecules/backgroundImages/backgroundImages";
import ForegroundContent from "../../molecules/ForegroundContent/ForegroundContent";

// Loading Images links from above
export default function HeroHeader({ images }: { images: string[] }) {
  return (
    <BackgroundImages images={images}>
      <ForegroundContent />
    </BackgroundImages>
  );
}
