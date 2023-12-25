import React from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import './viewMoreButton.scss';

interface ViewMoreButtonProps {
  onClick: () => void;
}

function ViewMoreButton({ onClick }: ViewMoreButtonProps) {
  return (
    <div
      className='viewMore'
      onClick={onClick}>
      <div className='viewMore-text'>View More</div>
      <div className='viewMore-icon'>
        <IoIosArrowDropdownCircle />
      </div>
    </div>
  );
}

export default ViewMoreButton;
