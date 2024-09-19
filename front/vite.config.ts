import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import path from 'path';

export default defineConfig({
  plugins: [
    react(),
    svgr(),
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
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  publicDir: 'public', // 정적 파일이 위치한 
  
  // 서버 설정 추가
  server: {
    host: '0.0.0.0',  // 네트워크의 모든 인터페이스에서 접근 가능
    port: 3000,        // 포트 설정 (기본 3000, 필요에 따라 변경 가능)
  },
});
