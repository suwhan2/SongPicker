import React, { ReactNode } from 'react';
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
import SongSelectPage from './pages/SongsSelectPage';
import useAuthStore from './stores/useAuthStore';
import './App.css';

// PrivateRoute 컴포넌트 정의
interface PrivateRouteProps {
  children: ReactNode;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

// PublicRoute 컴포넌트 정의
interface PublicRouteProps {
  children: ReactNode;
}

const PublicRoute: React.FC<PublicRouteProps> = ({ children }) => {
  const isAuthenticated = useAuthStore(state => state.isAuthenticated);

  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
};

const App = () => {
  const isSongSelected = useAuthStore(state => state.isSongSelected); // 곡 선택 여부 확인

  return (
    <Router>
      <div className="flex flex-col  min-h-screen w-screen max-w-[640px] mx-auto relative bg-black">
        <Routes>
          {/* 공개 라우트 (인증된 사용자는 접근 불가) */}
          <Route
            path="/login"
            element={
              <PublicRoute>
                <LoginPage />
              </PublicRoute>
            }
          />
          <Route
            path="/signup/*"
            element={
              <PublicRoute>
                <SignupPage />
              </PublicRoute>
            }
          />
          <Route
            path="/find-account/*"
            element={
              <PublicRoute>
                <FindAccountPage />
              </PublicRoute>
            }
          />

          {/* 인증이 필요한 라우트 */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <MainPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/search"
            element={
              <PrivateRoute>
                <SearchPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/theme"
            element={
              <PrivateRoute>
                <ThemePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/group"
            element={
              <PrivateRoute>
                <GroupPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/members/:id"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/member-select"
            element={
              <PrivateRoute>
                <MemberSelectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/group-select"
            element={
              <PrivateRoute>
                <GroupSelectPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/qr-scan"
            element={
              <PrivateRoute>
                <QrScanPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/song-select"
            element={
              isSongSelected ? (
                <Navigate to="/" replace /> // 곡이 이미 선택되었으면 메인 페이지로 리다이렉트
              ) : (
                <PrivateRoute>
                  <SongSelectPage />
                </PrivateRoute>
              )
            }
          />

          {/* 기타 모든 라우트는 메인 페이지로 리다이렉트 */}
          {/* <Route path="*" element={<Navigate to="/" replace />} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
