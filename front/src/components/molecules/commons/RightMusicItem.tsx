import React from 'react';
import LikeButton from '../../atoms/commons/LikeButton';
import ReservationButton from '../../atoms/commons/ReservationButton';

type Props = {
  onLike: () => void;
  onShowConnectionModal: (message: string) => void;
};

const RightMusicItem = ({ onLike, onShowConnectionModal }: Props) => {
  return (
    <div className="flex">
      {/* 찜하기 버튼 */}
      <div className="mr-2 flex-shrink-0">
        <LikeButton onLike={onLike} />
      </div>

      {/* 예약하기 버튼 */}
      <div className="flex-shrink-0">
        <ReservationButton onShowConnectionModal={onShowConnectionModal} songId={''} />
      </div>
    </div>
  );
};

export default RightMusicItem;
