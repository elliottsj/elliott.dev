import orderBy from 'lodash/orderBy';

type RequireContextType = ReturnType<typeof require.context>;

export interface Meta {
  archived?: boolean;
  published: boolean;
  publishedAt: string;
  title: string;
  summary?: string;
}

export interface Post {
  meta: Meta;
  slug: string;
}

export const getPosts = async (postsReq: RequireContextType) => {
  const getSlug = (moduleName: string) => moduleName.match(/^\.\/(?<slug>.+)\.mdx$/)?.groups?.slug;
  const posts: Post[] = postsReq
    .keys()
    .map((moduleName) => ({ moduleName, slug: getSlug(moduleName) }))
    .filter((mod): mod is { moduleName: string; slug: string } => mod.slug !== undefined)
    .map(({ moduleName, slug }) => ({ meta: postsReq(moduleName).meta, slug }));

  return orderBy(posts, (post) => post.meta.publishedAt, ['desc']);
};
