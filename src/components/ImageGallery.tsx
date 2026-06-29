"use client";

import { useState } from "react";
import { ImageLightbox } from "./ImageLightbox";
import type { PlatformImage } from "@/lib/types";

interface ImageGalleryProps {
  images: PlatformImage[];
  name: string;
}

export function ImageGallery({ images, name }: ImageGalleryProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  if (images.length === 0) {
    return null;
  }

  const mainImage = images[0];

  return (
    <>
      {/* Main Image */}
      <div className="mb-4 overflow-hidden rounded border border-tactical-border">
        <img
          src={mainImage.url}
          alt={mainImage.alt ?? name}
          className="h-64 w-full object-cover transition-transform hover:scale-105 md:h-96 cursor-pointer"
          onClick={() => setSelectedIndex(0)}
        />
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="mb-4 flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={image.id}
              onClick={() => setSelectedIndex(index)}
              className="flex-shrink-0 overflow-hidden rounded border border-tactical-border transition-all hover:border-tactical-accent/50"
            >
              <img
                src={image.url}
                alt={image.alt ?? `${name} ${index + 1}`}
                className="h-16 w-24 object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {selectedIndex !== null && (
        <ImageLightbox
          images={images}
          initialIndex={selectedIndex}
          name={name}
          onClose={() => setSelectedIndex(null)}
        />
      )}
    </>
  );
}