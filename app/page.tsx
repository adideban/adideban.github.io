'use client';

import { useRef } from 'react';
import Link from 'next/link';
import DynamicIconPlacement from './components/DynamicIconPlacement';

export default function Home() {
  const mainRef = useRef<HTMLElement>(null);

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
      <main ref={mainRef} className="min-h-screen p-8 relative">
        <header className="relative mb-8">
          <img src="yarn_name.png" alt="ARIANA DIDEBAN" className='name-image w-full max-w-3xl mx-auto' />
        </header>
        <div className="flex justify-center relative">
          <div className="image-container relative">
            <img src="prints/cake_cleaned-1.png" alt="Artwork" className="image-placeholder max-w-full h-auto" />
          </div>
        </div>
        <DynamicIconPlacement containerRef={mainRef} numIcons={5} />
      </main>
    </div>
  );
}
