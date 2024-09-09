// JigsawGallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";

interface ImageInfo {
  src: string;
  width: number;
  height: number;
}

const getImageDimensions = (filename: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve) => {
    const img = new window.Image();
    img.onload = () => {
      resolve({ width: img.width, height: img.height });
    };
    img.src = `/prints/${filename}`;
  });
};

export default function JigsawGallery({ filenames }: { filenames: string[] }) {
  const [images, setImages] = useState<ImageInfo[]>([]);

  useEffect(() => {
    const loadImages = async () => {
      const imagePromises = filenames.map(async (filename) => {
        const dimensions = await getImageDimensions(filename);
        return {
          src: `/prints/${filename}`,
          ...dimensions
        };
      });

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
    };

    loadImages();
  }, [filenames]);

  const breakpointColumnsObj = {
    default: 4,
    1200: 3,
    800: 2,
    400: 1
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {images.map((image, index) => (
        <div key={index} className="masonry-item">
          <Image
            src={image.src}
            alt={`Print ${index + 1}`}
            width={image.width}
            height={image.height}
            layout="responsive"
            className="rounded-md shadow-md"
          />
        </div>
      ))}
    </Masonry>
  );
}