import React from 'react';
import BottomSlideModal from './BottomSlideModal';

interface MusicDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  artist: string;
  imageUrl: string;
  height?: string;
}

const MusicDetailModal = ({
  isOpen,
  onClose,
  title,
  artist,
  imageUrl,
  height,
}: MusicDetailModalProps) => {
  return (
    <BottomSlideModal isOpen={isOpen} onClose={onClose} height={height} title="음악 상세 정보">
      <div className="text-white">
        <h2 className="text-xl font-bold mb-2">{title}</h2>
        <p className="text-gray-300 mb-4">{artist}</p>
        <img src={imageUrl} alt={title} className="w-full h-40 object-cover rounded-md mb-4" />
        {/* 여기에 추가적인 음악 상세 정보를 넣을 수 있습니다 */}
      </div>
    </BottomSlideModal>
  );
};

export default MusicDetailModal;
