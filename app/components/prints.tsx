// "use client";

// import Image from 'next/image';

// const prints = [
//   "prints/print1.jpg",
//   "prints/print2.jpg",
//   "prints/print3.jpg",
//   // Add the paths to all your prints here
// ];

// const Prints = () => {
//   return (
//     <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4">
//       {prints.map((src, index) => (
//         <div key={index} className="relative w-full h-0 pb-[75%] overflow-hidden">
//           <Image
//             src={`/${src}`}
//             alt={`Print ${index + 1}`}
//             layout="fill"
//             objectFit="cover"
//             className="rounded-lg"
//           />
//         </div>
//       ))}
//     </div>
//   );
// };

// export default Prints;
