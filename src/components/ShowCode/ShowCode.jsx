import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { a11yDark } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import CodeCopyBtn from './CopyButton';
import './style.css';
import Markdown from 'react-markdown';

export default function ShowCode({ content }) {
  // Add the CodeCopyBtn component to our PRE element
  const Pre = ({ children }) => (
    <pre className='blog-pre'>
      <CodeCopyBtn>{children}</CodeCopyBtn>
      {children}
    </pre>
  );

  return (
    <Markdown
      className='post-markdown'
      //   linkTarget='_blank'
      rehypePlugins={[rehypeRaw]}
      remarkPlugins={[remarkGfm]}
      components={{
        pre: Pre,
        code({ node, inline, className = 'blog-code', children, ...props }) {
          const match = /language-(\w+)/.exec(className || '');
          return !inline && match ? (
            <SyntaxHighlighter
              style={a11yDark}
              language={match[1]}
              PreTag='div'
              {...props}>
              {String(children).replace(/\n$/, '')}
            </SyntaxHighlighter>
          ) : (
            <code
              className={className}
              {...props}>
              {children}
            </code>
          );
        },
      }}>
      {content}
    </Markdown>
  );
}
