
// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';

// const AnimatedLetter: React.FC = () => {
//   const [currentFrame, setCurrentFrame] = useState(1);
//   const totalFrames = 6;
//   const intervalTime = 2000; // 2 seconds

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCurrentFrame((prevFrame) => {
//         if (prevFrame < totalFrames) {
//           return prevFrame + 1;
//         }
//         clearInterval(interval);
//         return prevFrame;
//       });
//     }, intervalTime);

//     return () => clearInterval(interval);
//   }, []);

//   return (
//     <div className="relative w-full max-w-md mx-auto">
//       <Image
//         src={`/aboutme_frames/${currentFrame}.png`}
//         alt={`Letter frame ${currentFrame}`}
//         width={500}
//         height={currentFrame === totalFrames ? 800 : 500}
//         layout="responsive"
//         className="transition-opacity duration-500"
//       />
//     </div>
//   );
// };

// export default AnimatedLetter;
import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const AnimatedLetter: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState(1);
  const totalFrames = 6;
  const intervalTime = 2000; // 2 seconds

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFrame((prevFrame) => {
        if (prevFrame < totalFrames) {
          return prevFrame + 1;
        }
        clearInterval(interval);
        return prevFrame;
      });
    }, intervalTime);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <Image
        src={`/aboutme_frames/${currentFrame}.png`}
        alt={`Letter frame ${currentFrame}`}
        width={500}
        height={currentFrame === totalFrames ? 800 : 500}
        priority={true}
        layout="responsive"
      />
    </div>
  );
};

export default AnimatedLetter;