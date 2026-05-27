import type { Metadata } from 'next';
import Link from 'next/link';
import path from 'node:path';
import PostList from '@/components/PostList';
import { getPosts } from '@/lib/getPosts';

export const metadata: Metadata = {
  title: 'Archive',
};

export default async function ArchivePage() {
  const posts = (await getPosts(path.join(process.cwd(), 'src/content/posts'))).filter(
    (post) => post.meta.archived,
  );
  return (
    <>
      <h3>
        <Link href="/" className="no-underline">
          ← Home
        </Link>
      </h3>
      <PostList pathPrefix="/posts" posts={posts} />
    </>
  );
}
