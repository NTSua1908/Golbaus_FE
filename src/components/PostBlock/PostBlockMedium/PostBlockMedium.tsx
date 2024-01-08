import React from "react";
import { PostBlock } from "../../../model/postModel";
import { formatDateToString } from "../../../Helper/DateHelper";
import PostBlockProps from "../PostBlockProps";
import "./postBlockMedium.scss";
import { Link } from "react-router-dom";

function PostBlockMedium({ post }: PostBlockProps) {
  return (
    <Link to={`/post/${post.id}}`} className="post-block-medium">
      <div className="post-block-medium-thumbnail">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="post-block-medium-thumbnail-img"
        />
      </div>
      <div className="post-block-medium-content">
        <h3 className="post-block-medium-content-title">{post.title}</h3>
        <p className="post-block-medium-content-excerpt">{post.excerpt}</p>
        <p className="post-block-medium-content-info">
          <i>By</i>{" "}
          <span className="post-block-medium-content-info-auth">
            {post.author}
          </span>{" "}
          <br />
          <span className="post-block-medium-content-info-date">
            {formatDateToString(post.date)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default PostBlockMedium;
