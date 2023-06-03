import PostDate from './PostDate';
import { Post } from 'contentlayer/generated';
import Link from 'next/link';
import React from 'react';

const PostItem: React.FC<{ post: Post }> = ({ post }) => {
  console.log('post.slug', post.slug);
  return (
    <article>
      <header>
        <h2 className="mt-4 text-2xl">
          <Link href={post.slug} className="no-underline">
            {post.title}
          </Link>
        </h2>
        <PostDate isoDate={post.date} />
      </header>
      {post.description && <p className="my-4">{post.description}</p>}
    </article>
  );
};

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => (
  <ul className="p-0 list-none">
    {posts
      .filter((post) => post.published)
      .map((post) => (
        <li key={post.slug}>
          <PostItem post={post} />
        </li>
      ))}
  </ul>
);

export default PostList;
