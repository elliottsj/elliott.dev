import type { GetStaticProps } from 'next';
import Link from 'next/link';
import path from 'node:path';
import { Layout } from '@/components';
import PostList from '@/components/PostList';
import { type Post, getPosts } from '@/lib/getPosts';

interface Props {
  posts: Post[];
}

const ArchivePage = ({ posts }: Props) => (
  <Layout>
    <h3>
      <Link href="/" className="no-underline">
        ← Home
      </Link>
    </h3>
    <PostList pathPrefix="/posts" posts={posts} />
  </Layout>
);

export default ArchivePage;

export const getStaticProps: GetStaticProps<Props> = async () => ({
  props: {
    posts: (await getPosts(path.join(process.cwd(), 'src/pages/posts'))).filter(
      (post) => post.meta.archived,
    ),
  },
});
