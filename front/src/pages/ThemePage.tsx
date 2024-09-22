import React from 'react';
import TopNavbar from '../components/organisms/commons/TopNavbar';
import BottomNavbar from '../components/organisms/commons/BottomNavbar';

const ThemePage = () => {
  return (
    <div>
      <TopNavbar />

      {/* 테마페이지 내용 */}
      <div>ThemePage</div>

      {/* 하단 네브 */}
      <BottomNavbar />
    </div>
  );
};

export default ThemePage;
