import classNames from 'classnames';
import { Highlight, Prism, themes } from 'prism-react-renderer';
import React from 'react';

// https://github.com/FormidableLabs/prism-react-renderer#faq
((typeof global !== 'undefined' ? global : window) as unknown as { Prism: typeof Prism }).Prism =
  Prism;
require('prismjs/components/prism-ruby');

const CodeBlock: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const language = className?.replace(/language-/, '') ?? 'text';

  return (
    <Highlight code={children} language={language} theme={themes.vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames('overflow-auto p-[20px]', className)} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
