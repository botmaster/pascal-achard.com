import antfu from '@antfu/eslint-config';

export default antfu(
  { vue: true, typescript: true },
  {
    // Without `files`, they are general rules for all files
    rules: {
      'style/semi': ['error', 'always'],
      'node/prefer-global/process': ['error', 'always'],
    },
  },
);
