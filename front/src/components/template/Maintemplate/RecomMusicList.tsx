import React, { useState, useRef, useEffect, useCallback, useMemo } from 'react';
import MusicItem from '../../organisms/commons/MusicItem';
import MusicDetailModal from '../commons/MusicDetailModal';
import { IoMdRefreshCircle } from 'react-icons/io';
import { getPersonalRecommendations } from '../../../services/songservices';

type Props = {
  onShowNotification: (title: string, description: string) => void;
  onShowConnectionModal: (message: string) => void;
};

interface RecommendedSong {
  number: string;
  title: string;
  singer: string;
  coverImage: string;
  isLike: boolean;
  likeId: number | null;
}

const RecomMusicList = ({ onShowNotification, onShowConnectionModal }: Props) => {
  const [currentPage, setCurrentPage] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<RecommendedSong | null>(null);
  const [recommendedSongs, setRecommendedSongs] = useState<RecommendedSong[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const itemsPerPage = 5;
  const totalPages = useMemo(
    () => Math.max(1, Math.ceil(recommendedSongs.length / itemsPerPage)),
    [recommendedSongs.length]
  );

  const fetchRecommendations = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await getPersonalRecommendations();
      if (response.code === 'SO102') {
        if (Array.isArray(response.data) && response.data.length > 0) {
          setRecommendedSongs(response.data);
          setCurrentPage(0);
        } else {
          setError('No recommendations available at the moment.');
        }
      } else {
        setError(`Failed to fetch recommendations: ${response.message}`);
      }
    } catch (err) {
      setError('An error occurred while fetching recommendations. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRecommendations();
  }, [fetchRecommendations]);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.style.transform = `translateX(-${currentPage * 100}%)`;
    }
  }, [currentPage]);

  const handleRefresh = useCallback(() => {
    fetchRecommendations();
    onShowNotification('♪ 추천리스트 변경', '새로운 추천 목록을 불러왔습니다.');
  }, [fetchRecommendations, onShowNotification]);

  const handleLike = useCallback(() => {
    onShowNotification(
      '찜 완료!',
      '찜한곡 리스트에 추가되었습니다!\n찜보관함에서 목록을 확인하실 수 있습니다.'
    );
  }, [onShowNotification]);

  const handleItemClick = useCallback((music: RecommendedSong) => {
    setSelectedMusic(music);
    setIsModalOpen(true);
  }, []);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0];
    const container = containerRef.current;
    if (container) {
      container.dataset.startX = touch.clientX.toString();
    }
  }, []);

  const handleTouchMove = useCallback(
    (e: React.TouchEvent) => {
      const touch = e.touches[0];
      const container = containerRef.current;
      if (container && container.dataset.startX) {
        const deltaX = touch.clientX - parseFloat(container.dataset.startX);
        container.style.transform = `translateX(calc(-${currentPage * 100}% + ${deltaX}px))`;
      }
    },
    [currentPage]
  );

  const handleTouchEnd = useCallback(
    (e: React.TouchEvent) => {
      const container = containerRef.current;
      if (container && container.dataset.startX) {
        const deltaX = e.changedTouches[0].clientX - parseFloat(container.dataset.startX);
        if (Math.abs(deltaX) > 50) {
          if (deltaX > 0 && currentPage > 0) {
            setCurrentPage(prev => prev - 1);
          } else if (deltaX < 0 && currentPage < totalPages - 1) {
            setCurrentPage(prev => prev + 1);
          }
        }
        container.style.transform = `translateX(-${currentPage * 100}%)`;
        delete container.dataset.startX;
      }
    },
    [currentPage, totalPages]
  );

  const renderMusicItems = useMemo(
    () =>
      Array.from({ length: totalPages }).map((_, pageIndex) => (
        <div key={pageIndex} className="w-full flex-shrink-0">
          <div className="py-3 px-1">
            {recommendedSongs
              .slice(pageIndex * itemsPerPage, (pageIndex + 1) * itemsPerPage)
              .map((item, index) => (
                <div key={item.number} className={index !== 0 ? 'mt-3' : ''}>
                  <MusicItem
                    id={item.number.toString()}
                    title={item.title}
                    artist={item.singer}
                    imageUrl={item.coverImage}
                    onLike={handleLike}
                    onShowConnectionModal={onShowConnectionModal}
                    onItemClick={() => handleItemClick(item)}
                  />
                </div>
              ))}
          </div>
        </div>
      )),
    [recommendedSongs, totalPages, handleLike, onShowConnectionModal, handleItemClick]
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="w-full text-xl font-semibold">김해피님의 취향저격 선곡리스트</h3>
        <IoMdRefreshCircle className="size-8 cursor-pointer" onClick={handleRefresh} />
      </div>
      <div className="w-full relative overflow-hidden bg-[#333] rounded-md">
        <div
          ref={containerRef}
          className="flex transition-transform duration-300 ease-in-out"
          style={{ width: `${totalPages * 100}%` }}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {renderMusicItems}
        </div>
      </div>
      <div className="mt-4 flex justify-center items-center">
        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            className={`mx-1 w-2 h-2 rounded-full ${currentPage === index ? 'bg-purple-500' : 'bg-gray-500'}`}
          />
        ))}
      </div>
      {selectedMusic && (
        <MusicDetailModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title={selectedMusic.title}
          artist={selectedMusic.singer}
          imageUrl={selectedMusic.coverImage}
          height="80vh"
        />
      )}
    </div>
  );
};

export default React.memo(RecomMusicList);
