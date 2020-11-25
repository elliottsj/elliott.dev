import { GetStaticProps } from 'next';
import React from 'react';

import { Layout } from '../components';

interface FeedItem {
  id: string;
}

interface Props {
  feed: FeedItem[];
}

const IndexPage: React.FC<Props> = ({ feed }) => (
  <Layout>
    <h1>Activity</h1>
    <h3>A curated collection of cool and/or helpful stuff I&apos;ve posted online.</h3>
    <ul>
      {feed.map((item) => (
        <li key={item.id}></li>
      ))}
    </ul>
  </Layout>
);

export default IndexPage;

export const getStaticProps: GetStaticProps = async () => ({
  props: {
    feed: [],
  },
});
