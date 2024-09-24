const CONNECTION_KEY = 'karaoke_connection';
const CONNECTION_DURATION = 2 * 60 * 60 * 1000; // 2시간
const SELECTED_MODE_KEY = 'selected_mode';

interface ConnectionInfo {
  serialNumber: string;
  connectedAt: number;
  mode: string;
  groupId?: number;
}

export const saveConnectionInfo = (serialNumber: string, mode: string, groupId?: number) => {
  const connectionInfo: ConnectionInfo = {
    serialNumber,
    connectedAt: Date.now(),
    mode,
    groupId, // groupId가 undefined일 경우 저장되지 않음
  };
  sessionStorage.setItem(CONNECTION_KEY, JSON.stringify(connectionInfo));
};

export const getConnectionInfo = (): ConnectionInfo | null => {
  const infoString = sessionStorage.getItem(CONNECTION_KEY);
  if (!infoString) return null;

  const info: ConnectionInfo = JSON.parse(infoString);
  const elapsedTime = Date.now() - info.connectedAt;

  if (elapsedTime > CONNECTION_DURATION) {
    sessionStorage.removeItem(CONNECTION_KEY);
    return null;
  }

  return info;
};

export const isConnected = (): boolean => {
  return getConnectionInfo() !== null;
};

export const clearConnectionInfo = () => {
  sessionStorage.removeItem(CONNECTION_KEY);
};

export const saveSelectedMode = (mode: string) => {
  sessionStorage.setItem(SELECTED_MODE_KEY, mode);
};

export const getSelectedMode = (): string | null => {
  return sessionStorage.getItem(SELECTED_MODE_KEY);
};
