const withSvgr = require('@elliottsj/next-svgr');
const withMDX = require('@next/mdx')();
const withOptimizedImages = require('next-optimized-images');

const config = {
  // https://github.com/cyrilwanner/next-optimized-images#configuration
  handleImages: ['jpeg', 'png', 'webp', 'gif'],
  optimizeImages: false,

  pageExtensions: ['ts', 'tsx', 'mdx'],
};

module.exports = withMDX(withSvgr(withOptimizedImages(config)));
