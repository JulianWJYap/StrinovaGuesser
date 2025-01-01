"use client"
import Image from 'next/image';
import { useState } from 'react';

interface ExpandableImgProps{
  disableExpand?:boolean

  className?: string;
  priority: boolean;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export default function ExpandableImage(Props: ExpandableImgProps) {
  const imgProperties = Props;
  const [isExpanded, setIsExpanded] = useState(false);

  const handleClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <Image
        className={`cursor-pointer h-fit w-fit px-4 py-4 ${imgProperties.className}`}
        priority={imgProperties.priority}
        src={imgProperties.src}
        alt={imgProperties.alt}
        width={imgProperties.width}
        height={imgProperties.height}
        onClick={handleClick}
        style={{
          transition: 'transform 0.3s ease',
          transform: isExpanded ? 'scale(1.2)' : 'scale(1)',
          zIndex: isExpanded ? 10 : 1,
        }}
      />
      {!imgProperties.disableExpand && isExpanded && (
        <div
          onClick={handleClick}
          className='fixed w-screen h-screen inset-0 z-50 flex items-center justify-center'
          style={{
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
          }}
        >
          <Image
            className='object-contain max-h-[90%] max-w-[90%]'
            src={imgProperties.src}
            alt={imgProperties.alt}
            width={imgProperties.width}
            height={imgProperties.height}
          />
        </div>
      )}
    </div>
  );
}
