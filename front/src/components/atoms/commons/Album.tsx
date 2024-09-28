import React from 'react';
import { IoMusicalNoteSharp } from 'react-icons/io5';

type Props = {
  size?: number | string;
  imageUrl?: string;
  number: string;
};

const Album = ({ size = '100%', imageUrl, number }: Props) => {
  return (
    <div
      className="aspect-square relative rounded-sm overflow-hidden"
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      {/* 앨범 표지 */}
      <div className="absolute inset-0">
        {imageUrl ? (
          <img src={imageUrl} alt="앨범이미지" className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-700 rounded-sm overflow-hidden">
            <IoMusicalNoteSharp
              className="text-white"
              size={size === '100%' ? 48 : Number(size) / 2}
            />
          </div>
        )}
      </div>

      {/* 곡 번호 */}
      <div className="absolute inset-0 bg-black bg-opacity-60 flex justify-center items-center">
        <p className="text-[12px] text-white">{number}</p>
      </div>
    </div>
  );
};

export default Album;
