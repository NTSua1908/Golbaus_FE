import React, { ReactNode, useEffect, useRef } from "react";
import Markdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import rehypeRaw from "rehype-raw";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import { TableOfContentsData } from "../TableOfContents/TableOfContents";
import CodeCopyBtn from "./CopyButton";
import "./contentDisplayer.scss";
import "./style.css";

interface ContentDisplayerProps {
  content: string;
  setTableOfContents: React.Dispatch<
    React.SetStateAction<TableOfContentsData[]>
  >;
}

let headingIds: string[] = [];

export const ContentDisplayer: React.FC<ContentDisplayerProps> = ({
  content,
  setTableOfContents,
}) => {
  const postMarkdownRef = useRef<HTMLDivElement>(null);

  function getInnerText(node: ReactNode): string {
    if (typeof node === "string") {
      return node;
    }

    if (Array.isArray(node)) {
      return node.map(getInnerText).join("");
    }

    if (React.isValidElement(node) && node.props.children) {
      return getInnerText(node.props.children);
    }
    return "";
  }

  function getHeadingId(children: ReactNode): string {
    if (!children) {
      return "";
    }
    const headingText = getInnerText(children);
    let count = 0;
    for (const heading of headingIds) {
      count = headingText === heading ? count + 1 : count;
    }
    const id = headingText + count;
    headingIds = [...headingIds, headingText];
    // console.log(headingIds);
    return id;
  }

  //Create table of contents data
  useEffect(() => {
    const headers = postMarkdownRef.current?.querySelectorAll(
      "h1, h2, h3, h4, h5, h6"
    );

    if (headers) {
      const headings: TableOfContentsData[] = Array.from(headers).map(
        (header) => ({
          title: header.textContent ?? "",
          id: header.id,
          childrens: [],
          parent: undefined,
          level: parseInt(header.nodeName.substr(1), 10),
        })
      );
      // console.log('heading', headings);

      if (headings.length > 0) {
        const tableOfContentData: TableOfContentsData[] = [];
        tableOfContentData.push(headings.at(0)!);
        let lastHeading = headings.at(0)!;

        for (let i = 1; i < headings.length; i++) {
          const heading = addHeadingData(lastHeading, headings.at(i)!);
          // console.log('result', heading);
          if (heading == null) {
            tableOfContentData.push(headings.at(i)!);
          }
          lastHeading = headings.at(i)!;
        }
        // console.log('content', tableOfContentData);
        setTableOfContents(tableOfContentData);
      }
    }
  }, [content]);

  useEffect(() => {
    headingIds = [];
  }, []);

  const addHeadingData = (
    lastHeading: TableOfContentsData,
    currentHeading: TableOfContentsData
  ): TableOfContentsData | null => {
    // debugger;
    if (lastHeading.level < currentHeading.level) {
      if (
        lastHeading.childrens.length === 0 ||
        lastHeading.childrens.at(lastHeading.childrens.length - 1)?.level ===
          currentHeading.level
      ) {
        currentHeading.parent = lastHeading;
        lastHeading.childrens.push(currentHeading);
        return currentHeading;
      }
    }
    if (lastHeading.parent)
      return addHeadingData(lastHeading.parent, currentHeading);
    else return null;
  };

  interface PreProps {
    children?: ReactNode;
  }

  const createPreComponent = ({ children }: PreProps): JSX.Element => {
    const Pre: JSX.Element = (
      <pre className="blog-pre">
        <CodeCopyBtn>{children}</CodeCopyBtn>
        <div className="blog-pre-container">{children}</div>
      </pre>
    );

    return Pre;
  };

  return (
    <div className="displayer">
      <div className="displayer-container" ref={postMarkdownRef}>
        <Markdown
          className="post-markdown"
          rehypePlugins={[rehypeRaw, rehypeSlug]}
          remarkPlugins={[remarkGfm]}
          components={{
            p: ({ node, children }) => (
              <p className="custom-paragraph">{children}</p>
            ),
            img: ({ node, src, alt }) => (
              <img className="custom-image" src={src} alt={alt} />
            ),
            a: ({ node, href, children }) => (
              <a className="custom-link" href={href}>
                {children}
              </a>
            ),
            h1: ({ node, children }) => (
              <h1 className="custom-heading1" id={getHeadingId(children)}>
                {children}
              </h1>
            ),
            h2: ({ node, children }) => (
              <h2 className="custom-heading2" id={getHeadingId(children)}>
                {children}
              </h2>
            ),
            h3: ({ node, children }) => (
              <h3 className="custom-heading3" id={getHeadingId(children)}>
                {children}
              </h3>
            ),
            h4: ({ node, children }) => (
              <h4 className="custom-heading4" id={getHeadingId(children)}>
                {children}
              </h4>
            ),
            h5: ({ node, children }) => (
              <h5 className="custom-heading5" id={getHeadingId(children)}>
                {children}
              </h5>
            ),
            h6: ({ node, children }) => (
              <h6 className="custom-heading6" id={getHeadingId(children)}>
                {children}
              </h6>
            ),
            table: ({ node, children }) => (
              <table className="custom-table">{children}</table>
            ),
            ul: ({ node, children }) => (
              <ul className="custom-list-u">{children}</ul>
            ),
            ol: ({ node, children }) => (
              <ol className="custom-list-o">{children}</ol>
            ),
            li: ({ node, children }) => (
              <li className="custom-list-item">{children}</li>
            ),
            blockquote: ({ node, children }) => (
              <blockquote className="custom-blockquote">{children}</blockquote>
            ),
            hr: ({ node }) => <hr className="custom-hr" />,
            pre: createPreComponent,
            code({ node, className = "blog-code", children, style, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return match ? (
                <SyntaxHighlighter
                  language={match[1]}
                  style={dracula}
                  PreTag="div"
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {content}
        </Markdown>
      </div>
    </div>
  );
};

export default React.memo(ContentDisplayer);
