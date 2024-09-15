import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SearchPage from './pages/SearchPage'; // 검색 페이지
import ThemePage from './pages/ThemePage'; // 테마 페이지
import MainPage from './pages/MainPage';
import GroupPage from './pages/GroupPage'; // 그룹 페이지
import ProfilePage from './pages/ProfilePage'; // 회원 페이지
import TopNavbar from './components/organisms/commons/TopNavbar'; // 상단 네브바
import BottomNavbar from './components/organisms/commons/BottomNavbar'; //하단 네브바
import './App.css';

function App() {
  return (
    <div className="flex flex-col min-h-screen w-screen max-w-[640px] mx-auto relative bg-black">
      <TopNavbar />


      <Router>
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/members/:id" element={<ProfilePage />} />
        </Routes>
        <BottomNavbar /> {/* 하단 네비게이션 */}
      </Router>
  </div>
  );
}

export default App;
