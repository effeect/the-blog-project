import React from "react";
import Image from "next/image";

const ImageCarousel = ({
  images,
  currentImageIndex = 0,
}: {
  images: string[];
  currentImageIndex?: number;
}) => {
  return (
    <div className="is-overlay" style={{ zIndex: 0 }}>
      {images.map((src, index) => (
        <Image
          key={index}
          src={src}
          alt={`Background ${index}`}
          fill
          priority={index === 0}
          className="transition-opacity"
          style={{
            transitionDuration: "5000ms",
            opacity: index === currentImageIndex ? 1 : 0,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      ))}
    </div>
  );
};

export default ImageCarousel;
