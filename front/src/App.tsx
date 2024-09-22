import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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
import './App.css';

const App = () => {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-screen max-w-[640px] mx-auto relative bg-black">
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/theme" element={<ThemePage />} />
          <Route path="/group" element={<GroupPage />} />
          <Route path="/members/:id" element={<ProfilePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup/*" element={<SignupPage />} />
          <Route path="/member-select" element={<MemberSelectPage />} />
          <Route path="/group-select" element={<GroupSelectPage />} />
          <Route path="/qr-scan" element={<QrScanPage />} />
          <Route path="/find-account/*" element={<FindAccountPage />} />
          <Route path="/song-select" element={<SongSelectPage />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
