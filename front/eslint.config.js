import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier'; // Prettier와의 충돌 방지

export default [
  {
    ignores: ['dist'],
    files: ['**/*.{js,jsx,ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.es2021,
      },
      parser: tsParser,
    },
    plugins: {
      '@typescript-eslint': tseslint,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
      'react': reactPlugin,
      'prettier': prettierPlugin,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...tseslint.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...prettierConfig.rules, // Prettier와 충돌하지 않도록 규칙 포함
      'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
      'prettier/prettier': [
        'error',
        {
          semi: true, // 세미콜론 강제
          singleQuote: true, // 쌍따옴표 사용
          endOfLine: 'auto', // EOL 통일
        },
      ],
      'react/react-in-jsx-scope': 'off',
      '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
      'no-unused-vars': 'off',
      'camelcase': 'error', // camelCase 사용 강제
      'eqeqeq': ['error', 'always'], // === 사용 강제
      'prefer-const': 'error', // const 권장
      'no-var': 'error', // var 사용 금지
    },
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  {
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      parser: tsParser,
      parserOptions: {
        project: './tsconfig.app.json',
      },
    },
  },
  {
    files: ['vite.config.ts'],
    rules: {
      'camelcase': 'off', // vite.config.ts 파일에서 camelcase 규칙 비활성화
      '@typescript-eslint/naming-convention': 'off', // TypeScript 네이밍 규칙 비활성화 (필요한 경우)
    },
  },
];
