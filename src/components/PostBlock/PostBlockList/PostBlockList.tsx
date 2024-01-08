import React from "react";
import { PostBlock, PostList } from "../../../model/postModel";
import { formatDateToString } from "../../../Helper/DateHelper";
import PostBlockProps from "../PostBlockProps";
import "./postBlockList.scss";
import { Link } from "react-router-dom";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaRegEye, FaRocketchat } from "react-icons/fa";

interface PostBlockListProps {
  post: PostList;
}

function PostBlockList({ post }: PostBlockListProps) {
  return (
    <Link
      to={`/post/${post.id}}`}
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
      <div className="post-block-list-right">
        <div className="post-block-list-right-content">
          <h3 className="post-block-list-right-content-title">{post.title}</h3>
          <p className="post-block-list-right-content-excerpt">
            {post.excerpt}
          </p>
        </div>

        <div className="post-block-list-right-info">
          <p className="post-block-list-right-info-detail">
            <i>By</i>{" "}
            <span className="post-block-list-right-info-detail-auth">
              {post.authorName}
            </span>{" "}
            <br />
            <span className="post-block-list-right-info-detail-date">
              {formatDateToString(post.date)}
            </span>
          </p>
          <div className="post-block-list-right-info-stats">
            <div className="post-block-list-right-info-stats-detail up">
              <span className="post-block-list-right-info-stats-detail-icon">
                <TiArrowSortedUp />
              </span>
              {post.upvote}
            </div>
            <div className="post-block-list-right-info-stats-detail down">
              <span className="post-block-list-right-info-stats-detail-icon">
                <TiArrowSortedDown />
              </span>
              {post.downvote}
            </div>
            <div className="post-block-list-right-info-stats-detail view">
              <span className="post-block-list-right-info-stats-detail-icon">
                <FaRegEye />
              </span>
              {post.viewCount}
            </div>
            <div className="post-block-list-right-info-stats-detail comments">
              <span className="post-block-list-right-info-stats-detail-icon">
                <FaRocketchat />
              </span>
              {post.commentCount}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}

export default PostBlockList;
