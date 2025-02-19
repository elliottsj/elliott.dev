import { Layout } from '@/components';
import Link from 'next/link';
import React from 'react';

const IndexPage: React.FC = () => (
  <Layout>
    <ul className="p-0 list-none">
      <li>
        <article>
          <header>
            <h2 className="mt-4 text-2xl">
              <Link href="/posts" className="no-underline">
                Developer blog
              </Link>
            </h2>
          </header>
          <p className="my-4">Posts I&apos;ve posted about programming and related topics.</p>
        </article>
      </li>
    </ul>
  </Layout>
);

export default IndexPage;
