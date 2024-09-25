import React, { useState } from 'react';
import MainLayout from '../layouts/MainLayout';
import KaraokeLinkMode from '../components/organisms/MainOrganism/KaraokeLinkMode';
import RecomMusicList from '../components/template/Maintemplate/RecomMusicList';
import CustomAlert from '../components/template/commons/CustomAlert';
import ConnectionModal from '../components/template/commons/ConnectionModal';

const MainPage = () => {
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState({ title: '', description: '' });
  const [showConnectionModal, setShowConnectionModal] = useState(false);
  const [connectionModalMessage, setConnectionModalMessage] = useState('');
  const [modalIcon, setModalIcon] = useState<'link' | 'spinner' | 'reservation'>('link');
  const [autoCloseDelay, setAutoCloseDelay] = useState<number | undefined>(undefined);

  const handleShowNotification = (title: string, description: string) => {
    setNotificationMessage({ title, description });
    setShowNotification(true);
  };

  const handleCloseNotification = () => {
    setShowNotification(false);
  };

  const handleShowConnectionModal = (
    message: string,
    icon: 'link' | 'spinner' | 'reservation' = 'link',
    delay?: number
  ) => {
    setConnectionModalMessage(message);
    setModalIcon(icon);
    setAutoCloseDelay(delay);
    setShowConnectionModal(true);
  };

  const handleCloseConnectionModal = () => {
    setShowConnectionModal(false);
  };

  return (
    <MainLayout>
      <div className="flex flex-col space-y-8 px-2 py-4">
        {/* 노래방 연결 */}
        <div className="w-full">
          <KaraokeLinkMode />
        </div>

        {/* 사용자 맞춤 추천곡 */}
        <div className="w-full">
          <RecomMusicList
            onShowNotification={handleShowNotification}
            onShowConnectionModal={handleShowConnectionModal}
          />
        </div>

        {/* 테마 추천 */}
        {/* 추가 예정 */}

        {/* 사용자 통계 배너 */}
        {/* 추가 예정 */}

        {/* 사용자 추천 아티스트 */}
        {/* 추가 예정 */}
      </div>

      {showNotification && (
        <CustomAlert
          title={notificationMessage.title}
          description={notificationMessage.description}
          onClose={handleCloseNotification}
        />
      )}

      <ConnectionModal
        isVisible={showConnectionModal}
        onClose={handleCloseConnectionModal}
        message={connectionModalMessage}
        icon={modalIcon}
        autoCloseDelay={autoCloseDelay}
      />
    </MainLayout>
  );
};

export default MainPage;
