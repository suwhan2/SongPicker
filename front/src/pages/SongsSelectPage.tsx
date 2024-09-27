import React, { useState, useRef, useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import FooterButtonLayout from '../layouts/FooterButtonLayout';
import CustomModal from '../components/organisms/commons/CustomModal';
import SongSelectTemplate from '../components/template/songSelect/SongsSelectTemplate';
import axiosInstance from '../services/axiosInstance';
import useAuthStore from '../stores/useAuthStore'; // Zustand 스토어 사용

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
  const [isSubmitting, setIsSubmitting] = useState(false); // 제출 중 여부 상태 추가
  const { setSongSelected } = useAuthStore(); // Zustand 스토어에서 함수 가져오기
  const navigate = useNavigate(); // 리다이렉트에 사용할 hook

  const handleBackButtonClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleNextButtonClick = async () => {
    const selectedSongIds = selectedSongs.map(song => song.id);

    console.log('Selected songs:', selectedSongIds);

    if (selectedSongIds.length >= 5) {
      setIsSubmitting(true); // 제출 시작
      try {
        const response = await axiosInstance.post('/api/base-data', {
          ids: selectedSongIds,
        });

        if (response.data.code === 'BD101') {
          console.log('초기 데이터 설정 성공');
          setSongSelected(true); // 곡 선택 상태를 true로 설정
          navigate('/'); // 메인 화면으로 리다이렉트
        } else {
          console.error('초기 데이터 설정 실패:', response.data.message);
        }
      } catch (error) {
        console.error('Error submitting selected songs:', error);
      } finally {
        setIsSubmitting(false); // 제출 끝
      }
    } else {
      console.error('최소 5곡을 선택해야 합니다.');
    }
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

  const handleSongRemove = (songId: number) => {
    setSelectedSongs(prev => prev.filter(s => s.id !== songId));
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
      buttonText={`완료 (${selectedSongs.length})`}
      onButtonClick={handleNextButtonClick}
      isButtonValid={selectedSongs.length >= 5 && !isSubmitting} // 최소 5곡 선택 & 제출 중이 아닐 때만 버튼 활성화
    >
      <SongSelectTemplate
        contentRef={contentRef}
        selectedSongs={selectedSongs}
        onSongSelect={handleSongSelect}
        onSongRemove={handleSongRemove}
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
