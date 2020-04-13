import preval from 'preval.macro';

/**
 * The preval plugin pre-evaluates code at build time. We use this to get the
 * meta from the MDX files (blog posts) and use it for displaying the list of
 * posts in the `index.tsx` page
 *
 * This code is not used in the browser or the app at all, but only in build
 * time when Node.js is available.
 */

interface Meta {
  published: boolean;
  title: string;
  summary: string;
}

interface Post {
  meta: Meta;
  slug: string;
}

const posts: Post[] = preval`
  module.exports = require('./getBlogPosts.js');
`;

export default posts;
