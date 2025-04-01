import React, { useState } from 'react';
import Image from 'next/image';
import localFont from "next/font/local";

const arianaFont = localFont({
  src: "../../Ariana-Regular.ttf",
});

const AnimatedLetter = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 3;

  const advanceFrame = () => {
    setCurrentFrame((prevFrame) => {
      if (prevFrame < totalFrames) {
        return prevFrame + 1;
      }
      return prevFrame;
    });
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      <div 
        onClick={advanceFrame} 
        style={{ cursor: currentFrame < totalFrames ? 'pointer' : 'default' }}
      >
        <Image
          src={`/aboutme_frames/${currentFrame}.png`}
          alt={`Letter frame ${currentFrame}`}
          width={500}
          height={currentFrame === totalFrames ? 800 : 500}
          priority={true}
          layout="responsive"
        />
      </div>
      {currentFrame < totalFrames && (
        <div className="text-center mt-1">
          {/* <span style={{ fontFamily: 'Arial, sans-serif', fontSize: '12px' }}> */}
          <span style={{ color: "red" }} className={arianaFont.className}>
            click to open
          </span>
        </div>
      )}
    </div>
  );
};

export default AnimatedLetter;