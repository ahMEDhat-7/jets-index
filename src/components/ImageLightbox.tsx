"use client";

import { useState, useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import type { PlatformImage } from "@/lib/types";

interface ImageLightboxProps {
  images: PlatformImage[];
  initialIndex: number;
  name: string;
  onClose: () => void;
}

export function ImageLightbox({ images, initialIndex, name, onClose }: ImageLightboxProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const goToPrevious = useCallback(() => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  }, [images.length]);

  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  }, [images.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrevious();
      if (e.key === "ArrowRight") goToNext();
    };

    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [onClose, goToPrevious, goToNext]);

  const currentImage = images[currentIndex];

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-4 z-10 rounded-full bg-tactical-bg/80 p-2 text-tactical-text transition-colors hover:text-tactical-accent"
      >
        <X size={24} />
      </button>

      {/* Navigation */}
      {images.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-4 z-10 rounded-full bg-tactical-bg/80 p-2 text-tactical-text transition-colors hover:text-tactical-accent"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 z-10 mt-0 rounded-full bg-tactical-bg/80 p-2 text-tactical-text transition-colors hover:text-tactical-accent"
          >
            <ChevronRight size={24} />
          </button>
        </>
      )}

      {/* Image */}
      <div className="max-h-[80vh] max-w-[90vw]">
        <img
          src={currentImage.url}
          alt={currentImage.alt ?? `${name} ${currentIndex + 1}`}
          className="max-h-[80vh] max-w-[90vw] object-contain"
        />
      </div>

      {/* Counter */}
      {images.length > 1 && (
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded bg-tactical-bg/80 px-3 py-1 text-sm text-tactical-text">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </div>
  );
}