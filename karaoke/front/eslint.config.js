// ESLint 기본 설정을 가져옵니다.
import js from '@eslint/js';
// 전역 변수 설정을 가져옵니다.
import globals from 'globals';
// React Hooks 관련 ESLint 플러그인을 가져옵니다.
import reactHooks from 'eslint-plugin-react-hooks';
// React Refresh 관련 ESLint 플러그인을 가져옵니다.
import reactRefresh from 'eslint-plugin-react-refresh';
// TypeScript ESLint 설정을 가져옵니다.
import tseslint from 'typescript-eslint';

// ESLint 설정을 내보냅니다.
export default tseslint.config(
  // 'dist' 폴더를 ESLint 검사에서 제외합니다.
  { ignores: ['dist'] },
  {
    // 권장 설정을 확장합니다.
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    // TypeScript 파일에 대해 설정을 적용합니다.
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      // ECMAScript 2020 문법을 사용합니다.
      ecmaVersion: 2020,
      // 브라우저 전역 변수를 사용합니다.
      globals: globals.browser,
    },
    // 사용할 플러그인을 설정합니다.
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    // ESLint 규칙을 설정합니다.
    rules: {
      // React Hooks 규칙을 적용합니다.
      ...reactHooks.configs.recommended.rules,
      // React Refresh 관련 규칙을 설정합니다.
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
    },
  }
);
