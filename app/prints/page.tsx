import fs from "fs";
import path from "path";
import JigsawGallery from "./JigsawGallery";
import Link from 'next/link';
import Image from 'next/image';

export default function Prints() {
  const getImageFilenames = () => {
    const printsDirectory = path.join(process.cwd(), "public/prints");
    return fs.readdirSync(printsDirectory);
  };

  const filenames = getImageFilenames();

  return (
    <div className="flex min-h-screen">
      <nav className="fixed left-0 w-1/6 flex flex-col justify-center h-screen pr-4 bg-transparent">
        <Link href="/" className="mb-6 text-blue-600 underline hover:text-blue-800">Home</Link>
        <Link href="/prints" className="mb-6 text-blue-600 underline hover:text-blue-800">Prints</Link>
        <Link href="/#creations" className="mb-6 text-blue-600 underline hover:text-blue-800">Creations</Link>
        <Link href="/#photos" className="mb-6 text-blue-600 underline hover:text-blue-800">Photos</Link>
        <Link href="/#about" className="mb-6 text-blue-600 underline hover:text-blue-800">About</Link>
        <Link href="/#contact" className="mb-6 text-blue-600 underline hover:text-blue-800">Contact</Link>
      </nav>
      <div className="w-5/6 mx-auto min-h-screen overflow-y-auto px-8">
        <header className="text-center my-8">
          <Image src="/prints.png" alt="PRINTS" width={300} height={100} className="mx-auto" />
        </header>
        <JigsawGallery filenames={filenames} />
      </div>
    </div>
  );
}