import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';

import { css } from '@emotion/core';

import { Layout } from '../components';

export interface Meta {
  published: boolean;
  publishedAt: string;
  title: string;
  summary: string;
}

interface Post {
  meta: Meta;
  slug: string;
}

const Article: React.FC<{ post: Post }> = ({ post }) => (
  <article>
    <header>
      <h2
        css={css`
          margin-bottom: 0;
        `}
      >
        <Link href={`/posts/${post.slug}`} passHref>
          <a
            css={css`
              text-decoration: none;
            `}
          >
            {post.meta.title}
          </a>
        </Link>
      </h2>
      <small>{DateTime.fromISO(post.meta.publishedAt).toLocaleString(DateTime.DATE_FULL)}</small>
    </header>
    <p>{post.meta.summary}</p>
  </article>
);

interface IndexPageProps {
  posts: Post[];
}

const IndexPage: React.FC<IndexPageProps> = ({ posts }) => (
  <Layout>
    {posts
      .filter((post) => post.meta.published)
      .map((post) => (
        <Article key={post.slug} post={post} />
      ))}
  </Layout>
);

export default IndexPage;

export const getStaticProps = async () => {
  const postsReq = require.context('./posts');
  const getSlug = (moduleName: string) => moduleName.match(/^\.\/(?<slug>.+)\.mdx$/)?.groups?.slug;
  const posts = postsReq.keys().map((key) => ({ meta: postsReq(key).meta, slug: getSlug(key) }));

  return { props: { posts } };
};
