import React from "react";
import { PostBlock } from "../../../model/postModel";
import { formatDateToString } from "../../../Helper/DateHelper";
import PostBlockProps from "../PostBlockProps";
import "./postBlockSmall.scss";
import { Link } from "react-router-dom";

function PostBlockSmall({ post }: PostBlockProps) {
  return (
    <Link to={`/post/${post.id}`} className='post-block-small'>
      <div className='post-block-small-left'>
        <img
          src={post.thumbnail}
          alt={post.title}
          className='post-block-small-left-img'
        />
      </div>
      <div className='post-block-small-right'>
        <h3 className='post-block-small-right-title'>{post.title}</h3>
        <p className='post-block-small-right-info'>
          <i>By</i>{" "}
          <span className='post-block-small-right-info-auth'>
            {post.author}
          </span>{" "}
          <br />
          <span className='post-block-small-right-info-date'>
            {formatDateToString(post.date)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default PostBlockSmall;
