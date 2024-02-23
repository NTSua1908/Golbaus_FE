import React, { memo } from "react";
import { SwipperCard } from "../SwiperContent/SwiperContent";
import "./postGrid.scss";
import { PostList } from "../../model/postModel";

interface PostGridProps {
  posts: PostList[];
}

function PostGrid({ posts }: PostGridProps) {
  return (
    <div className='postGrid'>
      {posts.map((post, index) => (
        <SwipperCard key={index} content={post} />
      ))}
    </div>
  );
}

export default memo(PostGrid);
