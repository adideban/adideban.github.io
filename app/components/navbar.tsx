"use client"
import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';
import RotatingIcon from './RotatingIcon';

const Navbar = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize(); // Set initial state
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Prints', href: '/prints' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  if (isMobile) {
    return (
      <nav className="fixed top-0 left-0 w-full flex justify-around items-center h-16 bg-white z-10 shadow-md">
        {navItems.map((item, index) => (
          <React.Fragment key={item.name}>
            <Link href={item.href} className="hover:text-blue-800">
              <Image
                src={`/${item.name.toLowerCase()}.png`}
                alt={item.name}
                width={80}
                height={20}
                className={styles.mobileImage}
              />
            </Link>
            {index < navItems.length - 1 && (
              <RotatingIcon src="/icons/bow_yarn-1.png" alt="Separator" size={30} />
            )}
          </React.Fragment>
        ))}
      </nav>
    );
  }

  return (
    <nav className="fixed left-2 w-1/6 flex flex-col justify-center h-screen pl-2 bg-transparent z-10">
      {navItems.map((item) => (
        <Link key={item.name} href={item.href} className="hover:text-blue-800">
          <div className={styles.imageContainer}>
            <Image
              src={`/${item.name.toLowerCase()}.png`}
              alt={item.name}
              width={160}
              height={40}
              className={styles.image}
            />
          </div>
        </Link>
      ))}
    </nav>
  );
};

export default Navbar;