import PostDate from './PostDate';
import { Post } from '@/lib/getPosts';
import Link from 'next/link';
import React from 'react';

const PostItem: React.FC<{ pathPrefix: string; post: Post }> = ({ pathPrefix, post }) => (
  <article>
    <header>
      <h2 className="mt-4 text-2xl">
        <Link href={`${pathPrefix}/${post.slug}`} className="no-underline">
          {post.meta.title}
        </Link>
      </h2>
      <PostDate isoDate={post.meta.publishedAt} />
    </header>
    {post.meta.summary && <p className="my-4">{post.meta.summary}</p>}
  </article>
);

interface Props {
  pathPrefix: string;
  posts: Post[];
}

const PostList: React.FC<Props> = ({ pathPrefix, posts }) => (
  <ul className="p-0 list-none">
    {posts
      .filter((post) => post.meta.published)
      .map((post) => (
        <li key={post.slug}>
          <PostItem pathPrefix={pathPrefix} post={post} />
        </li>
      ))}
  </ul>
);

export default PostList;
