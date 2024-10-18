import Link from 'next/link';
import Image from 'next/image';
import Head from 'next/head';
import RotatingIcon from './components/RotatingIcon';
import { getRandomIcons } from './utils/iconUtils';
import Navbar from './components/navbar';


export default function Home() {
  const icons = getRandomIcons(5);

  return (
    
    <div className="relative min-h-screen">
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="min-h-screen p-8">
        <header className="relative mb-8">
          <Image 
            src="/yarn_name.png" 
            alt="ARIANA DIDEBAN" 
            width={1440} 
            height={800} 
            className='name-image w-full max-w-3xl mx-auto' 
          />
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
        <div className="flex justify-center relative">
          <div className="image-container relative">
            <Image 
              src="/cake_cleaned-1.png" 
              alt="Artwork" 
              width={800} 
              height={800} 
              className="image-placeholder max-w-full h-auto" 
            />
            <RotatingIcon src={icons[2]} alt="Random Icon 3" className="absolute -top-8 -left-8" />
            <RotatingIcon src={icons[3]} alt="Random Icon 4" className="absolute -bottom-8 -right-8" />
          </div>
        </div>
        <RotatingIcon src={icons[4]} alt="Random Icon 5" className="absolute bottom-4 left-1/3" />
      </main>
    </div>
  );
}
