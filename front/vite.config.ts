/* eslint-disable no-undef */
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import path from 'path';
import { fileURLToPath } from 'url';

// ESM 환경에서 __dirname 사용을 위한 설정
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    svgr(),
    VitePWA({
      manifest: {
        name: 'songPicker',
        short_name: 'songPicker',
        icons: [
          {
            src: '/src/assets/songPickerLogo.svg',
            sizes: '192x192',
            type: 'image/svg+xml', // SVG 파일 타입 수정
          },
          {
            src: '/src/assets/songPickerLogo.svg',
            sizes: '512x512',
            type: 'image/svg+xml',
          },
        ],
        theme_color: '#9747FF',
        background_color: '#ffffff', // 배경색 추가
        display: 'standalone', // 독립 실행형 앱처럼 표시
        start_url: '/', // 시작 URL 설정
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'], // 오프라인 캐싱을 위한 파일 패턴
      },
    }),
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'), // 소스 디렉토리에 대한 별칭 설정
    },
  },
  publicDir: 'public', // 정적 파일 디렉토리 설정

  // 개발 서버 설정
  server: {
    host: '0.0.0.0', // 모든 네트워크 인터페이스에서 접근 가능
    port: 3000, // 포트 설정
  },

  // 빌드 최적화 설정
  build: {
    chunkSizeWarningLimit: 1000, // 청크 크기 경고 한계 설정 (1000KB)
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            return 'vendor'; // node_modules의 모듈을 별도의 청크로 분리
          }
        },
      },
    },
  },

  // 환경별 최적화 설정
  esbuild: {
    drop: command === 'build' ? ['console', 'debugger'] : [], // 프로덕션 빌드 시 콘솔 로그와 디버거 문 제거
  },
}));
