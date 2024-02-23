import React from "react";
import { PostBlock } from "../../../model/postModel";
import { formatDateToString } from "../../../Helper/DateHelper";
import PostBlockProps from "../PostBlockProps";
import "./trendingPost.scss";
import { Link } from "react-router-dom";

interface TrendingPostProps {
  post: PostBlock;
  index: number;
}

function TrendingPost({ post, index }: TrendingPostProps) {
  return (
    <Link to={`/post/${post.id}`} className='post-block-trending'>
      <div className='post-block-trending-left'>{index}</div>
      <div className='post-block-trending-right'>
        <h3 className='post-block-trending-right-title'>{post.title}</h3>
        <p className='post-block-trending-right-info'>
          <i>By</i>{" "}
          <span className='post-block-trending-right-info-auth'>
            {post.author}
          </span>{" "}
          <br />
          <span className='post-block-trending-right-info-date'>
            {formatDateToString(post.date)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default TrendingPost;
