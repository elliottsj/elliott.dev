import type { Metadata } from 'next';
import path from 'node:path';
import { getPosts } from '@/lib/getPosts';

export const dynamicParams = false;

export async function generateStaticParams() {
  const posts = await getPosts(path.join(process.cwd(), 'src/content/posts'));
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const { meta } = await import(`@/content/posts/${slug}.mdx`);
  return { title: meta.title, description: meta.summary };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const { default: Post } = await import(`@/content/posts/${slug}.mdx`);
  return <Post />;
}
