"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedLetter from './AnimatedLetter';
import Navbar from '../components/navbar';
import Image from 'next/image'; // Add this import

export default function About() {
  return (
    <div className="relative min-h-screen">

      <Navbar />
      <Image src="/about.png" alt="ABOUT ME" width={300} height={100} className="mx-auto mt-5" />

      <main className="min-h-screen p-8 flex justify-center items-center">
        <AnimatedLetter />
      </main>
    </div>
  );
}
