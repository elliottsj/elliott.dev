import { Layout } from '@/components';
import Link from 'next/link';
import React from 'react';

const favouritesPage = require('./favourites.mdx');
const theWayISeeItPage = require('./the-way-i-see-it.mdx');

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
      <li>
        <article>
          <header>
            <h2 className="mt-4 text-2xl">
              <Link href="/things/favourites" className="no-underline">
                Favourites/recent/referenced
              </Link>
            </h2>
          </header>
          <p className="my-4">{favouritesPage.meta.summary}</p>
        </article>
      </li>
      <li>
        <article>
          <header>
            <h2 className="mt-4 text-2xl">
              <Link href="/things/the-way-i-see-it" className="no-underline">
                The way I see it
              </Link>
            </h2>
          </header>
          <p className="my-4">{theWayISeeItPage.meta.summary}</p>
        </article>
      </li>
      <li>
        <article>
          <header>
            <h2 className="mt-4 text-2xl">
              <a href="https://elliottsj.github.io/public-notes" className="no-underline">
                Knowledge Graph on LogSeq
              </a>
            </h2>
          </header>
          <p className="my-4">
            Main repository of my public notes about all sort of topics to varying degrees of
            organization, including notes on psychology and philosophy.
          </p>
        </article>
      </li>
      <li>
        <article>
          <header>
            <h2 className="mt-4 text-2xl">
              <a href="https://twitter.com/spe_" className="no-underline">
                @spe_ on Twitter
              </a>
            </h2>
          </header>
          <p className="my-4">
            My main personal Twitter account where I post more curated thoughts, with a focus on my
            professional persona.
          </p>
        </article>
      </li>
    </ul>
  </Layout>
);

export default IndexPage;
