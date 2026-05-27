import type { MDXComponents } from 'mdx/types';
import Link from 'next/link';
import type { ComponentProps } from 'react';
import CodeBlock from '@/components/CodeBlock';

const BlockQuote = (props: ComponentProps<'blockquote'>) => (
  <blockquote className="m-0 pl-[20px] shadow-inner italic" {...props} />
);

const Pre = (props: ComponentProps<'pre'>) => (
  <div className="grid">
    {props.children &&
    typeof props.children === 'object' &&
    'type' in props.children &&
    props.children.type === 'code' ? (
      <CodeBlock {...(props.children.props as { children: string; className?: string })} />
    ) : (
      props.children
    )}
  </div>
);

const Table = (props: ComponentProps<'table'>) => (
  <div className="grid">
    <table className="block overflow-auto border-collapse w-[99%]" {...props} />
  </div>
);

const Td = (props: ComponentProps<'td'>) => (
  <td className="border border-solid border-[#e2e8f0] p-0.5" {...props} />
);

const MDXLink = (props: ComponentProps<'a'>) => {
  const { href, ref: _ref, ...rest } = props;
  if (href?.startsWith('/')) {
    return <Link href={href} {...rest} />;
  }
  return <a href={href} {...rest} />;
};

export function useMDXComponents(): MDXComponents {
  return {
    blockquote: BlockQuote,
    pre: Pre,
    a: MDXLink,
    table: Table,
    td: Td,
  };
}
