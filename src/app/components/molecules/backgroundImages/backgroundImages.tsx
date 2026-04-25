"use client";

import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import ImageCarousel from "../../atoms/ImageCarousel/ImageCarousel";

export default function BackgroundImages({
  children,
  images,
}: {
  children: React.ReactNode;
  images: string[];
}) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box component="section" sx={{ minHeight: "100vh", position: "relative" }}>
      <Box sx={{ position: "relative" }}>
        <ImageCarousel images={images} currentImageIndex={currentImageIndex} />
        <Box sx={{ position: "relative", zIndex: 2 }}>{children}</Box>
      </Box>
    </Box>
  );
}
