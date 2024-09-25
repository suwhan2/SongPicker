import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SearchPage from './pages/SearchPage';
import ThemePage from './pages/ThemePage';
import MainPage from './pages/MainPage';
import GroupPage from './pages/GroupPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import MemberSelectPage from './pages/LinkPages/MemberSelectPage';
import GroupSelectPage from './pages/LinkPages/GroupSelectPage';
import QrScanPage from './pages/LinkPages/QrScanPage';
import FindAccountPage from './pages/FindAccountPage';
import SongSelectPage from './pages/SongSelectPage';
import useAuthStore from './stores/useAuthStore';
import './App.css';

const App = () => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  return (
    <Router>
      <div className="flex flex-col min-h-screen w-screen max-w-[640px] mx-auto relative bg-black">
        <Routes>
          {/* 인증된 사용자만 접근 가능한 라우트 */}
          {isAuthenticated ? (
            <>
              <Route path="/" element={<MainPage />} />
              <Route path="/search" element={<SearchPage />} />
              <Route path="/theme" element={<ThemePage />} />
              <Route path="/group" element={<GroupPage />} />
              <Route path="/members/:id" element={<ProfilePage />} />
              <Route path="/member-select" element={<MemberSelectPage />} />
              <Route path="/group-select" element={<GroupSelectPage />} />
              <Route path="/qr-scan" element={<QrScanPage />} />
              <Route path="/song-select" element={<SongSelectPage />} />
              {/* 로그인한 사용자가 로그인/회원가입/계정찾기 페이지 접근 시 메인으로 리다이렉트 */}
              <Route path="/login" element={<Navigate to="/" replace />} />
              <Route path="/signup/*" element={<Navigate to="/" replace />} />
              <Route path="/find-account/*" element={<Navigate to="/" replace />} />
            </>
          ) : (
            <>
              {/* 비인증 사용자용 라우트 */}
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup/*" element={<SignupPage />} />
              <Route path="/find-account/*" element={<FindAccountPage />} />
              {/* 비인증 사용자가 다른 페이지 접근 시 로그인 페이지로 리다이렉트 */}
              <Route path="*" element={<Navigate to="/login" replace />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
