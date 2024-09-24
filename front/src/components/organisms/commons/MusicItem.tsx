import React from 'react';
import LeftMusicItem from '../../molecules/commons/LeftMusicItem';
import RightMusicItem from '../../molecules/commons/RightMusicItem';

type Props = {
  title: string;
  artist: string;
  imageUrl: string;
  onLike: () => void;
  onShowConnectionModal: (message: string) => void;
};

const MusicItem = ({ title, artist, imageUrl, onLike, onShowConnectionModal }: Props) => {
  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex-grow overflow-hidden mr-2">
        <LeftMusicItem title={title} artist={artist} imageUrl={imageUrl} />
      </div>
      <div className="flex-shrink-0">
        <RightMusicItem onLike={onLike} onShowConnectionModal={onShowConnectionModal} />
      </div>
    </div>
  );
};

export default MusicItem;
