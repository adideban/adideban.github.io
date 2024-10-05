"use client";

import React from 'react';
import Link from 'next/link';
import AnimatedLetter from './AnimatedLetter';
import Navbar from '../components/navbar';

export default function About() {
  return (
    <div className="relative min-h-screen bg-gingham">
      <Navbar />
      <main className="min-h-screen p-8 flex justify-center items-center">
        <AnimatedLetter />
      </main>
    </div>
  );
}