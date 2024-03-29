import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { getPosts, Post } from '@/lib/getPosts';
import Link from 'next/link';
import React from 'react';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = ({ posts }) => (
  <Layout>
    <h3>
      <Link href="/" className="no-underline">
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
