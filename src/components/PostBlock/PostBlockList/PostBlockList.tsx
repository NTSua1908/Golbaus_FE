import React from "react";
import { PostBlock } from "../../../model/postModel";
import { formatDateToString } from "../../../Helper/DateHelper";
import PostBlockProps from "../PostBlockProps";
import "./postBlockList.scss";
import { Link } from "react-router-dom";

function PostBlockList({ post }: PostBlockProps) {
  return (
    <Link
      to={`/post/${post.title}}`}
      state={{ id: post.id }}
      className="post-block-list"
    >
      <div className="post-block-list-left">
        <img
          src={post.thumbnail}
          alt={post.title}
          className="post-block-list-left-img"
        />
      </div>
      <div className="post-block-list-center">
        <h3 className="post-block-list-right-title">{post.title}</h3>
        <p className="post-block-list-right-title-excerpt">{post.excerpt}</p>
      </div>
      <div className="post-block-list-right">
        <p className="post-block-list-right-info">
          <i>By</i>{" "}
          <span className="post-block-list-right-info-auth">{post.author}</span>{" "}
          <br />
          <span className="post-block-list-right-info-date">
            {formatDateToString(post.date)}
          </span>
        </p>
      </div>
    </Link>
  );
}

export default PostBlockList;
