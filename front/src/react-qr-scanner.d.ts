declare module 'react-qr-scanner' {
  import { ComponentType } from 'react';

  interface QrScannerProps {
    delay?: number | false;
    onError: (error: any) => void;
    onScan: (data: string | null) => void;
    style?: React.CSSProperties;
    // 필요에 따라 더 많은 props를 여기에 추가할 수 있습니다.
  }

  const QrScanner: ComponentType<QrScannerProps>;

  export default QrScanner;
}