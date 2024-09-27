import React from 'react';
import LeftMusicItem from '../../molecules/commons/LeftMusicItem';
import RightMusicItem from '../../molecules/commons/RightMusicItem';

type Props = {
  id: string;
  title: string;
  artist: string;
  imageUrl: string;
  onLike: () => void;
  onShowConnectionModal: (message: string) => void;
  onItemClick: (music: { id: string; title: string; artist: string; imageUrl: string }) => void;
};

const MusicItem = ({
  id,
  title,
  artist,
  imageUrl,
  onLike,
  onShowConnectionModal,
  onItemClick,
}: Props) => {
  const handleClick = () => {
    onItemClick({ id, title, artist, imageUrl });
  };
  return (
    <div className="flex items-center justify-between w-full px-2 py-1 rounded-md cursor-pointer">
      <div className="flex-grow overflow-hidden mr-2" onClick={handleClick}>
        <LeftMusicItem title={title} artist={artist} imageUrl={imageUrl} number={id} />
      </div>
      <div className="flex-shrink-0">
        <RightMusicItem onLike={onLike} onShowConnectionModal={onShowConnectionModal} />
      </div>
    </div>
  );
};
export default MusicItem;
