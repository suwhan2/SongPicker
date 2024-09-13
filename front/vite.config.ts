import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: '원하는 앱 이름',
        short_name: '짧은 이름',
        icons: [
          {
            src: '/src/assets/songPickerLogo.svg',
            sizes: '192x192',
            type: 'image/svg',
          },
          {
            src: '/src/assets/songPickerLogo.svg',
            sizes: '512x512',
            type: 'image/svg',
          },
        ],
      },
    }),
  ],
  publicDir: 'public', // 정적 파일이 위치한 디렉토리
});
