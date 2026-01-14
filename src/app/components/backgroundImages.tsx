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
    <div className="is-relative">
      {/* Background images */}
      <div className="is-overlay" style={{ zIndex: 0 }}>
        {images.map((src, index) => (
          <Image
            key={index}
            src={src}
            alt={`Background ${index}`}
            fill
            priority={index === 0} // Load the first image immediately
            className="object-cover transition-opacity"
            style={{
              transitionDuration: "5000ms",
              opacity: index === currentImageIndex ? 1 : 0,
            }}
          />
        ))}
      </div>

      {/* 3. Foreground Content */}
      <div className="is-relative" style={{ zIndex: 2 }}>
        {children}
      </div>
    </div>
  );
}
