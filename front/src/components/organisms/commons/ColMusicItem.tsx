import React from 'react';
import Album from '../../atoms/commons/Album';
import TitleArtist from '../../atoms/commons/TitleAritst';

type Props = {
  imageUrl: string;
  number: string;
  title: string;
  artist: string;
};

const ColMusicItem = ({ imageUrl, number, title, artist }: Props) => {
  return (
    <div className="p-2 bg-black bg-opacity-30 rounded-xl w-full">
      <div className="w-full aspect-square mb-2">
        <Album imageUrl={imageUrl} number={number} />
      </div>
      <TitleArtist title={title} artist={artist} />
    </div>
  );
};

export default ColMusicItem;
