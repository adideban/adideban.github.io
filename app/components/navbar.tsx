// components/Navbar.tsx
import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import styles from './navbar.module.css';

const Navbar = () => {
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Prints', href: '/prints' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

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