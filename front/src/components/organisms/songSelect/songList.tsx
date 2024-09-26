import React, { useEffect, useState, useCallback, useRef } from 'react';
import axiosInstance from '../../../services/axiosInstance';

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
}

const SongList: React.FC<SongListProps> = ({ onSongSelect }) => {
  const [songs, setSongs] = useState<Song[]>([]);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedSong, setSelectedSong] = useState<number | null>(null);
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

  const handleSongSelect = (song: Song) => {
    setSelectedSong(song.id);
    onSongSelect(song);
  };

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-4 p-4 bg-black">
      {songs.map((song, index) => (
        <div
          key={`${page}-${song.id}`}
          ref={songs.length === index + 1 ? lastSongElementRef : null}
          className={`cursor-pointer rounded-lg overflow-hidden ${
            selectedSong === song.id ? 'border-2 border-primary' : ''
          }`}
          onClick={() => handleSongSelect(song)}
        >
          <div className="relative pb-[100%]">
            <img
              src={song.coverImage}
              alt={song.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
          <div className="p-2 bg-gray-800 text-white">
            <h3 className="font-bold text-sm truncate">{song.title}</h3>
            <p className="text-xs text-gray-400 truncate">{song.singer}</p>
          </div>
        </div>
      ))}
      {loading && <div className="col-span-3 text-center text-white">Loading...</div>}
    </div>
  );
};

export default SongList;
