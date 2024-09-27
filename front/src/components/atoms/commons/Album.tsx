import React from 'react';
import albumImage from '../../../assets/exampleAlbum.png';

type Props = {
  size?: number;
  imageUrl?: string;
  number: string;
};

const Album = ({ size = 50, imageUrl, number }: Props) => {
  return (
    <div
      className="aspect-square relative rounded-sm overflow-hidden"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* 앨범 표지 */}
      <div className="absolute inset-0">
        <img src={imageUrl || albumImage} alt="앨범이미지" className="w-full h-full object-cover" />
      </div>

      {/* 곡 번호 */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        <p className="text-[12px] text-white">{number}</p>
      </div>
    </div>
  );
};

export default Album;
