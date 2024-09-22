import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SubTopNavbar from '../../components/molecules/commons/SubTopNavbar';
import MemberSelectList from '../../components/template/Maintemplate/MemberSelectList';
import FooterButton from '../../components/atoms/commons/FooterButton';
import { useQRConnectionStore } from '../../stores/useQRConnectionStore ';

const MemberSelectPage = () => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const navigate = useNavigate();
  const setSelectedModeInStore = useQRConnectionStore(state => state.setSelectedMode);

  const handleNext = () => {
    setSelectedModeInStore(selectedMode); // 선택된 모드를 전역 상태에 저장
    if (selectedMode === '그룹 모드') {
      navigate('/group-select');
    } else {
      navigate('/qr-scan');
    }
  };

  return (
    <div className="flex flex-col h-screen">
      <SubTopNavbar title="노래방 모드 선택" />

      <MemberSelectList selectedMode={selectedMode} setSelectedMode={setSelectedMode} />
      <FooterButton onClick={handleNext} isValid={selectedMode !== ''}>
        다음
      </FooterButton>
    </div>
  );
};

export default MemberSelectPage;
