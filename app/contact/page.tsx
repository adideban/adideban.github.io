"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import Navbar from '../components/navbar';
import Image from 'next/image';
import localFont from "next/font/local";
import { Caveat } from "next/font/google";
import RotatingIcon from '../components/RotatingIcon';

const arianaFont = localFont({
  src: "../../Ariana-Regular.ttf",
});

const handwrittenFont = Caveat({ subsets:["latin"], weight:"700", });

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [formStatus, setFormStatus] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus('Sending...');
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      
      if (response.ok) {
        setFormStatus('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        setFormStatus('Failed to send message. Please email directly at ariana.dideban@gmail.com');
      }
    } catch (error) {
      setFormStatus('An error occurred. Please email directly at ariana.dideban@gmail.com ');
    }
  };
  return (
    <div className="relative min-h-screen " style={{
      '--primary-color': '#D2042D',
      '--secondary-color': '#f0f0f0',
      '--text-color': '#D2042D',
      '--button-hover-color': '#FF0000',
      '--border-color': '#D3D3D3',
    } as React.CSSProperties}>
      <style jsx global>{`
        :root {
          --primary-color: #D2042D;
          --secondary-color: #f0f0f0;
          --text-color: #D2042D;
          --button-hover-color: #FF0000;
          --border-color: #D3D3D3;
        }
        input:hover, textarea:hover {
          background-color: #FFEEEE !important;
        }
        button:hover {
          background-color: var(--button-hover-color) !important;
        }
      `}</style>
      <Navbar />
      <main className="min-h-screen p-4 md:p-8 pt-24 md:pt-12 flex flex-col items-center">
        <RotatingIcon 
            src={"/icons/yarn_spiral-2.png"} 
            alt="Random Icon 3" 
            className="absolute top-20 right-20 transform -translate-x-1/2 z-10"
          />
        <Image
          src="/contact.png"
          alt="CONTACT"
          width={600}
          height={200}
          className="mx-auto mt-8 md:mt-4 mb-12"
        />
        <RotatingIcon 
            src={"/icons/buttons-1.png"} 
            alt="Random Icon 3" 
            className="absolute top-15 left-20 transform -translate-x-1/2 z-10"
            style={{
              position: 'absolute', 
              top: '19%', 
              left: '15%',
            }}
          />
        <div className="w-full max-w-md p-8 border-4 shadow-[8px_8px_0_0_rgba(0,0,0,0.3)]" 
             style={{ 
               backgroundColor: 'var(--secondary-color)', 
               borderColor: 'var(--primary-color)' 
             }}>
              <RotatingIcon 
            src={"/icons/button.png"} 
            alt="Random Icon 3" 
            className="absolute top-25 right-25 transform -translate-x-1/2 z-10"
          />
          <RotatingIcon 
            src={"/icons/bow_yarn-2.png"} 
            alt="Random Icon 3" 
            className="absolute z-10 transform rotate-180 translate-x-1/2 translate-y-1/2"
            style={{
              position: 'absolute', 
              bottom: '25%', 
              right: '25%',
            }}
          />

              <div className={arianaFont.className} >
          <h2 className="text-2xl font-bold mb-4 text-center " style={{ color: 'var(--primary-color)' }}>get in touch</h2>
          <h3 className='text-xs font mb-4 text-center'> or email me at <a className="underline hover:text-[#D2042D]" href="mailto:ariana.dideban@gmail.com">ariana.dideban<span className={handwrittenFont.className}>@</span>gmail.com</a> !</h3>
          <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
              <label htmlFor="name" className="block mb-2 text-sm font-bold" style={{ color: 'var(--text-color)' }}>name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2"
                style={{ borderColor: 'var(--primary-color)', color: 'var(--text-color)', backgroundColor: 'white' }}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="email" className="block mb-2 text-sm font-bold" style={{ color: 'var(--text-color)' }}>email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2"
                style={{ borderColor: 'var(--primary-color)', color: 'var(--text-color)', backgroundColor: 'white' }}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="message" className="block mb-2 text-sm font-bold" style={{ color: 'var(--text-color)' }}>msg:</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-3 py-2 border-2"
                style={{ borderColor: 'var(--primary-color)', color: 'var(--text-color)', backgroundColor: 'white' }}
                rows={4}
                required
              ></textarea>
            </div>
            <button 
              type="submit" 
              className="w-full py-2 px-4  font-bold transition-all active:translate-x-1 active:translate-y-1"
              style={{ 
                backgroundColor: 'var(--primary-color)', 
                color: 'white', 
                // borderColor: 'var(--border-color)'
              }}
            >
              send 
            </button>
          </form>
          {formStatus && <p className="mt-4 text-center" style={{ color: 'var(--text-color)' }}>{formStatus}</p>}
          </div>
        </div>
      </main>
    </div>
  );
}