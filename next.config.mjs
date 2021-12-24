import remarkGfm from 'remark-gfm';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });
    config.module.rules.push({
      test: /\.mdx$/,
      use: [
        {
          loader: 'xdm/webpack.cjs',
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

export default nextConfig;
