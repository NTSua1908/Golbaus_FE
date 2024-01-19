import React from "react";
import "./displayTags.scss";
import { useNavigate } from "react-router-dom";

interface DisplayTagsProps {
  tags: string[];
}

function DisplayTags({ tags }: DisplayTagsProps) {
  const navigate = useNavigate();

  return (
    <div className='tags'>
      {tags.map((tag, index) => (
        <span
          key={index}
          className='tags-item'
          onClick={() => {
            navigate("/search?tag=" + tag);
          }}
        >
          #{tag}
        </span>
      ))}
    </div>
  );
}
export default React.memo(DisplayTags);
