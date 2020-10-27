const withSvgr = require('@elliottsj/next-svgr');
const withMDX = require('@next/mdx')();

const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = withMDX(withSvgr(config));
