import classNames from 'classnames';
import Highlight, { defaultProps, Language, Prism } from 'prism-react-renderer';
import vsDark from 'prism-react-renderer/themes/vsDark';
import React from 'react';

// https://github.com/FormidableLabs/prism-react-renderer#faq
((typeof global !== 'undefined' ? global : window) as any).Prism = Prism;
require('prismjs/components/prism-ruby');

type CodeBlockLanguage = Language | 'php' | 'ruby' | 'text';

const isLanguageValid = (language: string): language is CodeBlockLanguage =>
  language === '' || language in Prism.languages || ['php', 'ruby', 'text'].includes(language);

/**
 * https://mdxjs.com/guides/syntax-highlighting
 */
const CodeBlock: React.FC<{ children: string; className?: string }> = ({ children, className }) => {
  const language = className?.replace(/language-/, '') ?? 'text';
  if (!isLanguageValid(language)) {
    throw new Error(`Invalid language ${language}`);
  }

  return (
    <Highlight {...defaultProps} code={children} language={language as Language} theme={vsDark}>
      {({ className, style, tokens, getLineProps, getTokenProps }) => (
        <pre className={classNames('overflow-auto p-[20px]', className)} style={{ ...style }}>
          {tokens.map((line, i) => (
            <div key={i} {...getLineProps({ line, key: i })}>
              {line.map((token, key) => (
                <span key={key} {...getTokenProps({ token, key })} />
              ))}
            </div>
          ))}
        </pre>
      )}
    </Highlight>
  );
};

export default CodeBlock;
