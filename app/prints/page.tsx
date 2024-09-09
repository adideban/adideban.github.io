// import Image from "next/image";
// import fs from "fs";
// import path from "path";

// export default async function Prints() {
//   // Path to the prints folder
//   const printsDirectory = path.join(process.cwd(), "public/prints");

//   // Get all files in the prints folder
//   const filenames = fs.readdirSync(printsDirectory);

//   return (
//     <div className="p-4">
//       <h1 className="text-center text-3xl mb-8">Prints</h1>
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
//         {filenames.map((filename) => (
//           <div key={filename} className="relative w-full h-64">
//             <Image
//               src={`/prints/${filename}`}
//               alt={filename}
//               layout="fill"
//               objectFit="cover"
//               className="rounded-md shadow-md"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// Claude

// "use client"; causes fs import error

// import Image from "next/image";
// import fs from "fs";
// import path from "path";
// import { useState, useEffect } from "react";

// // Helper function to get image dimensions
// const getImageDimensions = (filename: string): Promise<{ width: number; height: number }> => {
//   return new Promise((resolve) => {
//     const img = new Image();
//     img.onload = () => {
//       resolve({ width: img.width, height: img.height });
//     };
//     img.src = `/prints/${filename}`;
//   });
// };

// export default function Prints() {
//   const [images, setImages] = useState<{ src: string; width: number; height: number }[]>([]);

//   useEffect(() => {
//     const loadImages = async () => {
//       const printsDirectory = path.join(process.cwd(), "public/prints");
//       const filenames = fs.readdirSync(printsDirectory);
      
//       const imagePromises = filenames.map(async (filename) => {
//         const dimensions = await getImageDimensions(filename);
//         return {
//           src: `/prints/${filename}`,
//           ...dimensions
//         };
//       });

//       const loadedImages = await Promise.all(imagePromises);
//       setImages(loadedImages);
//     };

//     loadImages();
//   }, []);

//   return (
//     <div className="p-4">
//       <h1 className="text-center text-3xl mb-8">Prints</h1>
//       <div className="masonry-grid">
//         {images.map((image, index) => (
//           <div key={index} className="masonry-item">
//             <Image
//               src={image.src}
//               alt={`Print ${index + 1}`}
//               width={image.width}
//               height={image.height}
//               layout="responsive"
//               className="rounded-md shadow-md"
//             />
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }


// page.tsx
import fs from "fs";
import path from "path";
import JigsawGallery from "./JigsawGallery";

export default function Prints() {
  // This function runs on the server side
  const getImageFilenames = () => {
    const printsDirectory = path.join(process.cwd(), "public/prints");
    return fs.readdirSync(printsDirectory);
  };

  const filenames = getImageFilenames();

  return (
    <div className="p-4">
      <h1 className="text-center text-3xl mb-8">Prints</h1>
      <JigsawGallery filenames={filenames} />
    </div>
  );
}