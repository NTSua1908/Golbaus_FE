import React, { useEffect, useRef, useState } from "react";
import { CiBookmark, CiEdit, CiFlag1 } from "react-icons/ci";
import { FaFacebook, FaRegEye, FaRocketchat } from "react-icons/fa";
import { FaRedditAlien, FaSquareXTwitter } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import { MdDeleteOutline } from "react-icons/md";
import { SlOptionsVertical, SlPencil, SlUserFollow } from "react-icons/sl";
import { TiArrowSortedDown, TiArrowSortedUp } from "react-icons/ti";
import { useNavigate } from "react-router-dom";
import VotePost from "../../enums/VoteType";
import { Delete, DownVote, UpVote } from "../../services/PostService";
import DisplayTags from "../DisplayTag/DisplayTags";
import ContentDisplayer from "../ShowCode/ContentDisplayer";
import TableOfContents, {
  TableOfContentsData,
} from "../TableOfContents/TableOfContents";
import "./postContent.scss";
import ConfirmDialog from "../ConfirmDialog/ConfirmDialog";
import { AxiosError } from "axios";
import { notification } from "antd";
import PublishType from "../../enums/PublishType";

interface PostContentProps {
  id: string;
  title: string;
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
  publishType: PublishType;
  willBePublishedOn: string;
  tags: string[];
  handleOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}

function PostContent({
  id,
  title,
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
  publishType,
  willBePublishedOn,
  tags,
  handleOpenModal,
}: PostContentProps) {
  const [tableOfContents, setTableOfContents] = useState<TableOfContentsData[]>(
    []
  );

  const [isUpvote, setUpvote] = useState(vote == VotePost.Up);
  const [isDownvote, setDownvote] = useState(vote == VotePost.Down);
  const [voteCount, setVoteCount] = useState(countVote);
  const [isOpenOption, setOpenOption] = useState(false);
  const menuOptionRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = localStorage.getItem("token") !== null;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [api, contextHolder] = notification.useNotification();
  const navigate = useNavigate();

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

  const handleUpvote = async () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }
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

    await UpVote(id);
  };

  const handleDownvote = async () => {
    if (!isAuthenticated) {
      handleOpenModal(true);
      return;
    }

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
    await DownVote(id);
  };

  const gotoEditPage = () => {
    navigate("/edit-post/" + id);
  };

  const handleShowDeletePostConfirm = () => {
    setShowDeleteConfirm(true);
  };

  const onDeletePost = async () => {
    await Delete(id)
      .then((res) => {
        openNotificationSuccess("Delete successful");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      })
      .catch((error: AxiosError) => {
        const errors = (error.response?.data as any).errors;
        const errorMessage = errors.join("\n") as string;
        openNotificationFailure(errorMessage);
      });
  };

  const openNotificationSuccess = (message: string) => {
    api.info({
      message: `Notification`,
      description: message,
      placement: "topRight",
    });
  };

  const openNotificationFailure = (message: string) => {
    api.error({
      message: `Notification`,
      description: message,
      placement: "topRight",
      type: "error",
    });
  };

  return (
    <div className='postContent'>
      {contextHolder}
      <div className='postContent-container'>
        <div className='postContent-header'>
          <div className='postContent-header-left'></div>
          <div className='postContent-header-middle'></div>
          <div className='postContent-header-right'></div>
        </div>
        <div className='postContent-body'>
          <div className='postContent-body-left'>
            <div
              className={`postContent-body-left-up ${isUpvote && "selected"}`}
              title='Upvote'
              onClick={() => {
                handleUpvote();
              }}
            >
              <TiArrowSortedUp />
            </div>
            <div className='postContent-body-left-count'>
              {voteCount > 0 && "+"}
              {voteCount}
            </div>
            <div
              className={`postContent-body-left-down ${
                isDownvote && "selected"
              }`}
              title='Downvote'
              onClick={() => {
                handleDownvote();
              }}
            >
              <TiArrowSortedDown />
            </div>
            <div className='postContent-body-left-avatar'>
              <img src={avatar} alt='User Avatar' />
            </div>
            <div className='postContent-body-left-media'>
              <div
                className='postContent-body-left-media-container'
                title='Share the link to this page on Reddit'
              >
                <FaRedditAlien />
              </div>
              <div
                className='postContent-body-left-media-container'
                title='Share the link to this page on Facebook'
              >
                <FaFacebook />
              </div>
              <div
                className='postContent-body-left-media-container'
                title='Share the link to this page on X'
              >
                <FaSquareXTwitter />
              </div>
            </div>
          </div>
          <div className='postContent-body-middle'>
            <div className='postContent-body-middle-header'>
              <img
                className='postContent-body-middle-header-thumbnail'
                src={thumbnail}
                alt='Post Thumbnail'
              />
              <div className='postContent-body-middle-header-info'>
                <div className='post-user-info'>
                  <img
                    className='post-user-info-avatar'
                    src={avatar}
                    alt='User Avatar'
                  />
                  <div className='post-user-info-details'>
                    <div className='post-user-info-details-name'>
                      <h2 className='fullname'>{fullname}</h2>
                      <p className='username'>@{username}</p>
                      <div className='post-user-info-details-name-btnfollow'>
                        Follow <GoPlus />
                      </div>
                    </div>
                    <div className='post-user-info-details-more'>
                      <div className='post-user-info-details-more-post'>
                        <SlPencil />
                        <span className='post-user-info-details-more-post-count'>
                          {postCount}
                        </span>
                        <span className='post-user-info-details-more-post-label'>
                          Posts
                        </span>
                      </div>
                      <div className='post-user-info-details-more-follow'>
                        <SlUserFollow />
                        <span className='post-user-info-details-more-follow-count'>
                          {followCount}
                        </span>
                        <span className='post-user-info-details-more-follow-label'>
                          Followers
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='post-info'>
                  <div className='post-info-container'>
                    <div className='post-info-date'>
                      {publishType == PublishType.Public && `Posted at ${date}`}
                      {publishType == PublishType.Private &&
                        `Privated Post - Posted at ${date}`}
                      {publishType == PublishType.Schedule &&
                        `Scheduled to be published on ${willBePublishedOn}`}
                    </div>
                    <div className='post-info-more'>
                      <div className='post-info-more-view'>
                        <FaRegEye />
                        <span className='post-info-more-view-count'>
                          {viewCount}
                        </span>
                        <span className='post-info-more-view-label'>Views</span>
                      </div>
                      <div className='post-info-more-comment'>
                        <FaRocketchat />
                        <span className='post-info-more-comment-count'>
                          {commentCount}
                        </span>
                        <span className='post-info-more-comment-label'>
                          Comments
                        </span>
                      </div>
                    </div>
                  </div>
                  <div
                    className='post-info-option'
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
                        <li className='post-info-option-menu-item'>
                          <CiBookmark /> <span>Mark</span>
                        </li>
                        <li className='post-info-option-menu-item'>
                          <CiFlag1 /> <span>Report</span>
                        </li>
                        {isMyPost && (
                          <>
                            <li
                              className='post-info-option-menu-item'
                              onClick={gotoEditPage}
                            >
                              <CiEdit /> <span>Edit</span>
                            </li>
                            <li
                              className='post-info-option-menu-item'
                              onClick={handleShowDeletePostConfirm}
                            >
                              <MdDeleteOutline /> <span>Delete</span>
                            </li>
                          </>
                        )}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='postContent-body-middle-body'>
              <h1 className='postContent-body-middle-body-title'>{title}</h1>
              <ContentDisplayer
                content={content}
                setTableOfContents={setTableOfContents}
              />
              <div className='postContent-body-middle-body-tags'>
                <DisplayTags tags={tags} />
              </div>
            </div>
          </div>
          <div className='postContent-body-right'>
            <h3>Table of contents</h3>
            <TableOfContents heading={tableOfContents} />
          </div>
        </div>
      </div>
      <ConfirmDialog
        onCancel={() => {
          setShowDeleteConfirm(false);
        }}
        onConfirm={onDeletePost}
        title='You are about to delete this post'
        message='Do you really want to delete this post? This action cannot be undone. Are you sure you want to proceed?'
        show={showDeleteConfirm}
      />
    </div>
  );
}

export default PostContent;
