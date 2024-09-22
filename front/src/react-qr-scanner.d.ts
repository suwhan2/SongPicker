declare module 'react-qr-scanner' {
  import { ComponentType } from 'react';

  interface QrScannerProps {
    delay?: number | false;
    onError: (error: Error) => void;
    onScan: (data: string | null) => void;
    // eslint-disable-next-line no-undef
    style?: React.CSSProperties;
    constraints?: MediaTrackConstraints & {
      video?: {
        facingMode?: string;
      };
    };
  }
  const QrScanner: ComponentType<QrScannerProps>;
  export default QrScanner;
}
