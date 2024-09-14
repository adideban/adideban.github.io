'use client';

import { useState, useEffect } from 'react';
import RotatingIcon from './RotatingIcon';

interface DynamicIconPlacementProps {
  containerRef: React.RefObject<HTMLElement>;
  numIcons: number;
}

export default function DynamicIconPlacement({ containerRef, numIcons }: DynamicIconPlacementProps) {
  const [icons, setIcons] = useState<JSX.Element[]>([]);

  useEffect(() => {
    const fetchIcons = async () => {
      const response = await fetch(`/api/random-icons?count=${numIcons}`);
      const iconSources: string[] = await response.json();

      if (!containerRef.current) return;

      const container = containerRef.current;
      const containerRect = container.getBoundingClientRect();

      const newIcons = iconSources.map((src, index) => {
        const x = Math.random() * (containerRect.width - 30);
        const y = Math.random() * (containerRect.height - 30);

        return (
          <RotatingIcon
            key={index}
            src={src}
            alt={`Random Icon ${index + 1}`}
            className="absolute"
            style={{
              left: `${x}px`,
              top: `${y}px`,
            }}
          />
        );
      });

      setIcons(newIcons);
    };

    const timer = setTimeout(fetchIcons, 1000);

    window.addEventListener('resize', fetchIcons);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', fetchIcons);
    };
  }, [containerRef, numIcons]);

  return <>{icons}</>;
}