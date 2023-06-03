import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { allPosts, Post } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = () => {
  return (
    <Layout>
      <h3>
        <Link href="/" className="no-underline">
          ← Home
        </Link>
      </h3>
      <PostList posts={allPosts.filter((post) => post.archived)} />
    </Layout>
  );
};

export default IndexPage;
