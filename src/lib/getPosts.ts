import orderBy from 'lodash/orderBy';
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export interface Meta {
  archived?: boolean;
  published: boolean;
  publishedAt: string;
  title: string;
  summary?: string;
  use100vh?: boolean;
}

export interface Post {
  meta: Meta;
  slug: string;
}

/**
 * Parse the `export const meta = {...}` declaration from an MDX source file
 * by evaluating its object literal in a sandboxed Function. We control the
 * input (our own MDX files), so this is safe at build time.
 */
const parseMeta = (source: string, filePath: string): Meta => {
  const match = source.match(/export\s+const\s+meta\s*=\s*(\{[\s\S]*?\n\})\s*;?/m);
  if (!match) {
    throw new Error(`Could not find "export const meta" in ${filePath}`);
  }
  return new Function(`return (${match[1]});`)() as Meta;
};

export const getPosts = async (postsDir: string): Promise<Post[]> => {
  const entries = await readdir(postsDir, { withFileTypes: true });
  const mdxFiles = entries.filter((entry) => entry.isFile() && entry.name.endsWith('.mdx'));

  const posts = await Promise.all(
    mdxFiles.map(async (file): Promise<Post> => {
      const filePath = path.join(postsDir, file.name);
      const source = await readFile(filePath, 'utf8');
      return {
        meta: parseMeta(source, filePath),
        slug: file.name.replace(/\.mdx$/, ''),
      };
    }),
  );

  return orderBy(posts, (post) => post.meta.publishedAt, ['desc']);
};
