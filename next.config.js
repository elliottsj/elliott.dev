const withSvgr = require('@elliottsj/next-svgr');
const withMDX = require('@next/mdx')();

module.exports = withMDX(
  withSvgr({
    pageExtensions: ['ts', 'tsx', 'mdx'],
  }),
);
