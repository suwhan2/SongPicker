import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import SubTopNavbar from '../../components/molecules/commons/SubTopNavbar';
import ConnectionModal from '../../components/template/commons/ConnectionModal';
import { connectService, connectGroupService } from '../../services/connection';
import { saveConnectionInfo, getSelectedMode } from '../../services/connectionStorage';

type QrScanResult = string | { text: string };

const QrScanPage = () => {
  const [result, setResult] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [key, setKey] = useState(0); // QR 스캐너를 리셋하기 위한 key
  const navigate = useNavigate();
  const [modalIcon, setModalIcon] = useState<'spinner' | 'link'>('spinner');
  const [showCloseButton, setShowCloseButton] = useState(false);
  const location = useLocation();
  const { groupId } = location.state || {};
  const selectedMode = getSelectedMode() || '개인 모드';

  const resetScanner = () => {
    setHasScanned(false);
    setKey(prevKey => prevKey + 1); // QR 스캐너 컴포넌트를 리렌더링
  };

  const handleScan = async (data: QrScanResult | null) => {
    if (data && !hasScanned) {
      const scanResult = typeof data === 'string' ? data : data.text;
      setResult(scanResult);
      setHasScanned(true);
      setShowModal(true);
      setModalMessage('노래방기계와 연결중입니다. 잠시만 기다려주세요!');
      setModalIcon('spinner');
      setShowCloseButton(false);

      try {
        const params = scanResult.split(',').reduce(
          (acc, curr) => {
            const [key, value] = curr.split(':');
            acc[key.trim()] = value.trim();
            return acc;
          },
          {} as Record<string, string>
        );

        let response;
        if (groupId) {
          response = await connectGroupService({
            serialNumber: params.serialNumber,
            groupId: groupId,
          });
        } else {
          response = await connectService(params.serialNumber);
        }

        if (response.code === 'CO100') {
          saveConnectionInfo(params.serialNumber, selectedMode, groupId);
          setModalMessage('연결에 성공했습니다!');
          setModalIcon('link');
          setShowCloseButton(true);
          setTimeout(() => {
            setShowModal(false);
            navigate('/');
          }, 1500);
        } else {
          setModalMessage('연결에 실패했습니다. 다시 시도해주세요.');
          setModalIcon('link');
          setShowCloseButton(true);
          setTimeout(() => {
            setShowModal(false);
            resetScanner();
          }, 1500);
        }
      } catch (error) {
        console.error('Error connecting:', error);
        setModalMessage('연결 중 오류가 발생했습니다. 다시 시도해주세요.');
        setModalIcon('link');
        setShowCloseButton(true);
        setTimeout(() => {
          setShowModal(false);
          resetScanner();
        }, 1500);
      }
    }
  };

  const handleError = (err: Error) => {
    console.error('QR Scan Error:', err);
    setModalMessage('QR 코드 스캔 중 오류가 발생했습니다. 다시 시도해주세요.');
    setShowModal(true);
    resetScanner();
  };

  const handleCloseModal = () => {
    setShowModal(false);
    resetScanner();
  };

  return (
    <div className="flex flex-col h-screen">
      <SubTopNavbar title="QR코드 스캔" />
      <div className="flex-1 flex flex-col">
        <div className="relative w-full" style={{ height: '66.67vh' }}>
          <QrScanner
            key={key}
            delay={300}
            onError={handleError}
            onScan={handleScan}
            constraints={{
              video: { facingMode: 'environment' },
            }}
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <div className="flex-1 bg-black flex items-center justify-center p-4">
          <div className="text-center text-white text-lg font-bold">
            노래방기계에 있는 QR코드를 스캔해주세요
          </div>
        </div>
      </div>

      <ConnectionModal
        isVisible={showModal}
        onClose={handleCloseModal}
        message={modalMessage}
        icon={modalIcon}
        showCloseButton={showCloseButton}
      />
    </div>
  );
};

export default QrScanPage;
