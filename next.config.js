const remarkGfm = require('remark-gfm');
const remarkMath = require('remark-math');
const rehypeKatex = require('rehype-katex');

const config = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    // Workaround for https://github.com/vercel/next.js/issues/20884
    config.optimization.splitChunks = false;

    config.module.rules.push({
      test: /\.svg$/,
      use: [require.resolve('@svgr/webpack')],
    });
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: require.resolve('xdm/webpack.cjs'),
          options: {
            providerImportSource: '@mdx-js/react',
            remarkPlugins: [remarkGfm, remarkMath],
            rehypePlugins: [rehypeKatex],
          },
        },
      ],
    });

    return config;
  },
};

module.exports = config;
