import React, { useEffect, useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import SearchMain from '../components/template/SearchMain';
import SearchBar from '../components/molecules/search/SearchBar';
import { useLocation, useNavigate } from 'react-router-dom';
import { searchSongs } from '../services/songservices';
import axios from 'axios';

const SearchPage = () => {
  const [searchKeyword, setSearchKeyword] = useState<string>('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const location = useLocation();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const keyword = queryParams.get('keyword') || '';
    setSearchKeyword(keyword);
    if (keyword) {
      fetchSearchResults(keyword);
    }
  }, [location.search]);

  const fetchSearchResults = async (keyword: string) => {
    try {
      setError(null);
      console.log('Searching for:', keyword);
      const response = await searchSongs(keyword);
      console.log('Search response:', response);
      setSearchResults(response.songSearchList || []);
    } catch (error) {
      console.error('검색 결과를 가져오는 중 오류 발생:', error);
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 403) {
          setError('접근 권한이 없습니다. 로그인이 필요할 수 있습니다.');
        } else {
          setError(
            `검색 중 오류가 발생했습니다: ${error.response?.statusText || '알 수 없는 오류'}`
          );
        }
      } else {
        setError('알 수 없는 오류가 발생했습니다.');
      }
      setSearchResults([]);
    }
  };

  const handleSearch = (keyword: string) => {
    if (keyword.trim()) {
      navigate(`/search?keyword=${encodeURIComponent(keyword)}`);
    }
  };

  return (
    <MainLayout title="노래 검색">
      <div className="flex flex-col p-4">
        <div className="mb-6 sticky top-0 bg-black z-10">
          <SearchBar onSearch={handleSearch} initialKeyword={searchKeyword} />
        </div>
        <SearchMain keyword={searchKeyword} searchResults={searchResults} />
      </div>
    </MainLayout>
  );
};

export default SearchPage;
