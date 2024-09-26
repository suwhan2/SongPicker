import React, { useState, useRef, useEffect, useCallback } from 'react';
import FooterButtonLayout from '../layouts/FooterButtonLayout';
import CustomModal from '../components/organisms/commons/CustomModal';
import SongSelectTemplate from '../components/template/songSelect/songSelectTemplate';

interface Song {
  id: number;
  coverImage: string;
  title: string;
  singer: string;
}

const SongSelectPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedSongs, setSelectedSongs] = useState<Song[]>([]);
  const contentRef = useRef<HTMLDivElement>(null);

  const handleBackButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNextButtonClick = () => {
    console.log('Selected songs:', selectedSongs);
  };

  const handleSongSelect = (song: Song) => {
    setSelectedSongs(prev => {
      const exists = prev.some(s => s.id === song.id);
      if (exists) {
        return prev.filter(s => s.id !== song.id);
      } else {
        return [...prev, song];
      }
    });
  };

  const adjustScroll = useCallback(() => {
    if (contentRef.current) {
      const activeElement = document.activeElement;
      if (activeElement && activeElement instanceof HTMLElement) {
        const rect = activeElement.getBoundingClientRect();
        const scrollTop = contentRef.current.scrollTop;
        const containerHeight = contentRef.current.clientHeight;

        if (rect.bottom > containerHeight) {
          contentRef.current.scrollTo({
            top: scrollTop + rect.bottom - containerHeight + 20,
            behavior: 'smooth',
          });
        }
      }
    }
  }, []);

  useEffect(() => {
    window.addEventListener('focus', adjustScroll, true);
    return () => {
      window.removeEventListener('focus', adjustScroll, true);
    };
  }, [adjustScroll]);

  return (
    <FooterButtonLayout
      title="곡선택"
      onBackButtonClick={handleBackButtonClick}
      buttonText="다음"
      onButtonClick={handleNextButtonClick}
      isButtonValid={selectedSongs.length >= 5}
    >
      <SongSelectTemplate
        contentRef={contentRef}
        selectedSongs={selectedSongs}
        onSongSelect={handleSongSelect}
      />
      <CustomModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        message="서비스 이용을 위해 곡선택을 해주세요!"
        rightButtonText="확인"
      />
    </FooterButtonLayout>
  );
};

export default SongSelectPage;
