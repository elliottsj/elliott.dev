import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';

const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'public/**'] },
  ...nextCoreWebVitals,
];

export default config;
