import React from 'react';
import LeftMusicItem from '../../molecules/commons/LeftMusicItem';
import RightMusicItem from '../../molecules/commons/RightMusicItem';

type Props = {
  title: string;
  artist: string;
  imageUrl: string;
};

const MusicItem = ({ title, artist, imageUrl }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-grow overflow-hidden mr-2">
        <LeftMusicItem title={title} artist={artist} imageUrl={imageUrl} />
      </div>
      <div className="flex-shrink-0">
        <RightMusicItem />
      </div>
    </div>
  );
};

export default MusicItem;
