import js from '@eslint/js'
import globals from 'globals'
import reactHooks from 'eslint-plugin-react-hooks'
import reactRefresh from 'eslint-plugin-react-refresh'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig([
  globalIgnores(['dist']),
  // ---- Front-end (browser) ----
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['api/**'], // não aplica regras de browser nas funções
    extends: [
      js.configs.recommended,
      reactHooks.configs['recommended-latest'],
      reactRefresh.configs.vite,
    ],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: 'latest',
        ecmaFeatures: { jsx: true },
        sourceType: 'module',
      },
    },
    rules: {
      'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
    },
  },
  // ---- Serverless (Node) ----
  {
    files: ['api/**/*.{js,ts}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.node, // <- habilita process, __dirname, etc.
      parserOptions: { sourceType: 'module' },
    },
    rules: {
      // sem regras de React aqui
    },
  },
])
