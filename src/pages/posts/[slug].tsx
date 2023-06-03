import { Layout } from '@/components';
import PostDate from '@/components/PostDate';
import Seo from '@/components/Seo';
import { Post, allPosts } from 'contentlayer/generated';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useMDXComponent } from 'next-contentlayer/hooks';

interface Props {
  post: Post;
}

const PostLayout: React.FC<Props> = ({ post }) => {
  const MDXContent = useMDXComponent(post.body.code);
  return (
    <Layout use100vh={post.use100vh}>
      <Seo title={post.title} description={post.description} />
      <MDXContent components={{ PostDate }} />
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = allPosts.map((post) => ({
    params: { slug: post.slugAsParams },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const post = allPosts.find((post) => post.slugAsParams === params?.slug);
  if (!post) {
    return { notFound: true };
  }
  return { props: { post } };
};

export default PostLayout;
