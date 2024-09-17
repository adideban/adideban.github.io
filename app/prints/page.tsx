import fs from "fs";
import path from "path";
import JigsawGallery from "./JigsawGallery";
import Link from 'next/link';
import Image from 'next/image';
import RotatingIcon from '../components/RotatingIcon';
import { getRandomIcons } from '../utils/iconUtils';

export default function Prints() {
  const getImageFilenames = () => {
    const printsDirectory = path.join(process.cwd(), "public/prints");
    return fs.readdirSync(printsDirectory);
  };

  const filenames = getImageFilenames();
  const icons = getRandomIcons(5);

  return (
    <div className="relative min-h-screen">
      <nav className="fixed left-0 w-1/6 flex flex-col justify-center h-screen pl-4 bg-transparent z-10">
        <Link href="/" className="mb-6 text-blue-600 underline hover:text-blue-800">Home</Link>
        <Link href="/prints" className="mb-6 text-blue-600 underline hover:text-blue-800">Prints</Link>
        <Link href="/#creations" className="mb-6 text-blue-600 underline hover:text-blue-800">Creations</Link>
        <Link href="/#photos" className="mb-6 text-blue-600 underline hover:text-blue-800">Photos</Link>
        <Link href="/#about" className="mb-6 text-blue-600 underline hover:text-blue-800">About</Link>
        <Link href="/#contact" className="mb-6 text-blue-600 underline hover:text-blue-800">Contact</Link>
      </nav>
      <main className="w-5/6 mx-auto min-h-screen px-8">
        <header className="relative mb-8">
          <Image src="/prints.png" alt="PRINTS" width={300} height={100} className="mx-auto" />
          <RotatingIcon 
            src={icons[0]} 
            alt="Random Icon 1" 
            className="absolute top-0 left-0 transform -translate-x-1/2"
          />
          <RotatingIcon 
            src={icons[1]} 
            alt="Random Icon 2" 
            className="absolute top-1/4 right-0 transform translate-x-1/2"
          />
        </header>
        <div className="relative">
          <JigsawGallery filenames={filenames} />
          <RotatingIcon src={icons[2]} alt="Random Icon 3" className="absolute -top-8 -left-8" />
          <RotatingIcon src={icons[3]} alt="Random Icon 4" className="absolute -bottom-8 -right-8" />
          <RotatingIcon src={icons[4]} alt="Random Icon 5" className="absolute bottom-1/4 left-1/3" />
        </div>
      </main>
    </div>
  );
}