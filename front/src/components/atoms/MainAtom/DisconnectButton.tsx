import React, { useState, useCallback } from 'react';
import { MdOutlineLinkOff } from 'react-icons/md';
import TwoBtnAlertModal from '../../template/commons/TwoBtnAlertModal';

const DisconnectButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleDisconnectClick = useCallback(() => {
    setIsModalVisible(true);
  }, []);

  const handleCloseModal = useCallback(() => {
    setIsModalVisible(false);
  }, []);

  const handleConfirm = useCallback(() => {
    // 여기에 연결 해제 로직을 추가하세요
    console.log('연결이 해제되었습니다.');
    setIsModalVisible(false);
  }, []);

  return (
    <>
      <div className="flex items-center" onClick={handleDisconnectClick}>
        <MdOutlineLinkOff className="text-red-400" />
        <div className="text-red-400 text-sm ms-2">연결해제</div>
      </div>

      {isModalVisible && (
        <TwoBtnAlertModal
          isVisible={isModalVisible}
          onClose={handleCloseModal}
          onConfirm={handleConfirm}
          message="정말 연결을 해제하시겠습니까?"
        />
      )}
    </>
  );
};

export default DisconnectButton;
