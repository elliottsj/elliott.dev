import { GetStaticProps } from 'next';
import React from 'react';

import { Layout } from '../../components';
import PostList from '../../components/PostList';
import { getPosts, Post } from '../../lib/getPosts';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = ({ posts }) => (
  <Layout>
    <PostList pathPrefix="/personal" posts={posts} />
  </Layout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    posts: (await getPosts(require.context('.'))).filter((post) => !post.meta.archived),
  },
});
