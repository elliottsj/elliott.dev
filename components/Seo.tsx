import Head from 'next/head';

interface Props {
  title?: string;
  description?: string;
}

const Seo: React.FC<Props> = ({ title, description }) => {
  const headTitle = title ? `${title} | elliott.dev` : 'elliott.dev';
  const headDescription = description || 'The personal website of Spencer Elliott';
  return (
    <Head>
      <title>{headTitle}</title>
      <meta name="description" content={headDescription} />
    </Head>
  );
};

export default Seo;
