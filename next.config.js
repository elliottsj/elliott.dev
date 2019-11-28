const withSvgr = require('@elliottsj/next-svgr');
const withMDX = require('@next/mdx')();
const withCSS = require('@yolkai/next-css');

module.exports = withCSS(
  withMDX(
    withSvgr({
      pageExtensions: ['ts', 'tsx', 'mdx'],
    }),
  ),
);
