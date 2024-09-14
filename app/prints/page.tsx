'use client';

import { useRef, useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import JigsawGallery from "./JigsawGallery";
import DynamicIconPlacement from '../components/DynamicIconPlacement';

export default function Prints() {
  const mainRef = useRef<HTMLElement>(null);
  const [filenames, setFilenames] = useState<string[]>([]);

  useEffect(() => {
    async function fetchFilenames() {
      const response = await fetch('/api/prints');
      const data = await response.json();
      setFilenames(data);
    }
    fetchFilenames();
  }, []);

  return (
    <div className="relative min-h-screen">
      <nav className="fixed left-0 top-0 w-64 h-full flex flex-col justify-center pl-8 bg-transparent z-10">
      <Link href="/" className="mb-6 text-blue-600 underline hover:text-blue-800">Home</Link>
        <Link href="/prints" className="mb-6 text-blue-600 underline hover:text-blue-800">Prints</Link>
        <Link href="/#creations" className="mb-6 text-blue-600 underline hover:text-blue-800">Creations</Link>
        <Link href="/#photos" className="mb-6 text-blue-600 underline hover:text-blue-800">Photos</Link>
        <Link href="/#about" className="mb-6 text-blue-600 underline hover:text-blue-800">About</Link>
        <Link href="/#contact" className="mb-6 text-blue-600 underline hover:text-blue-800">Contact</Link>
      </nav>
      <main ref={mainRef} className="w-5/6 mx-auto min-h-screen px-8">
        <header className="text-center mb-8 relative">
          <Image src="/prints.png" alt="PRINTS" width={300} height={100} className="mx-auto" />
        </header>
        <div className="relative">
          <JigsawGallery filenames={filenames} />
        </div>
        <DynamicIconPlacement containerRef={mainRef} numIcons={5} />
      </main>
    </div>
  );
}   
