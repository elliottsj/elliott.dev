const withSvgr = require('@elliottsj/next-svgr');
const withMDX = require('@next/mdx')();

const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    // Workaround for https://github.com/vercel/next.js/issues/20884
    config.optimization.splitChunks = false;

    return config;
  },
};

module.exports = withMDX(withSvgr(config));
