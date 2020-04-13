import Link from 'next/link';
import React from 'react';

import posts from '../common/posts';
import { Layout } from '../components';

export default () => (
  <Layout>
    <ul>
      {posts
        .filter((post) => post.meta.published)
        .map((post) => (
          <li key={post.slug}>
            <Link href={`/posts/${post.slug}`}>
              <a>{post.meta.title}</a>
            </Link>
          </li>
        ))}
    </ul>
  </Layout>
);
