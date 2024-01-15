import antfu from '@antfu/eslint-config';
import { FlatCompat } from '@eslint/eslintrc';

const compat = new FlatCompat();

export default antfu(
  {
    vue: true,
    typescript: true,
    ignores: [
      'content/',
    ],
  },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
    },
  },
  ...compat.config({
    extends: ['plugin:tailwindcss/recommended'],
    rules: {
      'tailwindcss/no-custom-classname': 'off',
      'tailwindcss/migration-from-tailwind-2': 'off',
    },
  }),
);
