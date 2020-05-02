import React from 'react';
import { css } from '@emotion/core';
import Link from 'next/link';

import { Layout } from '../../components';
import PostList from '../../components/PostList';
import { getPosts, Post } from '../../lib/getPosts';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = ({ posts }) => (
  <Layout>
    <h3>
      <Link href="/" passHref>
        <a
          css={css`
            text-decoration: none;
          `}
        >
          ← Home
        </a>
      </Link>
    </h3>
    <PostList posts={posts} />
  </Layout>
);

export default IndexPage;

export const getStaticProps = async () => ({
  props: {
    posts: (await getPosts(require.context('.'))).filter((post) => post.meta.archived),
  },
});
