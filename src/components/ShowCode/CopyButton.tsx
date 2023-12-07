import React from 'react';
import './style.css';

interface CopyButtonProps {
  children: React.ReactNode;
}

export default function CopyButton({ children }: CopyButtonProps) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = () => {
    if (React.isValidElement(children)) {
      const childProps = children.props;
      if (childProps && 'children' in childProps) {
        navigator.clipboard.writeText(childProps.children);
        setCopyOk(true);
      }
    }
  };

  return (
    <div className='code-copy-btn'>
      <button onClick={handleClick}>{copyOk ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
