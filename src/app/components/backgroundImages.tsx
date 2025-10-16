"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
const images = [
  "/hero_header/1.jpeg",
  "/hero_header/2.jpeg",
  "/hero_header/3.jpeg",
];

// Background image component, takes children as a prop
export default function BackgroundImages({
  children,
}: {
  children: React.ReactNode;
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
    <div className="absolute inset-0 z-0 overflow-hidden">
      {images.map((src, index) => (
        // Image Component from Next being used
        <Image
          key={index}
          src={src}
          fill
          priority={index === 0} // Preload the first image
          alt={`Background ${index}`}
          className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
            index === currentImageIndex ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}
      {/* Foreground content */}
      <div className="relative z-10">{children}</div>
    </div>
  );
}
