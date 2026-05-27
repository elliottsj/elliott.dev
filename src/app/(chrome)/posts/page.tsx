import type { Metadata } from 'next';
import Link from 'next/link';
import path from 'node:path';
import PostList from '@/components/PostList';
import { getPosts } from '@/lib/getPosts';

export const metadata: Metadata = {
  title: 'Posts',
};

export default async function PostsPage() {
  const posts = (await getPosts(path.join(process.cwd(), 'src/content/posts'))).filter(
    (post) => !post.meta.archived,
  );
  return (
    <>
      <PostList pathPrefix="/posts" posts={posts} />
      <h3>
        <Link href="/posts/archive" className="no-underline">
          Archive →
        </Link>
      </h3>
    </>
  );
}
