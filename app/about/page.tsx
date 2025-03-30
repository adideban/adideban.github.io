"use client";
import React from 'react';
import Link from 'next/link';
import AnimatedLetter from './AnimatedLetter';
import Navbar from '../components/navbar';
import Image from 'next/image';
import RotatingIcon from '../components/RotatingIcon';

export default function About() {
  return (
    <div className="relative min-h-screen">
      <Navbar />
      <main className="min-h-screen p-4 md:p-8 pt-24 md:pt-12 flex flex-col items-center">
        <Image 
          src="/about.png" 
          alt="ABOUT ME" 
          width={600} 
          height={200} 
          className="mx-auto mt-8 md:mt-4 mb-12" 
        />

        
        <RotatingIcon 
          src={"/icons/bow_lace-1.png"} 
          alt="Random Icon 2" 
          className="absolute top-1/4 right-20 transform translate-x-1/2 z-10"
        />
        <div className="w-full max-w-4xl">
          <RotatingIcon 
            src={"/icons/lace_spiral-1.png"} 
            alt="Random Icon 3" 
            className="absolute top-20 left-20 transform -translate-x-1/2 z-10"
          />
        
          <AnimatedLetter />
          
          <RotatingIcon 
            src={"/icons/bow_yarn-2.png"} 
            alt="Random Icon 4" 
            className="absolute top-2/4 right-30 transform translate-x-1/2 z-10"
          />
        </div>
      </main>
    </div>
  );
}
