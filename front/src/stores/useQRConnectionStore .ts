import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import useAuthStore from './useAuthStore';

interface QRConnectionState {
  isConnected: boolean;
  machineNumber: string;
  selectedMode: string;
  setConnection: (isConnected: boolean, machineNumber: string) => void;
  checkAndSetConnection: (isConnected: boolean, machineNumber: string) => boolean;
  setSelectedMode: (mode: string) => void;
}

const useQRConnectionStore = create<QRConnectionState>()(
  persist(
    (set, get) => ({
      isConnected: false,
      machineNumber: '',
      selectedMode: '',
      setConnection: (isConnected, machineNumber) => set({ isConnected, machineNumber }),
      checkAndSetConnection: (isConnected, machineNumber) => {
        const isAuthenticated = useAuthStore.getState().isAuthenticated;
        if (isAuthenticated) {
          set({ isConnected, machineNumber });
          return true;
        }
        return false;
      },
      setSelectedMode: mode => set({ selectedMode: mode }),
    }),
    {
      name: 'qr-connection-storage',
    }
  )
);

export { useQRConnectionStore };
