import { DateTime } from 'luxon';
import Link from 'next/link';
import React from 'react';

import { css } from '@emotion/core';

import { Post } from '../lib/getPosts';

const PostItem: React.FC<{ post: Post }> = ({ post }) => (
  <article>
    <header>
      <h2
        css={css`
          margin-bottom: 0;
        `}
      >
        <Link href={`/posts/${post.slug}`} passHref>
          <a
            css={css`
              text-decoration: none;
            `}
          >
            {post.meta.title}
          </a>
        </Link>
      </h2>
      <small>{DateTime.fromISO(post.meta.publishedAt).toLocaleString(DateTime.DATE_FULL)}</small>
    </header>
    {post.meta.summary && <p>{post.meta.summary}</p>}
  </article>
);

interface Props {
  posts: Post[];
}

const PostList: React.FC<Props> = ({ posts }) => (
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
          <PostItem post={post} />
        </li>
      ))}
  </ul>
);

export default PostList;
