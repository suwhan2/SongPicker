import React from 'react';
import SignupStepText from '../../atoms/signup/SignupStepText';
import SongList from '../../organisms/songSelect/SongsList';
import SelectedSongsList from '../../organisms/songSelect/SelectedSongsList';

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
  onSongRemove: (songId: number) => void;
}

const SongSelectTemplate = ({
  contentRef,
  selectedSongs,
  onSongSelect,
  onSongRemove,
}: SongSelectTemplateProps) => {
  return (
    <div className="max-w-[440px] w-full mx-auto p-6 h-full flex flex-col">
      <div className="flex-shrink-0">
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
        <SelectedSongsList selectedSongs={selectedSongs} onRemove={onSongRemove} />
      </div>
      <div ref={contentRef} className="flex-grow overflow-y-auto mt-4">
        <SongList selectedSongs={selectedSongs} onSongSelect={onSongSelect} />
      </div>
    </div>
  );
};

export default SongSelectTemplate;
