import React from 'react';
import './style.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export default function CopyButton({ children }) {
  const [copyOk, setCopyOk] = React.useState(false);

  const handleClick = (e) => {
    navigator.clipboard.writeText(children.props.children);
    console.log(children);

    setCopyOk(true);
  };

  return (
    <div className='code-copy-btn'>
      <button onClick={handleClick}>{copyOk ? 'Copied' : 'Copy'}</button>
    </div>
  );
}
