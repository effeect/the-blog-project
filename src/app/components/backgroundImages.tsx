"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

// Background image component, takes children as a prop
export default function BackgroundImages({
  children,
  images,
}: {
  children: React.ReactNode;
  images: string[];
}) {
  // Image index state
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background images */}
      <div className="absolute inset-0 z-0">
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Background ${index}`}
            fill
            loading="lazy"
            className={`object-cover transition-opacity duration-1000 ease-in-out ${
              index === currentImageIndex ? "opacity-100" : "opacity-0"
            }`}
          />
        ))}
      </div>

      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
