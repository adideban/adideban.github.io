import Link from 'next/link';
import RotatingIcon from './components/RotatingIcon';
import { getRandomIcons } from './utils/iconUtils';

export default function Home() {
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
      <main className="min-h-screen p-8">
        <header className="relative mb-8">
          <img src="yarn_name.png" alt="ARIANA DIDEBAN" className='name-image w-full max-w-3xl mx-auto' />
          <RotatingIcon src={icons[0]} alt="Random Icon 1" className="absolute top-0 left-1/4 -translate-x-1/2" />
          <RotatingIcon src={icons[1]} alt="Random Icon 2" className="absolute top-1/4 right-1/4 translate-x-1/2" />
        </header>
        <div className="flex justify-center relative">
          <div className="image-container relative">
            <img src="prints/cake_cleaned-1.png" alt="Artwork" className="image-placeholder max-w-full h-auto" />
            <RotatingIcon src={icons[2]} alt="Random Icon 3" className="absolute -top-8 -left-8" />
            <RotatingIcon src={icons[3]} alt="Random Icon 4" className="absolute -bottom-8 -right-8" />
          </div>
        </div>
        <RotatingIcon src={icons[4]} alt="Random Icon 5" className="absolute bottom-4 left-1/3" />
      </main>
    </div>
  );
}
