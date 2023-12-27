import React from "react";
import { SwiperCardContent, SwipperCard } from "../SwiperContent/SwiperContent";
import "./postGrid.scss";

interface PostGridProps {
  posts: SwiperCardContent[];
}

function PostGrid({ posts }: PostGridProps) {
  return (
    <div className="postGrid">
      {posts.map((post, index) => (
        <SwipperCard key={index} content={post} />
      ))}
    </div>
  );
}

export default PostGrid;
