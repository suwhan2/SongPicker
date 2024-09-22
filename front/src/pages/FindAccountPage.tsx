import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink, Navigate, useLocation, useNavigate } from 'react-router-dom';
import FindId from '../components/template/FindId';
import FindPassword from '../components/template/FindPassword';
import ShowId from '../components/template/ShowId';
import SubTopNavbar from '../components/molecules/commons/SubTopNavbar';
import FooterButton from '../components/atoms/commons/FooterButton';

const FindAccountPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [buttonText, setButtonText] = useState('아이디 찾기');
  const [isButtonValid, setIsButtonValid] = useState(false);
  const [showIdResult, setShowIdResult] = useState(false);
  const [foundId, setFoundId] = useState('');

  useEffect(() => {
    if (showIdResult) {
      setButtonText('로그인하러가기');
      setIsButtonValid(true);
    } else if (location.pathname.includes('/password')) {
      setButtonText('다음');
    } else {
      setButtonText('아이디 찾기');
    }
    if (!showIdResult) {
      setIsButtonValid(false);
    }
  }, [location.pathname, showIdResult]);

  const getTitle = () => {
    return location.pathname.includes('/password') ? '비밀번호 찾기' : '아이디 찾기';
  };

  const handleButtonClick = () => {
    if (showIdResult) {
      navigate('/login');
    } else if (location.pathname.includes('/id') && isButtonValid) {
      // 현재는 하드코딩으로 아이디 띄우는중!
      const mockFoundId = 'example_user';
      setFoundId(mockFoundId);
      setShowIdResult(true);
    }
  };

  const handleVerificationComplete = (isComplete: boolean) => {
    setIsButtonValid(isComplete);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <SubTopNavbar title={getTitle()} />

      {/* 아이디/비번찾기 */}
      <div className="flex-1 mt-4">
        <div className="flex h-14">
          <NavLink
            to="/find-account/id"
            className={({ isActive }) =>
              `flex-1 h-full flex items-center justify-center text-center border-b-2  ${
                isActive ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-gray-500'
              }`
            }
          >
            아이디 찾기
          </NavLink>
          <NavLink
            to="/find-account/password"
            className={({ isActive }) =>
              `flex-1 h-full flex items-center justify-center text-center border-b-2 ${
                isActive ? 'text-purple-600 border-purple-600' : 'text-gray-500 border-gray-500'
              }`
            }
          >
            비밀번호 찾기
          </NavLink>
        </div>

        <div className="p-4">
          {showIdResult ? (
            <ShowId foundId={foundId} />
          ) : (
            <Routes>
              <Route index element={<Navigate to="/find-account/id" replace />} />
              <Route
                path="id"
                element={<FindId onVerificationComplete={handleVerificationComplete} />}
              />
              <Route path="password" element={<FindPassword />} />
            </Routes>
          )}
        </div>
      </div>

      {/* 하단 버튼 */}
      <FooterButton onClick={handleButtonClick} isValid={isButtonValid}>
        {buttonText}
      </FooterButton>
    </div>
  );
};

export default FindAccountPage;
