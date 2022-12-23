import React from 'react';
import { css } from '@emotion/react';
import Link from 'next/link';

import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { getPosts, Post } from '@/lib/getPosts';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = ({ posts }) => (
  <Layout>
    <h3>
      <Link
        href="/"
        css={css`
          text-decoration: none;
        `}
      >
        ← Home
      </Link>
    </h3>
    <PostList pathPrefix="/posts" posts={posts} />
  </Layout>
);

export default IndexPage;

export const getStaticProps = async () => ({
  props: {
    posts: (await getPosts(require.context('.'))).filter((post) => post.meta.archived),
  },
});
