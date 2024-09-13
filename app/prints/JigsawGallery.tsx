// JigsawGallery.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Link from "next/link";

interface ImageInfo {
  src: string;
  width: number;
  height: number;
  variants: string[];
  aspectRatio: number; // Add this line
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

const groupImages = (filenames: string[]): Record<string, string[]> => {
  const groups: Record<string, string[]> = {};
  filenames.forEach(filename => {
    const [baseName] = filename.split('-');
    if (!groups[baseName]) {
      groups[baseName] = [];
    }
    groups[baseName].push(filename);
  });
  return groups;
};

export default function JigsawGallery({ filenames }: { filenames: string[] }) {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [selectedVariants, setSelectedVariants] = useState<Record<string, string>>({});
  const [hoveredVariants, setHoveredVariants] = useState<Record<string, string | undefined>>({});

  useEffect(() => {
    const loadImages = async () => {
      const groupedImages = groupImages(filenames);
      const imagePromises = Object.entries(groupedImages).map(async ([baseName, variants]) => {
        const dimensions = await getImageDimensions(variants[0]);
        return {
          src: `/prints/${variants[0]}`,
          variants,
          ...dimensions,
          aspectRatio: dimensions.width / dimensions.height, // Add this line
        };
      });

      const loadedImages = await Promise.all(imagePromises);
      setImages(loadedImages);
      
      // Initialize selected variants
      const initialVariants: Record<string, string> = {};
      loadedImages.forEach(image => {
        const [baseName] = image.src.split('/').pop()!.split('-');
        initialVariants[baseName] = image.src;
      });
      setSelectedVariants(initialVariants);
    };

    loadImages();
  }, [filenames]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleVariantChange = (baseName: string, newVariant: string) => {
    setSelectedVariants(prev => ({ ...prev, [baseName]: `/prints/${newVariant}` }));
  };

  const handleVariantHover = (baseName: string, newVariant: string) => {
    setHoveredVariants(prev => ({ ...prev, [baseName]: `/prints/${newVariant}` }));
  };

  const handleVariantLeave = (baseName: string) => {
    setHoveredVariants(prev => ({ ...prev, [baseName]: undefined }));
  };

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {images.map((image, index) => {
        const [baseName] = image.src.split('/').pop()!.split('-');
        return (
          <div key={index} className="masonry-item mb-8 bg-gray-100 p-4 rounded-lg">
            <Link href={`/print/${baseName}?color=${selectedVariants[baseName]?.split('/').pop()?.split('-')[1].split('.')[0] || '1'}`}>
              <div style={{ position: 'relative', paddingBottom: `${(1 / image.aspectRatio) * 100}%` }}>
                <Image
                  src={hoveredVariants[baseName] || selectedVariants[baseName] || image.src}
                  alt={`Print ${baseName}`}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md shadow-md cursor-pointer"
                />
              </div>
            </Link>
            {image.variants.length > 1 && (
              <div className="flex mt-4 justify-center">
                {image.variants.map((variant, vIndex) => (
                  <div
                    key={vIndex}
                    className={`w-12 h-12 mx-1 border-2 rounded-md overflow-hidden ${
                      selectedVariants[baseName] === `/prints/${variant}` ? 'border-black' : 'border-gray-300'
                    }`}
                    onMouseEnter={() => handleVariantHover(baseName, variant)}
                    onMouseLeave={() => handleVariantLeave(baseName)}
                    onClick={() => handleVariantChange(baseName, variant)}
                  >
                    <div style={{ position: 'relative', paddingBottom: '100%' }}>
                      <Image
                        src={`/prints/${variant}`}
                        alt={`Variant ${vIndex + 1}`}
                        layout="fill"
                        objectFit="cover"
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
            <button className="mt-4 w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
              Add to Cart
            </button>
          </div>
        )
      })}
    </Masonry>
  );
}