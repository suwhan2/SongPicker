import React from 'react';
import SignupStepText from '../../atoms/signup/SignupStepText';
import SongList from '../../organisms/songSelect/songlist';

interface Song {
  id: number;
  coverImage: string;
  title: string;
  singer: string;
}

interface SongSelectTemplateProps {
  contentRef: React.RefObject<HTMLDivElement>;
  selectedSongs: Song[];
  onSongSelect: (song: Song) => void;
}

const SongSelectTemplate: React.FC<SongSelectTemplateProps> = ({
  contentRef,
  selectedSongs,
  onSongSelect,
}) => {
  return (
    <div className="max-w-[440px] w-full mx-auto p-6 h-full">
      <SignupStepText
        text={
          <>
            <p className="font-bold mb-2">애창곡이 있으신가요?</p>
            <p>
              <span className="text-secondary font-bold">5곡 이상</span> 선택하면 맞춤 콘텐츠를
            </p>
            <p>추천해 드릴게요!</p>
          </>
        }
        className="text-left mb-6"
      />
      <div ref={contentRef} className="overflow-y-auto">
        <div className="mb-4">선택한 노래 목록 ({selectedSongs.length})</div>
        <SongList onSongSelect={onSongSelect} />
      </div>
    </div>
  );
};

export default SongSelectTemplate;
