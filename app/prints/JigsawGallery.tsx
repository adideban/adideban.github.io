// JigsawGallery.tsx
"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Masonry from "react-masonry-css";
import Link from "next/link";
import localFont from "next/font/local";
import { Caveat } from "next/font/google";

const arianaFont = localFont({
  src: "../../Ariana-Regular.ttf",
});

const handwrittenFont = Caveat({ subsets: ["latin"], weight: "700" });

interface ImageInfo {
  src: string;
  width: number;
  height: number;
  variants: string[];
  aspectRatio: number;
  name: string;
  year: string;
  medium: string;
  isLoaded: boolean;
}

// queue-based loading system
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
  filenames.forEach((filename) => {
    const [baseName] = filename.split("-");
    if (!groups[baseName]) {
      groups[baseName] = [];
    }
    groups[baseName].push(filename);
  });
  return groups;
};

const parseFilename = (filename: string): { name: string; year: string; medium: string } => {
  const parts = filename.split("_");
  const name = parts[0].replace(/-/g, " ");
  const year = parts[1];
  let medium = parts[2];

  // Remove file extension
  medium = medium.split(".")[0];

  // Remove variant indicator if present
  const variantIndex = medium.lastIndexOf("-");
  if (variantIndex !== -1) {
    medium = medium.substring(0, variantIndex);
  }

  return { name, year, medium };
};

export default function JigsawGallery({ filenames }: { filenames: string[] }) {
  const [images, setImages] = useState<ImageInfo[]>([]);
  const [displayedVariants, setDisplayedVariants] = useState<Record<string, string>>({});
  const [isMobile, setIsMobile] = useState(false);
  const [loadingQueue, setLoadingQueue] = useState<string[]>([]);
  const [loadingIndex, setLoadingIndex] = useState(0);
  const [allImagesQueued, setAllImagesQueued] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.matchMedia("(max-width: 768px)").matches);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // prep image metadata and queue first
  useEffect(() => {
    const prepareImages = async () => {
      const groupedImages = groupImages(filenames);
      // only create metadata initially, don't load all images at once
      const baseImageData = Object.entries(groupedImages).map(([baseName, variants]) => {
        const { name, year, medium } = parseFilename(variants[0]);
        return {
          src: `/prints/${variants[0]}`,
          variants,
          width: 0,  // to be updated when loaded
          height: 0, // to be updated when loaded
          aspectRatio: 1, // default placeholder value
          name,
          year,
          medium,
          isLoaded: false,
        };
      });

      setImages(baseImageData);
      
      // then create a loading queue with all base names
      const queue = baseImageData.map((image) => {
        const [baseName] = image.src.split('/').pop()!.split('-');
        return baseName;
      });
      
      setLoadingQueue(queue);
      setAllImagesQueued(true);
      
      // Initialize displayed variants
      const initialVariants: Record<string, string> = {};
      baseImageData.forEach(image => {
        const [baseName] = image.src.split('/').pop()!.split('-');
        initialVariants[baseName] = image.src;
      });
      setDisplayedVariants(initialVariants);
    };

    prepareImages();
  }, [filenames]);

  // sequential image loading process
  useEffect(() => {
    if (!allImagesQueued || loadingIndex >= loadingQueue.length) return;

    const loadNextImage = async () => {
      const baseName = loadingQueue[loadingIndex];
      
      // find the image data for this base name
      const imageIndex = images.findIndex((img) => {
        const imgBaseName = img.src.split('/').pop()!.split('-')[0];
        return imgBaseName === baseName;
      });
      
      if (imageIndex === -1) {
        // skip if not found and move to next
        setLoadingIndex(prev => prev + 1);
        return;
      }
      
      const image = images[imageIndex];
      
      try {
        // load the image dimensions
        const dimensions = await getImageDimensions(image.variants[0]);
        
        // update the image with dimensions and mark as loaded
        const updatedImages = [...images];
        updatedImages[imageIndex] = {
          ...image,
          ...dimensions,
          aspectRatio: dimensions.width / dimensions.height,
          isLoaded: true,
        };
        
        setImages(updatedImages);
        
        // move to the next image
        setLoadingIndex(prev => prev + 1);
      } catch (error) {
        console.error("Failed to load image:", error);
        // still increment to prevent getting stuck
        setLoadingIndex(prev => prev + 1);
      }
    };

    loadNextImage();
  }, [loadingIndex, loadingQueue, images, allImagesQueued]);

  const breakpointColumnsObj = {
    default: 3,
    1100: 2,
    700: 1
  };

  const handleVariantInteraction = useCallback((baseName: string, newVariant: string) => {
    setDisplayedVariants(prev => ({ ...prev, [baseName]: `/prints/${newVariant}` }));
  }, []);

  const getColorFromVariant = (variant: string | undefined): string => {
    if (!variant) return '1';
    const parts = variant.split('/').pop()?.split('-');
    return parts && parts.length > 1 ? parts[1].split('.')[0] : '1';
  };

  // loading spinner component
  const LoadingSpinner = () => (
    <div className="flex justify-center items-center h-full w-full min-h-[200px]">
      <div className="animate-spin h-12 w-12">
        <img src="/loading.png" alt="Loading" className="h-full w-full" />
      </div>
    </div>
  );

  return (
    <Masonry
      breakpointCols={breakpointColumnsObj}
      className="masonry-grid"
      columnClassName="masonry-grid_column"
    >
      {images.map((image, index) => {
        const [baseName] = image.src.split('/').pop()!.split('-');
        const currentVariant = displayedVariants[baseName];
        return (
          <div key={index} className="retro-card">
            <table cellSpacing="0" cellPadding="5" border={1} bgcolor="#FFFFFF" width="100%">
              <tbody>
                <tr>
                  <td align="center">
                    {image.isLoaded ? (
                      <Link href={`/print/${baseName}?color=${getColorFromVariant(currentVariant)}`}>
                        <div style={{ position: 'relative', paddingBottom: `${(1 / image.aspectRatio) * 100}%` }}>
                          <Image
                            src={currentVariant || image.src}
                            alt={`Print ${baseName}`}
                            layout="fill"
                            objectFit="contain"
                            className="retro-image"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Crect width='100%25' height='100%25' fill='%23f0f0f0'/%3E%3C/svg%3E"
                          />
                        </div>
                      </Link>
                    ) : (
                      <LoadingSpinner />
                    )}
                  </td>
                </tr>
                {image.variants.length > 1 && image.isLoaded && (
                  <tr>
                    <td align="center">
                      <table cellSpacing="2" cellPadding="0" border={0}>
                        <tbody>
                          <tr>
                            {image.variants.map((variant, vIndex) => (
                              <td key={vIndex}>
                                <div
                                  className={`retro-variant ${
                                    currentVariant === `/prints/${variant}` ? 'selected' : ''
                                  } ${isMobile ? 'mobile' : 'desktop'}`}
                                  onMouseEnter={() => !isMobile && handleVariantInteraction(baseName, variant)}
                                  onClick={() => isMobile && handleVariantInteraction(baseName, variant)}
                                >
                                  <Image
                                    src={`/prints/${variant}`}
                                    alt={`Variant ${vIndex + 1}`}
                                    width={30}
                                    height={30}
                                    className="cursor-pointer"
                                    loading="lazy"
                                  />
                                </div>
                              </td>
                            ))}
                          </tr>
                        </tbody>
                      </table>
                    </td>
                  </tr>
                )}
                <tr>
                  <td align="center">
                    {image.isLoaded ? (
                      <div style={{ color: "red" }} className={arianaFont.className}>
                        {image.name}, <span className={handwrittenFont.className}>{image.year}</span>, {image.medium}
                      </div>
                    ) : (
                      <div className="h-6 w-3/4 mx-auto bg-gray-200 animate-pulse rounded"></div>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        );
      })}
    </Masonry>
  );
}