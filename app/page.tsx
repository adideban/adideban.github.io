import Navbar from './components/navbar';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="relative">
      <Navbar />
      <header>
        <img src="yarn_name.png" alt="ARIANA DIDEBAN" className='name-image' />
      </header>
      <div className="flex justify-center mt-8 relative">
        <nav className="absolute left-0 flex flex-col justify-center h-full pr-4">
          <Link href="/prints" className="mb-6 text-blue-600 underline hover:text-blue-800">Prints</Link>
          <Link href="/#creations" className="mb-6 text-blue-600 underline hover:text-blue-800">Creations</Link>
          <Link href="/#photos" className="mb-6 text-blue-600 underline hover:text-blue-800">Photos</Link>
          <Link href="/#about" className="mb-6 text-blue-600 underline hover:text-blue-800">About</Link>
          <Link href="/#contact" className="mb-6 text-blue-600 underline hover:text-blue-800">Contact</Link>
        </nav>
        <div className="image-container">
          <img src="prints/cake_cleaned-1.png" alt="Artwork" className="image-placeholder" />
        </div>
      </div>
    </div>
  );
}
