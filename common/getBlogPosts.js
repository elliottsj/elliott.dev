const fs = require('fs');
const path = require('path');
const requireFromString = require('require-from-string');

const babel = require('@babel/core');
const mdx = require('@mdx-js/mdx');

const postsDir = path.join(__dirname, '..', 'pages', 'posts');
const files = fs.readdirSync(postsDir).filter(file => file.endsWith('.mdx'));

/**
 * Collect all .md / .mdx posts in this directory and export all posts' meta info and slug names.
 */
module.exports = files.map(file => {
  const mdxText = fs.readFileSync(path.join(postsDir, file), 'utf-8');
  const mdxCodeESNext = mdx.sync(mdxText);
  const transformed = babel.transformSync(mdxCodeESNext, {
    babelrc: false,
    presets: [require.resolve('@babel/preset-react')],
    plugins: [require.resolve('@babel/plugin-transform-modules-commonjs')],
  });
  const mdxCodeNode = transformed.code;
  const mod = requireFromString(mdxCodeNode, file);

  if (!mod.meta) {
    throw new Error(`${file} needs to export const meta = {}`);
  }

  return {
    meta: mod.meta,
    slug: path.basename(file, path.extname(file)),
  };
});
