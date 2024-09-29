import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';

export default [
  { ignores: ['dist'] },
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Adjust to match all JS/TS files
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    settings: { react: { version: '18.3' } },
    plugins: {
      react,
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...js.configs.recommended.rules,
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      'react/jsx-no-target-blank': 'off',
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },
      ],
    },
  },
  // Override for React-Three-based files or imports
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Matches all JS/TS files
    excludedFiles: ['dist/**/*'],
    rules: {
      'no-unused-vars': 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
    },
  },
  // Specific rule to disable linting in files where react-three-fiber or @react-three is used
  {
    files: ['**/*.{js,jsx,ts,tsx}'], // Apply globally
    rules: {
      // Disable errors for any import from 'react-three-fiber' or '@react-three/*'
      'import/no-unresolved': ['error', { ignore: ['react-three-fiber', '@react-three/*'] }],
    },
  },
];
