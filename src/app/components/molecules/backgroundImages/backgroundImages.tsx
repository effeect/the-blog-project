"use client";

import { useState, useEffect } from "react";
import ImageCarousel from "../../atoms/ImageCarousel/ImageCarousel";

// Background image component, takes children as a prop
export default function BackgroundImages({
  children,
  images,
}: {
  children: React.ReactNode;
  images: string[];
}) {
  // Image index state
  // Not sure if it should be here or in the ImageCarousel component
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <section className="hero is-fullheight">
      <div className="is-relative">
        <ImageCarousel images={images} currentImageIndex={currentImageIndex} />

        {/* Image Carousel Foreground content, is optional */}
        <div className="is-relative" style={{ zIndex: 2 }}>
          {children}
        </div>
      </div>
    </section>
  );
}
