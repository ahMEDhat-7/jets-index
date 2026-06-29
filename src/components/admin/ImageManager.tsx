"use client";

import { useState } from "react";
import { Plus, Trash2, GripVertical } from "lucide-react";

interface ImageData {
  url: string;
  alt: string;
  sortOrder: number;
}

interface ImageManagerProps {
  images: ImageData[];
  onChange: (images: ImageData[]) => void;
}

export function ImageManager({ images, onChange }: ImageManagerProps) {
  const addImage = () => {
    onChange([
      ...images,
      { url: "", alt: "", sortOrder: images.length },
    ]);
  };

  const removeImage = (index: number) => {
    const newImages = images.filter((_, i) => i !== index);
    newImages.forEach((img, i) => {
      img.sortOrder = i;
    });
    onChange(newImages);
  };

  const updateImage = (index: number, field: keyof ImageData, value: string | number) => {
    const newImages = [...images];
    newImages[index] = { ...newImages[index], [field]: value };
    onChange(newImages);
  };

  const moveImage = (fromIndex: number, toIndex: number) => {
    if (toIndex < 0 || toIndex >= images.length) return;
    const newImages = [...images];
    const [moved] = newImages.splice(fromIndex, 1);
    newImages.splice(toIndex, 0, moved);
    newImages.forEach((img, i) => {
      img.sortOrder = i;
    });
    onChange(newImages);
  };

  return (
    <div className="space-y-3">
      {images.map((image, index) => (
        <div
          key={index}
          className="flex items-start gap-2 rounded border border-tactical-border bg-tactical-bg-secondary/30 p-3"
        >
          <div className="flex flex-col gap-1 pt-2">
            <button
              type="button"
              onClick={() => moveImage(index, index - 1)}
              disabled={index === 0}
              className="text-tactical-text-secondary hover:text-tactical-text disabled:opacity-30"
            >
              <GripVertical size={14} className="rotate-90" />
            </button>
            <button
              type="button"
              onClick={() => moveImage(index, index + 1)}
              disabled={index === images.length - 1}
              className="text-tactical-text-secondary hover:text-tactical-text disabled:opacity-30"
            >
              <GripVertical size={14} className="-rotate-90" />
            </button>
          </div>

          <div className="flex-1 space-y-2">
            <input
              type="url"
              placeholder="Image URL"
              value={image.url}
              onChange={(e) => updateImage(index, "url", e.target.value)}
              className="w-full rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
            />
            <input
              type="text"
              placeholder="Alt text (optional)"
              value={image.alt}
              onChange={(e) => updateImage(index, "alt", e.target.value)}
              className="w-full rounded border border-tactical-border bg-tactical-card px-3 py-2 text-tactical-text focus:border-tactical-accent focus:outline-none"
            />
          </div>

          {image.url && (
            <div className="h-16 w-24 flex-shrink-0 overflow-hidden rounded border border-tactical-border">
              <img
                src={image.url}
                alt={image.alt}
                className="h-full w-full object-cover"
              />
            </div>
          )}

          <button
            type="button"
            onClick={() => removeImage(index)}
            className="flex-shrink-0 rounded p-2 text-tactical-text-secondary transition-colors hover:text-tactical-alert"
          >
            <Trash2 size={16} />
          </button>
        </div>
      ))}

      <button
        type="button"
        onClick={addImage}
        className="flex w-full items-center justify-center gap-2 rounded border border-dashed border-tactical-border bg-tactical-bg-secondary/30 py-3 text-tactical-text-secondary transition-colors hover:border-tactical-accent/50 hover:text-tactical-text"
      >
        <Plus size={16} />
        Add Image
      </button>
    </div>
  );
}