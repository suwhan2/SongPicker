import React from 'react';
import LikeButton from '../../atoms/commons/LikeButton';
import ReservationButton from '../../atoms/commons/ReservationButton';

type Props = {}

const RightMusicItem = (props: Props) => {
  return (
    <div className="flex">
      {/* 찜하기 버튼 */}
      <div className="mr-2 flex-shrink-0">
        <LikeButton />
      </div>

      {/* 예약하기 버튼 */}
      <div className="flex-shrink-0">
        <ReservationButton />
      </div>
    </div>
  );
};

export default RightMusicItem;
