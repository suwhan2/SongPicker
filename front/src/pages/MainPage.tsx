import React from 'react';
import KaraokeLinkMode from '../components/organisms/MainOrganism/KaraokeLinkMode';
import TopNavbar from '../components/organisms/commons/TopNavbar';
import BottomNavbar from '../components/organisms/commons/BottomNavbar';
import RecomMusicList from '../components/template/Maintemplate/RecomMusicList';

const MainPage = () => {
  return (
    <div>
      <TopNavbar />

      {/* 내용 */}
      <div>
        {/* 노래방 연결 */}
        <div className="w-full px-5 my-8">
          <KaraokeLinkMode />
        </div>

        {/* 사용자 맞춤 추천곡 */}
        <div className="w-full px-5 mt-12">
          <RecomMusicList />
        </div>

        {/* 테마 추천 */}

        {/* 사용자 통계 배너 */}

        {/* 사용자 추천 아티스트 */}
      </div>

      {/* 하단 네브 */}
      <BottomNavbar />
    </div>
  );
};

export default MainPage;
