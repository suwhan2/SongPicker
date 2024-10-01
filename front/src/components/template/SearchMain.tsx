import React from 'react';
import RecentSearch from '../organisms/search/RecentSearch';

type Props = {
  keyword: string;
  searchResults: any[];
};

const SearchMain = ({ keyword, searchResults }: Props) => {
  return (
    <div>
      {!keyword && (
        <div>
          <div className="flex items-center justify-between mb-3">
            <p className="font-medium text-[#888]">최근 검색어</p>
            <button
              className="text-sm text-[#444]"
              onClick={() => {
                localStorage.removeItem('recentSearches');
                window.location.reload();
              }}
            >
              전체 삭제
            </button>
          </div>
          <RecentSearch />
        </div>
      )}

      {keyword && (
        <div className="search-results">
          <h2 className="mb-4 text-xl font-bold">{`"${keyword}"에 대한 검색 결과`}</h2>
          {searchResults.length > 0 ? (
            searchResults.map((song: unknown) => (
              <div key={song.number} className="song-item flex items-center mb-4">
                {song.coverImage && (
                  <img src={song.coverImage} alt={song.title} className="w-12 h-12 mr-4" />
                )}
                <div>
                  <h3 className="text-lg font-semibold">{song.title}</h3>
                  <p className="text-sm text-gray-500">{song.singer}</p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">검색 결과가 없습니다.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchMain;
