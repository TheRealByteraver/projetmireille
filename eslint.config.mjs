import { defineConfig, globalIgnores } from 'eslint/config';
import nextVitals from 'eslint-config-next/core-web-vitals';
import nextTs from 'eslint-config-next/typescript';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default defineConfig([
  ...nextVitals,
  ...nextTs,
  eslintPluginPrettierRecommended,
  {
    files: ['**/*.{js,jsx,mjs,ts,tsx}'],
    rules: {
      'no-unused-vars': 'off',
      'prefer-const': 'error',
      '@typescript-eslint/no-unused-vars': ['error', { destructuredArrayIgnorePattern: '^_' }],
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/explicit-module-boundary-types': 'error',
      '@typescript-eslint/consistent-type-definitions': ['warn', 'type'],
      '@typescript-eslint/naming-convention': 'off',
      'arrow-body-style': ['error', 'as-needed'],
      'no-console': ['warn', { allow: ['error'] }],
      eqeqeq: 'error',
      'max-len': [2, { code: 120, tabWidth: 2, ignoreUrls: true }],
      'prettier/prettier': ['warn', { endOfLine: 'auto' }],
    },
  },
  {
    files: ['tailwind.config.js', 'postcss.config.js', '**/*.config.js', '**/*.config.cjs', '**/*.config.mjs'],
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
  globalIgnores(['.next/**', 'out/**', 'dist/**', 'coverage/**']),
]);
