import React from 'react';
import { IoClose } from 'react-icons/io5';

interface Song {
  id: number;
  title: string;
}

interface SelectedSongsListProps {
  selectedSongs: Song[];
  onRemove: (songId: number) => void;
}

const SelectedSongsList: React.FC<SelectedSongsListProps> = ({ selectedSongs, onRemove }) => {
  return (
    <div className=" overflow-x-auto">
      <div
        className="flex flex-wrap content-start"
        style={{
          maxHeight: '4.5rem', // Adjust this value based on your item height
          minWidth: 'max-content',
        }}
      >
        {selectedSongs.map(song => (
          <div
            key={song.id}
            className="flex items-center bg-gray-800 text-white px-3 py-1 rounded-full text-sm mr-2 mb-2 h-8"
          >
            <span className="mr-2 truncate max-w-[150px]">{song.title}</span>
            <button onClick={() => onRemove(song.id)} className="focus:outline-none">
              <IoClose className="text-gray-400 hover:text-white" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SelectedSongsList;
