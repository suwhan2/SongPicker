import React, { useState, useEffect, useRef } from 'react';

type Props = {
  title: string;
  artist: string;
};

const TitleArtist = ({ title, artist }: Props) => {
  const [isOverflowing, setIsOverflowing] = useState(false);
  const [animationStarted, setAnimationStarted] = useState(false);
  const titleRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const titleElement = titleRef.current;
    if (titleElement) {
      setIsOverflowing(titleElement.scrollWidth > titleElement.clientWidth);
    }
  }, [title]);

  useEffect(() => {
    if (isOverflowing) {
      const timer = setTimeout(() => {
        setAnimationStarted(true);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [isOverflowing]);

  return (
    <div className="w-full overflow-hidden">
      <div className="overflow-hidden">
        <p
          ref={titleRef}
          className={`font-medium truncate ${
            isOverflowing && animationStarted ? 'animate-marquee' : ''
          }`}
        >
          {title}
        </p>
      </div>
      <p className="text-[#B3B3B3] text-sm truncate">{artist}</p>
    </div>
  );
};

export default TitleArtist;
