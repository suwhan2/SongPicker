import React, { useState } from 'react';
import CustomAlert from '../../template/commons/CustomAlert';

type Props = {
  initialLiked?: boolean;
  onToggle?: (isLiked: boolean) => void;
};

const LikeButton = ({ initialLiked = false, onToggle }: Props) => {
  const [isLiked, setIsLiked] = useState(initialLiked);
  const [showNotification, setShowNotification] = useState(false);

  const handleClick = () => {
    const newLikedState = !isLiked;
    setIsLiked(newLikedState);
    if (newLikedState) {
      setShowNotification(true);
    }
    if (onToggle) {
      onToggle(newLikedState);
    }
  };

  return (
    <>
      <button
        className={`px-2 py-1.5 rounded-sm cursor-pointer text-sm font-medium transition-colors
          ${
            isLiked
              ? 'bg-gray-200 text-gray-500' // 비활성화 상태
              : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white' // 활성화 상태
          }`}
        onClick={handleClick}
        aria-pressed={isLiked}
      >
        {isLiked ? '찜해제' : '찜하기'}
      </button>
      {showNotification && (
        <CustomAlert
          title="찜 완료!"
          description={`찜한곡 리스트에 추가되었습니다!\n찜보관함에서 목록을 확인하실 수 있습니다.`}
          onClose={() => setShowNotification(false)}
        />
      )}
    </>
  );
};

export default LikeButton;