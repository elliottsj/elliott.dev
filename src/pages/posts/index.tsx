import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { Post, allPosts } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

interface Props {
  posts: Post[];
}

const IndexPage: React.FC<Props> = () => {
  return (
    <Layout>
      <PostList pathPrefix="/posts" posts={allPosts.filter((post) => !post.archived)} />
      <h3>
        <Link href="/posts/archive" className="no-underline">
          Archive →
        </Link>
      </h3>
    </Layout>
  );
};

export default IndexPage;

// export const getStaticProps: GetStaticProps = async () => ({
//   props: {
//     posts: (await getPosts(require.context('.'))).filter((post) => !post.meta.archived),
//   },
// });
