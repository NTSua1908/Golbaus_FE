import React from "react";
import "./displayTags.scss";

interface DisplayTagsProps {
  tags: string[];
}

function DisplayTags({ tags }: DisplayTagsProps) {
  return (
    <div className="tags">
      {tags.map((tag, index) => (
        <span key={index} className="tags-item">
          #{tag}
        </span>
      ))}
    </div>
  );
}
export default React.memo(DisplayTags);
