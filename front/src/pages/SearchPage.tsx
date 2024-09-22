import React from 'react';
import TopNavbar from '../components/organisms/commons/TopNavbar';
import BottomNavbar from '../components/organisms/commons/BottomNavbar';

const SearchPage = () => {
  return (
    <div>
      <TopNavbar />

      {/* 검색페이지 내용 */}
      <div>SearchPage</div>

      {/* 하단 네브 */}
      <BottomNavbar />
    </div>
  );
};

export default SearchPage;
