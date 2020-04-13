import Link from 'next/link';
import React from 'react';

import { Layout } from '../components';

export interface Meta {
  published: boolean;
  title: string;
  summary: string;
}

interface Post {
  meta: Meta;
  slug: string;
}

interface IndexPageProps {
  posts: Post[];
}

const IndexPage: React.FC<IndexPageProps> = ({ posts }) => (
  <Layout>
    <ul>
      {posts
        .filter((post) => post.meta.published)
        .map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.meta.title}</a>
            </Link>
          </li>
        ))}
    </ul>
  </Layout>
);

export default IndexPage;

export const getStaticProps = async () => {
  const postsReq = require.context('./posts');
  const getSlug = (moduleName: string) => moduleName.match(/^\.\/(?<slug>.+)\.mdx$/)?.groups?.slug;
  const posts = postsReq.keys().map((key) => ({ meta: postsReq(key).meta, slug: getSlug(key) }));

  return { props: { posts } };
};
