/**
 * This Babel configuration is used by Next.js to transpile TypeScript sources to JavaScript. See:
 *  - https://nextjs.org/docs/advanced-features/customizing-babel-config
 *  - https://emotion.sh/docs/css-prop
 */

module.exports = {
  presets: [
    [
      require.resolve('next/babel'),
      {
        'preset-react': {
          runtime: 'automatic',
          importSource: '@emotion/react',
        },
      },
    ],
  ],
  plugins: [require.resolve('@emotion/babel-plugin')],
};
