/**
 * This Babel configuration is used by Next.js to transpile TypeScript sources to JavaScript. See:
 *  - https://github.com/zeit/next.js/tree/1a02dfd842717e690a07869c5856d0b1fc9dc726#customizing-babel-config
 *  - https://emotion.sh/docs/@emotion/babel-preset-css-prop
 */

module.exports = {
  presets: [require.resolve('next/babel'), require.resolve('@emotion/babel-preset-css-prop')],
  plugins: [require.resolve('babel-plugin-macros')],
};
