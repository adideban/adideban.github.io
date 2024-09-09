// 'use client';

// import { useState } from "react";

// const Navbar = () => {
//   const [menuActive, setMenuActive] = useState(false);

//   const toggleMenu = () => {
//     setMenuActive(!menuActive);
//   };

//   return (
//     <>
//       <div className="hamburger-menu" onClick={toggleMenu}>
//         <img className="button-icon" src="button2.png" alt="Menu" />
//       </div>
//       <nav className={`nav-menu ${menuActive ? "active" : ""}`}>
//         <ul>
//           <li><a href="#prints">Prints</a></li>
//           <li><a href="#creations">Creations</a></li>
//           <li><a href="#photos">Photos</a></li>
//           <li><a href="#about">About</a></li>
//           <li><a href="#contact">Contact</a></li>
//         </ul>
//       </nav>
//     </>
//   );
// };

// export default Navbar;

"use client";

import { useState } from "react";
import Link from "next/link";

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  return (
    <>
      <div className="hamburger-menu" onClick={toggleMenu}>
        <img className="button-icon" src="/button2.png" alt="Menu" />
      </div>
      <nav className={`nav-menu ${menuActive ? "active" : ""}`}>
        <ul>
          <li><Link href="/prints">Prints</Link></li>
          <li><Link href="/#creations">Creations</Link></li>
          <li><Link href="/#photos">Photos</Link></li>
          <li><Link href="/#about">About</Link></li>
          <li><Link href="/#contact">Contact</Link></li>
        </ul>
      </nav>
    </>
  );
};

export default Navbar;

