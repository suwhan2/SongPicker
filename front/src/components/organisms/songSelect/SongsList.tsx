import React, { useEffect, useState, useCallback, useRef } from 'react';
import axiosInstance from '../../../services/axiosInstance';
import { PiMicrophoneStageFill } from 'react-icons/pi';

interface Song {
  id: number;
  coverImage: string;
  title: string;
  singer: string;
}

interface ApiResponse {
  code: string;
  message: string;
  data: {
    content: Song[];
    last: boolean;
  };
}

interface SongListProps {
  onSongSelect: (song: Song) => void;
  selectedSongs: Song[];
}

const SongList = ({ onSongSelect, selectedSongs }: SongListProps) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const lastSongElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting && hasMore) {
          setPage(prevPage => {
            const newPage = prevPage + 1;
            console.log(`Moving to page ${newPage}`);
            return newPage;
          });
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  const fetchSongs = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await axiosInstance.get<ApiResponse>(`/api/base-data/initial?page=${page}`);
      if (response.data.code === 'BD100') {
        const newSongs = response.data.data.content;
        setSongs(prevSongs => {
          const uniqueSongs = newSongs.filter(
            (newSong: Song) => !prevSongs.some(prevSong => prevSong.id === newSong.id)
          );
          return [...prevSongs, ...uniqueSongs];
        });
        setHasMore(!response.data.data.last);
      } else {
        setError('Failed to fetch songs: Unexpected response code');
      }
    } catch (error) {
      console.error('Failed to fetch songs:', error);
      setError('Failed to fetch songs. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSongs();
  }, [page]);

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 p-2">
      {songs.map((song, index) => {
        const isSelected = selectedSongs.some(s => s.id === song.id);
        return (
          <div
            key={`${page}-${song.id}`}
            ref={songs.length === index + 1 ? lastSongElementRef : null}
            className="cursor-pointer relative aspect-square "
            onClick={() => onSongSelect(song)}
          >
            <div
              className={`w-full h-full rounded-lg overflow-hidden ${
                isSelected ? 'ring-2 ring-neutral brightness-100' : 'brightness-75'
              }`}
            >
              <img src={song.coverImage} alt={song.title} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 p-1">
                <h3 className="font-bold text-xs text-white truncate">{song.title}</h3>
                <p className="text-xxs text-gray-300 truncate">{song.singer}</p>
              </div>
            </div>
            {isSelected && (
              <div className="absolute -top-2 -right-2 bg-neutral rounded-full p-1.5 shadow-lg">
                <PiMicrophoneStageFill className="text-white text-lg" />
              </div>
            )}
          </div>
        );
      })}
      {loading && <div className="col-span-3 text-center text-white">Loading...</div>}
    </div>
  );
};

export default SongList;
