import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import QrScanner from 'react-qr-scanner';
import SubTopNavbar from '../../components/molecules/commons/SubTopNavbar';
import ConnectionModal from '../../components/template/commons/ConnectionModal';
import { useQRConnectionStore } from '../../stores/useQRConnectionStore ';

type QrScanResult = string | { text: string };

const QrScanPage = () => {
  const [result, setResult] = useState<string | null>(null);
  const [hasScanned, setHasScanned] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const setConnection = useQRConnectionStore(state => state.setConnection);
  const navigate = useNavigate();

  const handleScan = (data: QrScanResult | null) => {
    if (data && !hasScanned) {
      const scanResult = typeof data === 'string' ? data : data.text;
      setResult(scanResult);
      setHasScanned(true);
      setShowModal(true);

      // 연결 상태 저장
      setConnection(true, 'VC3456'); // 임시 번호
    }
  };

  const handleError = (err: Error) => {
    console.error('QR Scan Error:', err);
  };

  useEffect(() => {
    if (showModal) {
      const timer = setTimeout(() => {
        setShowModal(false);
        navigate('/');
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [showModal, navigate]);

  return (
    <div className="flex flex-col h-screen">
      <SubTopNavbar title="QR코드 스캔" />
      <div className="flex-1 flex flex-col">
        <div className="relative w-full" style={{ height: '66.67vh' }}>
          <QrScanner
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

      <ConnectionModal isVisible={showModal} />
    </div>
  );
};

export default QrScanPage;
