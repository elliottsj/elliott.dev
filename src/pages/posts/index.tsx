import type { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'node:path';
import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { type Post, getPosts } from '@/lib/getPosts';

interface Props {
  posts: Post[];
}

const IndexPage = ({ posts }: Props) => (
  <Layout>
    <PostList pathPrefix="/posts" posts={posts} />
    <h3>
      <Link href="/posts/archive" className="no-underline">
        Archive →
      </Link>
    </h3>
  </Layout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    posts: (await getPosts(path.join(process.cwd(), 'src/pages/posts'))).filter(
      (post) => !post.meta.archived,
    ),
  },
});
