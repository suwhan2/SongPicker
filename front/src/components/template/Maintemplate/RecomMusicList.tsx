import React, { useState, useRef, useEffect } from 'react';
import MusicItem from '../../organisms/commons/MusicItem';

// 하드코딩된 음악 데이터
const hardcodedMusicList = [
  { id: '1', title: 'Song 1', artist: 'Artist 1', imageUrl: 'url1' },
  { id: '2', title: 'Song 2', artist: 'Artist 2', imageUrl: 'url2' },
  { id: '3', title: 'Song 3', artist: 'Artist 3', imageUrl: 'url3' },
  { id: '4', title: 'Song 4', artist: 'Artist 4', imageUrl: 'url4' },
  { id: '5', title: 'Song 5', artist: 'Artist 5', imageUrl: 'url5' },
  { id: '6', title: 'Song 6', artist: 'Artist 6', imageUrl: 'url6' },
  { id: '7', title: 'Song 7', artist: 'Artist 7', imageUrl: 'url7' },
  { id: '8', title: 'Song 8', artist: 'Artist 8', imageUrl: 'url8' },
  { id: '9', title: 'Song 9', artist: 'Artist 9', imageUrl: 'url9' },
  { id: '10', title: 'Song 10', artist: 'Artist 10', imageUrl: 'url10' },
  { id: '11', title: 'Song 11', artist: 'Artist 11', imageUrl: 'url11' },
  { id: '12', title: 'Song 12', artist: 'Artist 12', imageUrl: 'url12' },
  { id: '13', title: 'Song 13', artist: 'Artist 13', imageUrl: 'url13' },
  { id: '14', title: 'Song 14', artist: 'Artist 14', imageUrl: 'url14' },
  { id: '15', title: 'Song 15', artist: 'Artist 15', imageUrl: 'url15' },
  { id: '16', title: 'Song 16', artist: 'Artist 16', imageUrl: 'url16' },
  { id: '17', title: 'Song 17', artist: 'Artist 17', imageUrl: 'url17' },
  { id: '18', title: 'Song 18', artist: 'Artist 18', imageUrl: 'url18' },
  { id: '19', title: 'Song 19', artist: 'Artist 19', imageUrl: 'url19' },
  { id: '20', title: 'Song 20', artist: 'Artist 20', imageUrl: 'url20' },
];

const RecomMusicList = () => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const itemsPerPage = 5;
  const totalPages = 4; // 항상 4 세트

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentPage * (100 / totalPages)}%)`;
    }
  }, [currentPage]);

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const container = containerRef.current;
    if (container) {
      container.dataset.startX = touch.clientX.toString();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const container = containerRef.current;
    if (container && container.dataset.startX) {
      const deltaX = touch.clientX - parseFloat(container.dataset.startX);
      container.style.transform = `translateX(calc(-${currentPage * (100 / totalPages)}% + ${deltaX}px))`;
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    const container = containerRef.current;
    if (container && container.dataset.startX) {
      const deltaX = e.changedTouches[0].clientX - parseFloat(container.dataset.startX);
      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0 && currentPage > 0) {
          setCurrentPage(currentPage - 1);
        } else if (deltaX < 0 && currentPage < totalPages - 1) {
          setCurrentPage(currentPage + 1);
        }
      }
      container.style.transform = `translateX(-${currentPage * (100 / totalPages)}%)`;
      delete container.dataset.startX;
    }
  };

  return (
    <div className="w-full">
      <h3 className="w-full text-xl font-semibold mb-4">김해피님의 취향저격 선곡리스트</h3>
      {/* 노래 20곡 리스트 */}
      <div className="w-full relative overflow-hidden bg-[#333] rounded-md">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: '400%' }} // 4 sets * 100%
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {Array.from({ length: totalPages }).map((_, pageIndex) => (
            <div key={pageIndex} className="w-[22.5%] flex-shrink-0 mr-[2.5%]">
              <div className="py-6 px-3">
                {hardcodedMusicList
                  .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
                  .map((item, index) => (
                    <div key={item.id} className={index !== 0 ? 'mt-4' : ''}>
                      <MusicItem title={item.title} artist={item.artist} imageUrl={item.imageUrl} />
                    </div>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`mx-1 w-2 h-2 rounded-full ${currentPage === index ? 'bg-purple-500' : 'bg-gray-300'}`}
          />
        ))}
      </div>
    </div>
  );
};

export default RecomMusicList;
