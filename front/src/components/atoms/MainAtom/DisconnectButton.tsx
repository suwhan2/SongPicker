import React, { useState, useEffect } from 'react';
import { MdOutlineLinkOff } from 'react-icons/md';
import TwoBtnAlertModal from '../../template/commons/TwoBtnAlertModal';

const DisconnectButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  useEffect(() => {
    console.log('Modal visibility changed in DisconnectButton:', isModalVisible);
  }, [isModalVisible]);

  const handleDisconnectClick = () => {
    setIsModalVisible(true); // 모달 열기
  };

  const handleCloseModal = () => {
    console.log('모달 닫힘 (DisconnectButton)'); // 확인용 로그
    setIsModalVisible(false); // 모달 닫기
  };

  return (
    <div className="flex items-center" onClick={handleDisconnectClick}>
      <MdOutlineLinkOff className="text-red-400" />
      <div className="text-red-400 text-sm ms-2">연결해제</div>

      {/* DisconnectModal을 렌더링 */}
      <TwoBtnAlertModal
        isVisible={isModalVisible}
        onClose={handleCloseModal} // 닫기 동작 연결
        message="정말 연결을 해제하시겠습니까?"
        icon="link"
        onConfirm={handleCloseModal} // 해제 시에도 모달을 닫음
      />
    </div>
  );
};

export default DisconnectButton;
