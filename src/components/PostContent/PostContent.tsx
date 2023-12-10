import React, { useEffect, useRef, useState } from "react";
import "./postContent.scss";
import ContentDisplayer from "../ShowCode/ContentDisplayer";
import TableOfContents, {
  TableOfContentsData,
} from "../TableOfContents/TableOfContents";
import { SlPencil, SlUserFollow, SlOptionsVertical } from "react-icons/sl";
import { FaFacebook, FaPen, FaRegEye, FaRocketchat } from "react-icons/fa";
import { GoPlus } from "react-icons/go";
import { CiBookmark, CiEdit, CiFlag1 } from "react-icons/ci";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { FaRedditAlien, FaSquareXTwitter } from "react-icons/fa6";
import VotePost from "../../enums/VotePost";
import DisplayTags from "../DisplayTag/DisplayTags";

interface PostContentProps {
  content: string;
  thumbnail: string;
  excerpt: string;
  avatar: string;
  fullname: string;
  username: string;
  date: string;
  viewCount: number;
  postCount: number;
  commentCount: number;
  followCount: number;
  countVote: number;
  isMyPost: boolean;
  vote: VotePost;
  tags: string[];
}

function PostContent({
  content,
  thumbnail,
  excerpt,
  avatar,
  fullname,
  username,
  date,
  viewCount,
  postCount,
  commentCount,
  followCount,
  countVote,
  isMyPost,
  vote,
  tags,
}: PostContentProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsData[]>(
    []
  );

  const [isUpvote, setUpvote] = useState(vote == VotePost.Up);
  const [isDownvote, setDownvote] = useState(vote == VotePost.Down);
  const [voteCount, setVoteCount] = useState(countVote);
  const [isOpenOption, setOpenOption] = useState(false);
  const menuOptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuOptionRef.current &&
        !menuOptionRef.current.contains(event.target as Node)
      ) {
        setOpenOption(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const handleMenuOptionOpen = () => {
    setOpenOption((prev) => !prev);
  };

  const handleUpvote = () => {
    setUpvote((prev) => !prev);
    setDownvote(false);

    let newVoteCount = voteCount;
    if (isUpvote) {
      newVoteCount = newVoteCount - 1;
    } else if (isDownvote) {
      newVoteCount = newVoteCount + 2;
    } else {
      newVoteCount = newVoteCount + 1;
    }
    setVoteCount(newVoteCount);
  };

  const handleDownvote = () => {
    setDownvote((prev) => !prev);
    setUpvote(false);
    let newVoteCount = voteCount;
    if (isDownvote) {
      newVoteCount = newVoteCount + 1;
    } else if (isUpvote) {
      newVoteCount = newVoteCount - 2;
    } else {
      newVoteCount = newVoteCount - 1;
    }
    setVoteCount(newVoteCount);
  };

  return (
    <div className="post-content">
      <div className="post-content-container">
        <div className="post-content-header">
          <div className="post-content-header-left"></div>
          <div className="post-content-header-middle"></div>
          <div className="post-content-header-right"></div>
        </div>
        <div className="post-content-body">
          <div className="post-content-body-left">
            <div
              className={`post-content-body-left-up ${isUpvote && "selected"}`}
              title="Upvote"
              onClick={handleUpvote}
            >
              <TiArrowSortedUp />
            </div>
            <div className="post-content-body-left-count">
              {voteCount && "+"}
              {voteCount}
            </div>
            <div
              className={`post-content-body-left-down ${
                isDownvote && "selected"
              }`}
              title="Downvote"
              onClick={handleDownvote}
            >
              <TiArrowSortedDown />
            </div>
            <div className="post-content-body-left-avatar">
              <img src={avatar} alt="User Avatar" />
            </div>
            <div className="post-content-body-left-media">
              <div
                className="post-content-body-left-media-container"
                title="Share the link to this page on Reddit"
              >
                <FaRedditAlien />
              </div>
              <div
                className="post-content-body-left-media-container"
                title="Share the link to this page on Facebook"
              >
                <FaFacebook />
              </div>
              <div
                className="post-content-body-left-media-container"
                title="Share the link to this page on X"
              >
                <FaSquareXTwitter />
              </div>
            </div>
          </div>
          <div className="post-content-body-middle">
            <div className="post-content-body-middle-header">
              <img
                className="post-content-body-middle-header-thumbnail"
                src={thumbnail}
                alt="Post Thumbnail"
              />
              <div className="post-content-body-middle-header-info">
                <div className="post-user-info">
                  <img
                    className="post-user-info-avatar"
                    src={avatar}
                    alt="User Avatar"
                  />
                  <div className="post-user-info-details">
                    <div className="post-user-info-details-name">
                      <h2 className="fullname">{fullname}</h2>
                      <p className="username">@{username}</p>
                      <div className="post-user-info-details-name-btnfollow">
                        Follow <GoPlus />
                      </div>
                    </div>
                    <div className="post-user-info-details-more">
                      <div className="post-user-info-details-more-post">
                        <SlPencil />
                        <span className="post-user-info-details-more-post-count">
                          {postCount}
                        </span>
                        <span className="post-user-info-details-more-post-label">
                          Posts
                        </span>
                      </div>
                      <div className="post-user-info-details-more-follow">
                        <SlUserFollow />
                        <span className="post-user-info-details-more-follow-count">
                          {followCount}
                        </span>
                        <span className="post-user-info-details-more-follow-label">
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="post-info">
                  <div className="post-info-container">
                    <div className="post-info-date">Posted at {date}</div>
                    <div className="post-info-more">
                      <div className="post-info-more-view">
                        <FaRegEye />
                        <span className="post-info-more-view-count">
                          {viewCount}
                        </span>
                        <span className="post-info-more-view-label">Views</span>
                      </div>
                      <div className="post-info-more-comment">
                        <FaRocketchat />
                        <span className="post-info-more-comment-count">
                          {commentCount}
                        </span>
                        <span className="post-info-more-comment-label">
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className="post-info-option"
                    onClick={handleMenuOptionOpen}
                    ref={menuOptionRef}
                  >
                    <SlOptionsVertical />
                    <div
                      className={`post-info-option-menu ${
                        isOpenOption && "show"
                      }`}
                    >
                      <ul>
                        <li className="post-info-option-menu-item">
                          <CiBookmark /> <span>Mark</span>
                        </li>
                        <li className="post-info-option-menu-item">
                          <CiFlag1 /> <span>Report</span>
                        </li>
                        {isMyPost && (
                          <li className="post-info-option-menu-item">
                            <CiEdit /> <span>Edit</span>
                          </li>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="post-content-body-middle-body">
              <ContentDisplayer
                content={content}
                setTableOfContents={setTableOfContents}
              />
              <div className="post-content-body-middle-body-tags">
                <DisplayTags tags={tags} />
              </div>
            </div>
          </div>
          <div className="post-content-body-right">
            <h3>Table of contents</h3>
            <TableOfContents heading={tableOfContents} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostContent;
