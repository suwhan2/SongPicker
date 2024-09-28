import React from 'react';

type Props = {
  title: string;
  artist: string;
};

const TitleArtist = ({ title, artist }: Props) => {
  return (
    <div className="w-full overflow-hidden">
      <p className="font-medium truncate">{title}</p>
      <p className="text-[#B3B3B3] text-sm truncate">{artist}</p>
    </div>
  );
};

export default TitleArtist;
