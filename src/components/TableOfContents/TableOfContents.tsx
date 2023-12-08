// MarkdownToC.tsx

import React, { useEffect, useState } from 'react';
import './tableOfContents.scss';
import { FiExternalLink } from 'react-icons/fi';

export interface TableOfContentsData {
  level: number;
  title: string;
  id: string;
  parent: TableOfContentsData | undefined;
  childrens: TableOfContentsData[];
}

interface TableOfContentsProps {
  heading: TableOfContentsData[];
}

const TableOfContents: React.FC<TableOfContentsProps> = ({ heading }) => {
  const handleItemClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = -80;
      const targetOffsetTop = element.offsetTop + offset;
      window.scrollTo({
        top: targetOffsetTop,
        behavior: 'smooth',
      });
    }
  };

  return (
    <div className='table-of-contents'>
      <ul>
        {heading.map((heading, index) => (
          <li
            key={index}
            className={`table-of-contents-level-${heading.level}`}>
            <span
              className='table-of-contents-title'
              onClick={() => handleItemClick(heading.id)}>
              {heading.title}
            </span>
            {heading.childrens && heading.childrens.length != 0 && (
              <TableOfContents heading={heading.childrens} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TableOfContents;
