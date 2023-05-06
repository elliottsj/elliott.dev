import PostDate from './PostDate';
import { Post } from '@/lib/getPosts';
import { css } from '@emotion/react';
import Link from 'next/link';
import React from 'react';

const PostItem: React.FC<{ pathPrefix: string; post: Post }> = ({ pathPrefix, post }) => (
  <article>
    <header>
      <h2
        css={css`
          margin-bottom: 0;
        `}
      >
        <Link
          href={`${pathPrefix}/${post.slug}`}
          css={css`
            text-decoration: none;
          `}
        >
          {post.meta.title}
        </Link>
      </h2>
      <PostDate isoDate={post.meta.publishedAt} />
    </header>
    {post.meta.summary && <p>{post.meta.summary}</p>}
  </article>
);

interface Props {
  pathPrefix: string;
  posts: Post[];
}

const PostList: React.FC<Props> = ({ pathPrefix, posts }) => (
  <ul
    css={css`
      padding: 0;
      list-style: none;
    `}
  >
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
